import { TestBed } from '@angular/core/testing';

import { LogLevelStyleRetrieverService } from './log-level-style-retriever.service';

describe('LogLevelStyleRetrieverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogLevelStyleRetrieverService = TestBed.get(LogLevelStyleRetrieverService);
    expect(service).toBeTruthy();
  });
});
