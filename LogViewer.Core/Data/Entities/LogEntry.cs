using System;
using System.Collections.Generic;

namespace LogViewer.Core.Data.Entities
{
    public partial class LogEntry
    {
        public long Id { get; set; }
        public long ApplicationId { get; set; }
        public DateTime EntryTime { get; set; }
        public string LogLevel { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string Logger { get; set; }
        public string Stacktrace { get; set; }

        public Application Application { get; set; }
    }
}
