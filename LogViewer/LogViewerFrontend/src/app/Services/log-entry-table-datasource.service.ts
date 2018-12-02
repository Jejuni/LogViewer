import { Injectable } from '@angular/core';
import { LogEntry } from '../Models/LogEntry';
import { DataSource } from '@angular/cdk/table';
import { Observable, of, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { map, startWith, switchMap, catchError, debounceTime, delay, tap } from 'rxjs/operators';
import { LogInfoRetrieverService } from './log-info-retriever.service';
import { LogLevels } from '../Models/LogLevels';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { LogEntryRequest } from '../Models/LogEntryRequest';
import { LogEntryResponse } from '../Models/LogEntryResponse';
import { LogFilters } from '../Models/LogFilters';
import { Nullable } from '../Models/Nullable';
import { LogSorting } from '../Models/LogSorting';

@Injectable({
  providedIn: 'root'
})
export class LogEntryTableDatasourceService extends DataSource<LogEntry> {

  constructor(private logEntryService: LogInfoRetrieverService) {
    super();
    this.subject$ = new BehaviorSubject<LogEntry[]>([]);
    this.logEntryEmitter$ = this.subject$.asObservable();
    this.currentLogFilters = LogFilters.getDefaultLogFilters();
    this.sortOptions = {
      value: {
        sortColumn: 'entryTime',
        sortOrder: 'desc'
      }
    };
  }

  private paginator: MatPaginator;
  private sorter: MatSort;
  private sortOptions: Nullable<LogSorting>;
  private currentLogFilters: LogFilters;
  private subject$: BehaviorSubject<LogEntry[]>;
  private logEntryEmitter$: Observable<LogEntry[]>;
  private combinedSubscriptions: Subscription | null;
  private httpSubscription: Subscription;

  public isLoadingResults = true;
  public resultsLength = 0;
  public currentPage = 0;
  public pageSize = 25;

  public addSorterAndPager(paginator: MatPaginator, sorter: MatSort): void {
    if (!!this.combinedSubscriptions) {
      this.combinedSubscriptions.unsubscribe();
      this.combinedSubscriptions = null;
    }

    this.paginator = paginator;
    this.sorter = sorter;

    this.combinedSubscriptions = this.paginator.page.subscribe(data => {
      const ev = data as PageEvent;

      const logEntryRequest: LogEntryRequest = {
        countPerPage: ev.pageSize,
        page: ev.pageIndex,
        filters: this.currentLogFilters,
        sorting: this.sortOptions.value
      };

      this.updateStatePublishResults(logEntryRequest);
    });

    const otherSub: Subscription = this.sorter.sortChange.subscribe(data => {
      const ev = data as Sort;

      const logEntryRequest: LogEntryRequest = {
        countPerPage: this.pageSize,
        page: this.currentPage,
        filters: this.currentLogFilters,
        sorting: !!ev.active && !!ev.direction ? {
          sortColumn: ev.active,
          sortOrder: ev.direction
        } : null
      };

      this.updateStatePublishResults(logEntryRequest);
    });
    this.combinedSubscriptions!.add(otherSub);
  }

  public refreshCurrentResults(): void {
    const logEntryRequest = new LogEntryRequest();

    logEntryRequest.filters = this.currentLogFilters;
    logEntryRequest.countPerPage = this.pageSize;
    logEntryRequest.page = this.currentPage;
    logEntryRequest.sorting = this.sortOptions.value;

    this.updateStatePublishResults(logEntryRequest);
  }

  public loadNewResults(logFilters: LogFilters): void {
    const logEntryRequest = new LogEntryRequest();
    logEntryRequest.filters = logFilters;

    logEntryRequest.page = 0;
    logEntryRequest.countPerPage = this.pageSize;

    logEntryRequest.sorting = this.sortOptions.value;

    this.updateStatePublishResults(logEntryRequest);
  }

  private updateStatePublishResults(logEntryRequest: LogEntryRequest): void {
    this.isLoadingResults = true;

    this.currentLogFilters = logEntryRequest.filters;
    this.pageSize = logEntryRequest.countPerPage;
    this.currentPage = logEntryRequest.page;
    this.sortOptions.value = logEntryRequest.sorting;

    if (!!this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
    this.httpSubscription = this.logEntryService.getLogEntries(logEntryRequest).subscribe(data => {
      this.isLoadingResults = false;
      this.resultsLength = data.totalEntries;

      this.subject$.next(data.logEntries);
    });
  }

  public connect(): Observable<LogEntry[]> {
    return this.logEntryEmitter$;
  }

  public disconnect(): void {
    if (!!this.combinedSubscriptions) {
      this.combinedSubscriptions.unsubscribe();
    }
    if (!!this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
