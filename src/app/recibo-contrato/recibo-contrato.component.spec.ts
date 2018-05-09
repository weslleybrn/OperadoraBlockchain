import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboContratoComponent } from './recibo-contrato.component';

describe('ReciboContratoComponent', () => {
  let component: ReciboContratoComponent;
  let fixture: ComponentFixture<ReciboContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
