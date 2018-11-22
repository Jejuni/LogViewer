using LogViewer.Core.Data.Entities;
using LogViewer.Core.Data.Models;
using LogViewer.Core.Data.Models.Enums;
using LogViewer.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

            if (!string.IsNullOrEmpty(dataFilter.MessageInclude))
                logEntries = logEntries.Where(x => x.Message.Contains(dataFilter.MessageInclude));

            if(sort != null)
            {
                switch (sort.SortColumn)
                {
                    case SortColumn.EntryTime:
                        logEntries = sort.SortOrder == SortOrder.Asc ? logEntries.OrderBy(x => x.EntryTime) : logEntries.OrderByDescending(x => x.EntryTime);
                        break;
                    default:
                        throw new NotSupportedException($"Enum [SortColumn] with value {sort.SortColumn} is not yet supportted!");
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
    }
}
