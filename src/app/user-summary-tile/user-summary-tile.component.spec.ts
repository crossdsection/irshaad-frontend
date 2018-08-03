import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummaryTileComponent } from './user-summary-tile.component';

describe('UserSummaryTileComponent', () => {
  let component: UserSummaryTileComponent;
  let fixture: ComponentFixture<UserSummaryTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSummaryTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSummaryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
