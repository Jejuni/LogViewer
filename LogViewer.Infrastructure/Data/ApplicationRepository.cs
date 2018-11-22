using LogViewer.Core.Data.Entities;
using LogViewer.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogViewer.Infrastructure.Data
{
    public class ApplicationRepository : Repository<Application>, IApplicationRepository
    {
        public ApplicationRepository(LoggingDbContext context) : base(context)
        {
        }
    }
}
