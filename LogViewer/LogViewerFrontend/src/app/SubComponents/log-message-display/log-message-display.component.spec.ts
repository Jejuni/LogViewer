import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageDisplayComponent } from './log-message-display.component';

describe('LogMessageDisplayComponent', () => {
  let component: LogMessageDisplayComponent;
  let fixture: ComponentFixture<LogMessageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMessageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
