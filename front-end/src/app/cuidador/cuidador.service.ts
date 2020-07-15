import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Cuidador {
  _id: string | undefined
  nome: string
  rg: string
  cpf: string
  data_nascimento: string
  endereco: string
  estado_civil: string | undefined
  email: string
  telefone: string
}

@Injectable({
  providedIn: 'root'
})
export class CuidadorService {

  // INJEÇÃO DE DEPENDÊNCIA: em vez de criarmos
  // manualmente as DEPENDÊNCIAS necessárias, o
  // próprio Angular as cria e INJETA o objeto
  // já instanciado como parâmetro do construtor
  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'cuidador'

  listar(): Promise<Cuidador[]> {
    return this.http.get<Cuidador[]>(this.apiUri).toPromise()
  }

  excluir(id: string) {
    return this.http.request('DELETE', this.apiUri, 
      { body: { _id: id } }).toPromise()
  }

  novo(body: Cuidador) {
    return this.http.post(this.apiUri, body).toPromise()
  }

  atualizar(body: Cuidador) {
    return this.http.put(this.apiUri, body).toPromise()
  }

  obterUm(id: string): Promise<Cuidador> {
    return this.http.get<Cuidador>(this.apiUri + '/' + id).toPromise()
  }
}