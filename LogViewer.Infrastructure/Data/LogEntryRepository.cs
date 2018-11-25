using LogViewer.Core.Data.Entities;
using LogViewer.Core.Data.Models;
using LogViewer.Core.Data.Models.Enums;
using LogViewer.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LogViewer.Infrastructure.Data
{
    public class LogEntryRepository : Repository<LogEntry>, ILogEntryRepository
    {
        public LogEntryRepository(LoggingDbContext context) : base(context)
        {
        }

        public async Task<(IReadOnlyList<LogEntry> logEntries, long totalCount)> GetLogEntriesAsync(DataFilter dataFilter, int page = 0, int countPerPage = 50, SortingFilter sort = null)
        {
            var logEntries = dbSet.AsQueryable();

            if (dataFilter.AppId.HasValue)
                logEntries = logEntries.Where(x => x.ApplicationId == dataFilter.AppId.Value);

            if (dataFilter.EndDate.HasValue)
                logEntries = logEntries.Where(x => x.EntryTime <= dataFilter.EndDate);

            if (dataFilter.StartDate.HasValue)
                logEntries = logEntries.Where(x => x.EntryTime >= dataFilter.StartDate);

            if (dataFilter.LogLevels != null && dataFilter.LogLevels.Count > 0)
            {
                var enumNames = dataFilter.LogLevels.Select(x => Enum.GetName(typeof(LogLevel), x));
                logEntries = logEntries.Where(x => enumNames.Contains(x.LogLevel));
            }

            logEntries = SetupQueryableWhereExpression(logEntries, dataFilter.MessageIncludes, nameof(LogEntry.Message), FilterStringOptions.Include);
            logEntries = SetupQueryableWhereExpression(logEntries, dataFilter.MessageExcludes, nameof(LogEntry.Message), FilterStringOptions.Exclude);
            logEntries = SetupQueryableWhereExpression(logEntries, dataFilter.LoggernameIncludes, nameof(LogEntry.Logger), FilterStringOptions.Include);
            logEntries = SetupQueryableWhereExpression(logEntries, dataFilter.LoggernameExcludes, nameof(LogEntry.Logger), FilterStringOptions.Exclude);

            if (sort != null)
            {
                switch (sort.SortColumn)
                {
                    case SortColumn.EntryTime:
                        logEntries = sort.SortOrder == SortOrder.Asc ? logEntries.OrderBy(x => x.EntryTime) : logEntries.OrderByDescending(x => x.EntryTime);
                        break;
                    default:
                        throw new NotSupportedException($"Enum [SortColumn] with value {sort.SortColumn} is not yet supported!");
                }
            }

            long logEntriesTotalCount = await logEntries.LongCountAsync();

            //var test = logEntries.GroupBy(x => x.LogLevel).Select(x => new { LogLevel = x.Key, Count = x.LongCount() }).ToList();

            logEntries = logEntries.Include(x => x.Application);

            return (await logEntries
                .Skip(page * countPerPage)
                .Take(countPerPage)
                .ToListAsync()
                .ConfigureAwait(false), logEntriesTotalCount);
        }

        private IQueryable<LogEntry> SetupQueryableWhereExpression(IQueryable<LogEntry> query, List<string> stringCompares, string propName, FilterStringOptions options)
        {
            // no includes / excludes => nothing to do
            if (stringCompares == null || stringCompares.Count == 0)
                return query;

            ParameterExpression eParam = Expression.Parameter(typeof(LogEntry), "x");
            MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) }); // Comparing will be done with the string.Contains method
            List<MethodCallExpression> methodCalls = new List<MethodCallExpression>();

            // at this point we possible have 1-n comparsions to do
            foreach (string str in stringCompares)
                methodCalls.Add(Expression.Call(Expression.Property(eParam, propName), method, Expression.Constant(str)));

            // if we only have 1 comparsion to do we're done, otherwise we'll replace this variable
            Expression finalExpr = methodCalls[0]; 
            if (stringCompares.Count > 1)
            {
                // Or-ing initial expression
                BinaryExpression orExpr = Expression.OrElse(methodCalls[0], methodCalls[1]);
                // if we still have more expression we keep or-ing
                for (int i = 2; i < methodCalls.Count; i++)
                {
                    orExpr = Expression.OrElse(orExpr, methodCalls[i]);
                }
          
                finalExpr = orExpr;
            }

            // Switching between include / exclude is a simple matter of Not-ing the expression
            finalExpr = options == FilterStringOptions.Exclude ? Expression.Not(finalExpr) : finalExpr;
            return query.Where(Expression.Lambda<Func<LogEntry, bool>>(finalExpr, eParam));
        }
    }
}
