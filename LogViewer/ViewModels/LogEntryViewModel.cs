using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.ViewModels
{
    public class LogEntryViewModel
    {
        public long Id { get; set; }
        public long ApplicationId { get; set; }
        public DateTime EntryTime { get; set; }
        public string LogLevel { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string Logger { get; set; }
        public string Stacktrace { get; set; }

        public ApplicationViewModel Application { get; set; }
    }
}
