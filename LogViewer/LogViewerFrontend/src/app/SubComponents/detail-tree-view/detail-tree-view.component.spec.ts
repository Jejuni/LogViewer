import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTreeViewComponent } from './detail-tree-view.component';

describe('DetailTreeViewComponent', () => {
  let component: DetailTreeViewComponent;
  let fixture: ComponentFixture<DetailTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
