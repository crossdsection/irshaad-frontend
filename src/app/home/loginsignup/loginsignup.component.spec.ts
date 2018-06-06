import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsignupComponent } from './loginsignup.component';

describe('LoginsignupComponent', () => {
  let component: LoginsignupComponent;
  let fixture: ComponentFixture<LoginsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
