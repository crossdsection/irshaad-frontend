import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTabComponent } from './location-tab.component';

describe('LocationTabComponent', () => {
  let component: LocationTabComponent;
  let fixture: ComponentFixture<LocationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
