import { TestBed } from '@angular/core/testing';

import { TableHeightSetterService } from './table-height-setter.service';

describe('TableHeightSetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableHeightSetterService = TestBed.get(TableHeightSetterService);
    expect(service).toBeTruthy();
  });
});
