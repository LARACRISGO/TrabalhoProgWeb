import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Idoso {
  _id: string | undefined
  nome: string
  data_nascimento: Date
  cpf: string
  rg: string
  endereco: string
  estado_civil: string | undefined
  peso: string
  altura: string
  telefone_emergencia: string
  enfermidades: string
  alergia_medicamento: string
}

@Injectable({
  providedIn: 'root'
})
export class IdosoService {

  // INJEÇÃO DE DEPENDÊNCIA: em vez de criarmos
  // manualmente as DEPENDÊNCIAS necessárias, o
  // próprio Angular as cria e INJETA o objeto
  // já instanciado como parâmetro do construtor
  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'idoso'

  listar(): Promise<Idoso[]> {
    return this.http.get<Idoso[]>(this.apiUri).toPromise()
  }

  excluir(id: string) {
    return this.http.request('DELETE', this.apiUri, 
      {body: { _id: id }}).toPromise()
  }

  novo(body: any) {
    return this.http.post(this.apiUri, body).toPromise()
  }

  atualizar(body: any) {
    return this.http.put(this.apiUri, body).toPromise()
  }

  obterUm(id: string): Promise<Idoso> {
    return this.http.get<Idoso>(this.apiUri + '/' + id).toPromise()
  }
}