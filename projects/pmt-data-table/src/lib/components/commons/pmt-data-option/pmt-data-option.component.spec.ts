import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtDataOptionComponent } from './pmt-data-option.component';

describe('PmtDataOptionComponent', () => {
  let component: PmtDataOptionComponent;
  let fixture: ComponentFixture<PmtDataOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtDataOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtDataOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
