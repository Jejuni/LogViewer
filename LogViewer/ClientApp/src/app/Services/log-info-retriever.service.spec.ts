import { TestBed } from '@angular/core/testing';

import { LogInfoRetrieverService } from './log-info-retriever.service';

describe('LogRetrieverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogInfoRetrieverService = TestBed.get(LogInfoRetrieverService);
    expect(service).toBeTruthy();
  });
});
