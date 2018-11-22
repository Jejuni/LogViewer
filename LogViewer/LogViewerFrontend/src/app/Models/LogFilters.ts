import { LogLevels } from './LogLevels';

export class LogFilters {
    appId: number | null;
    logLevels: LogLevels[];
    startDate: Date | null;
    endDate: Date | null;
    messageIncludes: string[] | null;
    messageExcludes: string[] | null;
    loggernameIncludes: string[] | null;
    loggernameExcludes: string[] | null;

    static getDefaultLogFilters(): LogFilters {
        return {
            appId: null,
            logLevels: Object.keys(LogLevels).map(val => LogLevels[val]),
            startDate: null,
            endDate: null,
            messageIncludes: null,
            messageExcludes: null,
            loggernameIncludes: null,
            loggernameExcludes: null
        };
    }
}
