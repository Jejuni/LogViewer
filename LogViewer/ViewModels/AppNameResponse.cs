using LogViewer.Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.ViewModels
{
    public class AppNameResponse
    {
        public IEnumerable<Application> Applications { get; set; }
    }
}
