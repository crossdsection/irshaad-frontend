import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavLocationComponent } from './fav-location.component';

describe('FavLocationComponent', () => {
  let component: FavLocationComponent;
  let fixture: ComponentFixture<FavLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
