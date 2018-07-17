import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfileIconComponent } from './header-profile-icon.component';

describe('HeaderProfileIconComponent', () => {
  let component: HeaderProfileIconComponent;
  let fixture: ComponentFixture<HeaderProfileIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderProfileIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProfileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
