import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageJsonTreeContainerComponent } from './message-json-tree-container.component';

describe('MessageJsonTreeContainerComponent', () => {
  let component: MessageJsonTreeContainerComponent;
  let fixture: ComponentFixture<MessageJsonTreeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageJsonTreeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageJsonTreeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
