import { LogLevels } from './LogLevels';
import { Application } from './Application';

export interface LogEntry {
    id: number;
    application: Application;
    entryTime: Date;
    logLevel: LogLevels;
    message: string;
    exception: string | null;
    logger: string;
    stacktrace: string;
}
