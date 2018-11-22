using LogViewer.Core.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogViewer.Core.Data.Models
{
    public class SortingFilter
    {
        public SortColumn SortColumn { get; set; }
        public SortOrder SortOrder { get; set; }
    }
}
