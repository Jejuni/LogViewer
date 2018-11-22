using LogViewer.Core.Data.Entities;
using LogViewer.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LogViewer.Core.Interfaces
{
    public interface ILogEntryRepository: IRepository<LogEntry>
    {
        Task<(IReadOnlyList<LogEntry> logEntries, long totalCount)> GetLogEntriesAsync(DataFilter dataFilter, int page = 0, int countPerPage = 50, SortingFilter sort = null);
    }
}
