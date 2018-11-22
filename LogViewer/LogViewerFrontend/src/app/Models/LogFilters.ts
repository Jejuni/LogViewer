import { LogLevels } from './LogLevels';

export class LogFilters {
    appId: number | null;
    logLevels: LogLevels[];
    startDate: Date | null;
    endDate: Date | null;
    messageInclude: string | null;
}
