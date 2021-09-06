import { Injectable } from '@angular/core';
import { RequestCadastro } from '../modelos/request-cadastro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responselogin } from '../modelos/responselogin';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private httpClient: HttpClient) { }
  Url = 'http://nota100.com.br/api/v1/usuario/novo';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer my-auth-token' })
  }
  send(requestCadastro: RequestCadastro): Observable<Responselogin> {
    return this.httpClient.post<Responselogin>(this.Url, requestCadastro);
  }
}