using LogViewer.Core.Data.Entities;
using LogViewer.Core.Data.Models;
using LogViewer.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LogViewer.Core.Services
{
    public class LogEntryRetrievalService : ILogEntryRetrievalService
    {
        private readonly IApplicationRepository applicationRepository;
        private readonly ILogEntryRepository logEntryRepository;

        public LogEntryRetrievalService(IApplicationRepository applicationRepository, ILogEntryRepository logEntryRepository)
        {
            this.applicationRepository = applicationRepository ?? throw new ArgumentNullException(nameof(applicationRepository));
            this.logEntryRepository = logEntryRepository ?? throw new ArgumentNullException(nameof(logEntryRepository));
        }

        public Task<IReadOnlyList<Application>> GetAllApplicationsAsync() => applicationRepository.ListAllAsync();

        public Task<(IReadOnlyList<LogEntry> logEntries, long totalCount)> GetLogEntriesAsync(DataFilter dataFilter, int page = 0, int countPerPage = 50, SortingFilter sort = null) => logEntryRepository.GetLogEntriesAsync(dataFilter, page, countPerPage, sort);

    }
}
