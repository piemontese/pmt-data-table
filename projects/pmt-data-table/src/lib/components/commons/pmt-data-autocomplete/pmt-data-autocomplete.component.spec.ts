import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtDataAutocompleteComponent } from './pmt-data-autocomplete.component';

describe('PmtDataAutocompleteComponent', () => {
  let component: PmtDataAutocompleteComponent;
  let fixture: ComponentFixture<PmtDataAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtDataAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtDataAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
