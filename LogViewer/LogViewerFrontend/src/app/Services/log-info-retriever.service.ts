import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LogEntry } from '../Models/LogEntry';
import { LogEntryRequest } from '../Models/LogEntryRequest';
import { LogEntryResponse } from '../Models/LogEntryResponse';
import { map, catchError } from 'rxjs/operators';
import { AppNameResponse } from '../Models/AppNameResponse';
import { Application } from '../Models/Application';
import { EnvironmentNameResponse } from '../Models/EnvironmentNameResponse';

@Injectable({
  providedIn: 'root'
})
export class LogInfoRetrieverService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Retrieves an observable of log entries given the supplied filtering and sorting parameters.
   * In case of an error a message is logged to the console and a reponse initialized to standard values is returned
   * @param request The parameters by which to retrieve the log entries by.
   */
  public getLogEntries(request: LogEntryRequest): Observable<LogEntryResponse> {
    const url = `${this.baseUrl}/api/LogEntryData/getLogEntries`;
    return this.http.post<LogEntryResponse>(url, request).pipe(
      catchError(err => {
        console.log(`Error during logEntry retrieval. Error was [${JSON.stringify(err)}]`);
        return of(LogEntryResponse.getEmptyResponse());
      })
    );
  }

  /**
   * Retrieves an observable of all available app names in the logging database.
   * In case of an error a message is logged to the console and an empty array is returned
   */
  public getAllAppNames(): Observable<Application[]> {
    const url = `${this.baseUrl}/api/LogEntryData/GetAllAppNames`;
    return this.http.get<AppNameResponse>(url).pipe(
      map(res => res.applications),
      catchError(err => {
        console.log(`Error during appName retrieval. Error was [${JSON.stringify(err)}]`);
        return of([]);
      })
    );
  }

  /**
   * Retrieves the friendly name of the current environment (Development, Staging, Production)
   * In case of an error a message is logged to the console and an empty string is returned
   */
  public getHostingEnvName(): Observable<string> {
    const url = `${this.baseUrl}/api/LogEntryData/GetHostingEnvironment`;
    return this.http.get<EnvironmentNameResponse>(url).pipe(
      map(data => data.environmentName),
      catchError(err => {
        console.log(`Error during Environment Name retrieval. Error was [${JSON.stringify(err)}]`);
        return of('');
      })
    );
  }
}
