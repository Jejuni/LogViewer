import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntryDetailsComponent } from './log-entry-details.component';

describe('LogEntryDetailsComponent', () => {
  let component: LogEntryDetailsComponent;
  let fixture: ComponentFixture<LogEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
