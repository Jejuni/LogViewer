import { TestBed } from '@angular/core/testing';

import { TreeParserService } from './tree-parser.service';

describe('TreeParserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeParserService = TestBed.get(TreeParserService);
    expect(service).toBeTruthy();
  });
});
