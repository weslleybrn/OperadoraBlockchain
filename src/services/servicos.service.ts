import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import {
  Observable,
  Observer,
  of,
  BehaviorSubject
} from 'rxjs';

export class Servico {
  constructor(public codigo: string,
    public nome: string,
    public valor: number) {}
}

const SERVICOS: Servico[] = [
  new Servico('SERV01', 'Exame de sangue', 50),
  new Servico('SERV02', 'Raio X', 100),
  new Servico('SERV03', 'Consulta', 150)
];

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  private $servicos: Observable<Servico[]>;

  constructor() {
    this.$servicos = of(SERVICOS);
  }

  getServicos(): Observable<Servico[]> {
    return this.$servicos;
  }

  getServicoPorCodigo(codigo: string): Observable<Servico> {
    return this.getServicos()
      .pipe(map(servicos => servicos.find(servico => servico.codigo === codigo)))
      .pipe(take(1))
      .pipe(map(contratos => {
        return contratos;
      }));
  }
}
