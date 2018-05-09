import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacaoComponent } from './autorizacao.component';

describe('AutorizacaoComponent', () => {
  let component: AutorizacaoComponent;
  let fixture: ComponentFixture<AutorizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
