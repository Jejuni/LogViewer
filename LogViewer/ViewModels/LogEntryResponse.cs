using LogViewer.Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.ViewModels
{
    public class LogEntryResponse
    {
        public long TotalEntries { get; set; }
        public int CurrentPage { get; set; }
        public IEnumerable<LogEntry> LogEntries { get; set; }
    }
}
