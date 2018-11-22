using LogViewer.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.ViewModels
{
    public class LogEntryRequest
    {
        public int Page { get; set; }
        public int CountPerPage { get; set; }
        [Required]
        public SortingFilter Sorting { get; set; }
        [Required]
        public DataFilter Filters { get; set; }
    }
}
