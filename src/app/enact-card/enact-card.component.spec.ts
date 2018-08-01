import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactCardComponent } from './enact-card.component';

describe('EnactCardComponent', () => {
  let component: EnactCardComponent;
  let fixture: ComponentFixture<EnactCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
