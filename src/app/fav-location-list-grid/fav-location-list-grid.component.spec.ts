import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavLocationListGridComponent } from './fav-location-list-grid.component';

describe('FavLocationListGridComponent', () => {
  let component: FavLocationListGridComponent;
  let fixture: ComponentFixture<FavLocationListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavLocationListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavLocationListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
