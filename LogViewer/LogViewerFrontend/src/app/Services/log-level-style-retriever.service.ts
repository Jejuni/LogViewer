import { Injectable } from '@angular/core';
import { LogLevels } from '../Models/LogLevels';

@Injectable({
  providedIn: 'root'
})
export class LogLevelStyleRetrieverService {

  constructor() {
    const logLevels = LogLevels;
    this.allLogLevels = Object.keys(logLevels);
   }

  public allLogLevels: string[];

  /**
   * Retrieve the correct material icon and style value corresponding to the given loglevel
   * @param logLevel the loglevel to retrieve the corresponding icon for
   */
  public getStyleForLogLevel(logLevel: LogLevels) {
    switch (logLevel) {
      case LogLevels.TRACE:
        return { iconName: 'assignment', style: { color: 'gray'}, bgStyle: { backgroundColor: 'gray'} };
      case LogLevels.DEBUG:
        return { iconName: 'bug_report', style: { color: '#4ea70d' }, bgStyle: { backgroundColor: '#4ea70d'} };
      case LogLevels.INFO:
        return { iconName: 'info', style:  { color: '#49a1ff' }, bgStyle: { backgroundColor: '#49a1ff'} };
      case LogLevels.WARN:
        return { iconName: 'warning', style:  { color: '#ffc518' }, bgStyle: { backgroundColor: '#ffc518'} };
      case LogLevels.ERROR:
        return { iconName: 'error', style: { color: 'red' }, bgStyle: { backgroundColor: 'red'} };
      case LogLevels.FATAL:
        return { iconName: 'notification_important', style: { color: 'red' }, bgStyle: { backgroundColor: 'red'} };
      default:
        throw new Error(`Unknown logLevel [${logLevel}]`);
    }
  }
}
