import { TestBed } from '@angular/core/testing';

import { LogEntryTableDatasourceService } from './log-entry-table-datasource.service';

describe('LogEntrsyTableDatasourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogEntryTableDatasourceService = TestBed.get(LogEntryTableDatasourceService);
    expect(service).toBeTruthy();
  });
});
