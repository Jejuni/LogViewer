import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFilterContainerComponent } from './master-filter-container.component';

describe('MasterFilterContainerComponent', () => {
  let component: MasterFilterContainerComponent;
  let fixture: ComponentFixture<MasterFilterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFilterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
