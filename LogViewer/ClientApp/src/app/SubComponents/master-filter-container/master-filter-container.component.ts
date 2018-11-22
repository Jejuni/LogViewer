import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Application } from 'src/app/Models/Application';
import { LogLevelStyleRetrieverService } from 'src/app/Services/log-level-style-retriever.service';
import { LogLevels } from './../../Models/LogLevels';
import { Observable } from 'rxjs';
import { LogInfoRetrieverService } from 'src/app/Services/log-info-retriever.service';
import { LogEntryTableDatasourceService } from 'src/app/Services/log-entry-table-datasource.service';
import { LogFilters } from 'src/app/Models/LogFilters';

@Component({
  selector: 'app-master-filter-container',
  templateUrl: './master-filter-container.component.html',
  styleUrls: ['./master-filter-container.component.scss']
})
export class MasterFilterContainerComponent implements OnInit {
  constructor(
    public logStyleRetriever: LogLevelStyleRetrieverService,
    public logRetriever: LogInfoRetrieverService,
    public logDataSource: LogEntryTableDatasourceService) {
      this.currentLogFilters = new LogFilters();
     }

  public availableApps$: Observable<Application[]>;
  public currentLogFilters: LogFilters;

  ngOnInit() {
    const todaysDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(todaysDate.getDate() - 14);
    const futureDate = new Date();
    futureDate.setDate(todaysDate.getDate() + 1);

    this.currentLogFilters.endDate = futureDate;
    this.currentLogFilters.startDate = pastDate;
    this.currentLogFilters.logLevels = [
      LogLevels.TRACE, LogLevels.DEBUG, LogLevels.INFO, LogLevels.WARN, LogLevels.ERROR, LogLevels.FATAL
    ];

    this.availableApps$ = this.logRetriever.getAllAppNames();
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }

  public onAppNameSelectionChanged(newAppId: number) {
    this.currentLogFilters.appId = newAppId;
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }

  public onLogLevelSelectionChanged(newLogLevels: LogLevels[]) {
    this.currentLogFilters.logLevels = newLogLevels;
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }

  public onEntryStartDateChanged(newStartDate: Date) {
    this.currentLogFilters.startDate = newStartDate;
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }

  public onEntryEndDateChanged(newEndDate: Date) {
    this.currentLogFilters.endDate = newEndDate;
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }

  public onMessageFilterChanged(newMessageFilter: string) {
    this.currentLogFilters.messageInclude = newMessageFilter;
    this.logDataSource.loadNewResults(this.currentLogFilters);
  }
}
