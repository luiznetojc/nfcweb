import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { RequestLogin } from '../modelos/request-login';
import { Responselogin } from '../modelos/responselogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  Url = 'http://nota100.com.br/api/v1/usuario/login';


  async doLogin(requestLogin: RequestLogin) {
    const result = await this.httpClient.post<any>(this.Url, requestLogin).toPromise();
    if (result && result.tokenUsuarioLogado) {
      window.localStorage.setItem('token', result.tokenUsuarioLogado);
      window.localStorage.setItem('cpfUsuario', result.emailUsuarioLogado);
      window.localStorage.setItem('idempresa', result.idempresa);
      return true;
    }
    return false;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwtDecode(token);
    if (decoded.exp === undefined) {
      //return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    }
    else if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }
  removeAuthorizationToken() {
    window.localStorage.removeItem('token');
  }

}

