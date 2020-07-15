import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Responsavel {
  _id: string | undefined
  nome: string
  cpf: string
  endereco: string
  telefone: string
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  // INJEÇÃO DE DEPENDÊNCIA: em vez de criarmos
  // manualmente as DEPENDÊNCIAS necessárias, o
  // próprio Angular as cria e INJETA o objeto
  // já instanciado como parâmetro do construtor
  constructor(private http: HttpClient) { }

  private apiUri : string = env.apiBaseUri + 'responsavel'

  listar(): Promise<Responsavel[]> {
    return this.http.get<Responsavel[]>(this.apiUri).toPromise()
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

  obterUm(id: string): Promise<Responsavel> {
    return this.http.get<Responsavel>(this.apiUri + '/' + id).toPromise()
  }
}