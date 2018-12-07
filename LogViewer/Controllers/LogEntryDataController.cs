using LogViewer.Core.Data.Entities;
using LogViewer.Core.Interfaces;
using LogViewer.Extensions;
using LogViewer.Filters;
using LogViewer.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogViewer.Controllers
{
    [Route("api/[controller]")]
    public class LogEntryDataController: Controller
    {
        private readonly ILogEntryRetrievalService logService;
        private readonly IHostingEnvironment hostingEnvironment;

        public LogEntryDataController(ILogEntryRetrievalService logService, IHostingEnvironment hostingEnvironment)
        {
            this.logService = logService ?? throw new ArgumentNullException(nameof(logService));
            this.hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<AppNameResponse>> GetAllAppNames()
        {
            var appNameList = await logService.GetAllApplicationsAsync().ConfigureAwait(false);
            return new AppNameResponse
            {
                Applications = appNameList
            };
        }

        [HttpPost("[action]")]
        [ApiModelFilter]
        public async Task<ActionResult<LogEntryResponse>> GetLogEntries([FromBody]LogEntryRequest request)
        {
            var (logEntries, totalCount) = await logService.GetLogEntriesAsync(request.Filters, request.Page, request.CountPerPage, request.Sorting).ConfigureAwait(false);

            return new LogEntryResponse
            {
                CurrentPage = request.Page,
                TotalEntries = totalCount,
                LogEntries = logEntries.Select(x => x.ToViewModel())
            };
        }

        [HttpGet("[action]")]
        public ActionResult<EnvironmentNameResponse> GetHostingEnvironment() => new EnvironmentNameResponse { EnvironmentName = hostingEnvironment.EnvironmentName };
    }
}
