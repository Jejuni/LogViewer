import { LogLevels } from './LogLevels';
import { LogFilters } from './LogFilters';
import { LogSorting } from './LogSorting';

export class LogEntryRequest {
    page: number;
    countPerPage: number;
    sorting: LogSorting | null;
    filters: LogFilters;
}
