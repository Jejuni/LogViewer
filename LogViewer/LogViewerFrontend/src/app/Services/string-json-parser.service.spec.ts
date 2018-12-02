import { TestBed } from '@angular/core/testing';

import { StringJsonParserService } from './string-json-parser.service';

describe('StringJsonParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringJsonParserService = TestBed.get(StringJsonParserService);
    expect(service).toBeTruthy();
  });
});
