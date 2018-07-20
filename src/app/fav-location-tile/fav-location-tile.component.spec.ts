import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavLocationTileComponent } from './fav-location-tile.component';

describe('FavLocationTileComponent', () => {
  let component: FavLocationTileComponent;
  let fixture: ComponentFixture<FavLocationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavLocationTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavLocationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
