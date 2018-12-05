using LogViewer.Core.Data.Entities;
using LogViewer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.Extensions
{
    public static class LogEntryExtensions
    {
        public static LogEntryViewModel ToViewModel(this LogEntry logEntry)
            => new LogEntryViewModel
            {
                Application = new ApplicationViewModel
                {
                    Id = logEntry.Application.Id,
                    Name = logEntry.Application.Name
                },
                ApplicationId = logEntry.ApplicationId,
                Id = logEntry.Id,
                EntryTime = logEntry.EntryTime,
                Exception = logEntry.Exception,
                Logger = logEntry.Logger,
                LogLevel = logEntry.LogLevel,
                Message = logEntry.Message,
                Stacktrace = logEntry.Stacktrace
            };
    }
}
