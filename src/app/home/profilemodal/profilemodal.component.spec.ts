import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemodalComponent } from './profilemodal.component';

describe('ProfilemodalComponent', () => {
  let component: ProfilemodalComponent;
  let fixture: ComponentFixture<ProfilemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
