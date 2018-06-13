import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactModalComponent } from './enact-modal.component';

describe('EnactModalComponent', () => {
  let component: EnactModalComponent;
  let fixture: ComponentFixture<EnactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
