using LogViewer.Core.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogViewer.Core.Data.Models
{
    public class DataFilter
    {
        public long? AppId { get; set; }
        public List<LogLevel> LogLevels { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<string> MessageIncludes { get; set; }
        public List<string> MessageExcludes { get; set; }
        public List<string> LoggernameIncludes { get; set; }
        public List<string> LoggernameExcludes { get; set; }
    }
}
