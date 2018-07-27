import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtDeptListGridComponent } from './govt-dept-list-grid.component';

describe('GovtDeptListGridComponent', () => {
  let component: GovtDeptListGridComponent;
  let fixture: ComponentFixture<GovtDeptListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtDeptListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtDeptListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
