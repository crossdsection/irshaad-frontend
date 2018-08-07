import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactDetailComponent } from './enact-detail.component';

describe('EnactDetailComponent', () => {
  let component: EnactDetailComponent;
  let fixture: ComponentFixture<EnactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
