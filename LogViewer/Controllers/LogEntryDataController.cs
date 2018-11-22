using LogViewer.Core.Data.Entities;
using LogViewer.Core.Interfaces;
using LogViewer.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogViewer.Controllers
{
    [Route("api/[controller]")]
    public class LogEntryDataController: Controller
    {
        private readonly ILogEntryRetrievalService logService;

        public LogEntryDataController(ILogEntryRetrievalService logService)
        {
            this.logService = logService ?? throw new ArgumentNullException(nameof(logService));
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
        public async Task<ActionResult<LogEntryResponse>> GetLogEntries([FromBody]LogEntryRequest request)
        {
            var logEntryList = await logService.GetLogEntriesAsync(request.Filters, request.Page, request.CountPerPage, request.Sorting).ConfigureAwait(false);
            return new LogEntryResponse
            {
                CurrentPage = request.Page,
                TotalEntries = logEntryList.totalCount,
                LogEntries = logEntryList.logEntries
            };
        }
    }
}
