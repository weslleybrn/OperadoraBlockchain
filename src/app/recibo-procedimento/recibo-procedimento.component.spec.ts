import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboProcedimentoComponent } from './recibo-procedimento.component';

describe('ReciboProcedimentoComponent', () => {
  let component: ReciboProcedimentoComponent;
  let fixture: ComponentFixture<ReciboProcedimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboProcedimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
