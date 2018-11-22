import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSplashScreenComponent } from './header-splash-screen.component';

describe('HeaderSplashScreenComponent', () => {
  let component: HeaderSplashScreenComponent;
  let fixture: ComponentFixture<HeaderSplashScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSplashScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
