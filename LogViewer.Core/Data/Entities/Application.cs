using System;
using System.Collections.Generic;

namespace LogViewer.Core.Data.Entities
{
    public partial class Application
    {
        public Application()
        {
            LogEntry = new HashSet<LogEntry>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public ICollection<LogEntry> LogEntry { get; set; }
    }
}
