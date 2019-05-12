using System;
using System.Collections.Generic;

namespace LogViewer.DbContextScaffoldingRunner.Models
{
    public partial class Application
    {
        public Application()
        {
            LogEntry = new HashSet<LogEntry>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<LogEntry> LogEntry { get; set; }
    }
}
