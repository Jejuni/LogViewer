import { LogEntry } from './LogEntry';

export class LogEntryResponse {
    totalEntries: number;
    currentPage: number;
    logEntries: LogEntry[];

    static getEmptyResponse(): LogEntryResponse {
        return {
            totalEntries: 0,
            currentPage: 0,
            logEntries: []
        };
    }
}
