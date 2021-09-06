import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Produtos } from '../modelos/produtos';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  URL_API = 'http://nota100.com.br/api/v1';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic my-auth-token' })
  }

  searchProduto(searchTerm: string) {
    return this.http.get<Produtos>(this.URL_API +'/'+'produto'+'/'+ 'PesquisaPorNome/' +window.localStorage.getItem("idempresa")+'/'+ searchTerm).pipe(retry(2), catchError(this.handleError))
  }
  //pegaro todos os produtos
  getAllProdutos(): Observable<Produtos> {
    return this.http.get<Produtos>(this.URL_API+'/'+'produto').pipe(retry(2), catchError(this.handleError))
  }
  getProdutoById(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(this.URL_API +'/'+'produto' + '/' + id).pipe(retry(2), catchError(this.handleError))
  }
  getProdutosById(id: number):Observable<Produtos>
  {

    return this.http.get<Produtos>(this.URL_API+'/'+'ConsultaPedido/PesquisaItemPedido/' + id).pipe(retry(2),catchError(this.handleError))
  }
  //salvar um produto
  saveProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.URL_API+'/'+'produto', JSON.stringify(produto), this.httpOptions)
  }
  // utualiza um produto
  updateProduto(produto: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(this.URL_API +'/'+'produto'+ '/' + produto.idproduto, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um produto
  deleteProduto(produto: Produtos) {
    return this.http.delete<Produtos>(this.URL_API + '/' + produto.idproduto, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}

