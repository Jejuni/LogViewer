import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoglevelDisplaysComponent } from './loglevel-displays.component';

describe('LoglevelDisplaysComponent', () => {
  let component: LoglevelDisplaysComponent;
  let fixture: ComponentFixture<LoglevelDisplaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoglevelDisplaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglevelDisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
