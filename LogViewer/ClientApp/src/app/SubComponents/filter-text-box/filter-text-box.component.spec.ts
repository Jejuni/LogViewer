import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTextBoxComponent } from './filter-text-box.component';

describe('FilterTextBoxComponent', () => {
  let component: FilterTextBoxComponent;
  let fixture: ComponentFixture<FilterTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
