import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestPedido } from '../modelos/request-pedido';
import { ResponsePedido } from '../modelos/response-pedido'

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

URL_API = 'http://nota100.com.br/api/v1';
//URL_API = 'http://localhost:27109/api/v1';
 
  _URL_API = '';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'x-api-key': '96b4f8b9-91b7-4581-b200-4ae4dae2110e' })
  }
  getPedidosbyRangeData(begin: string, end: string)
  {
    return this.http.get<ResponsePedido>(this.URL_API+'/ConsultaPedido/PesquisaPorIntervaloData/'+begin+'/'+end);
  }

  getAllPedidos(): Observable<ResponsePedido> {
    return this.http.get<ResponsePedido>(this.URL_API+'/'+'pedido').pipe(retry(2), catchError(this.handleError))
  }
  sendPedido(request: RequestPedido): Observable<ResponsePedido> {
    return this.http.post<ResponsePedido>(this.URL_API+'/'+'pedido', request);
  }
  getPedidosbyData(data: any)
  {
    return this.http.get<ResponsePedido>(this.URL_API+ '/'+'ConsultaPedido/PesquisaPorData'+'/'+ data).pipe(retry(2), catchError(this.handleError))
  }
  getPdfReport(url: string) 
  {
    const headers = new HttpHeaders().set('x-api-key', '96b4f8b9-91b7-4581-b200-4ae4dae2110e');
    return this.http.get(url,{headers, responseType: 'blob'}).pipe(
      map((res: any) => {
        return new Blob([res], { type: 'application/pdf' });
      })
    );
    
  }
  cancelarNota(id:string)
  {
    const justificativa ="Erro na emissão da nota fiscal"; 
    const url_externa = "https://api.plugnotas.com.br/nfce/" + id + "/cancelamento";
    const headers = new HttpHeaders().set('x-api-key', '96b4f8b9-91b7-4581-b200-4ae4dae2110e');
    return this.http.post<any>(url_externa,justificativa,{headers}).subscribe(res => console.log(res));
  }
  getXmlReport(url: string) 
  {
    
    const headers = new HttpHeaders().set('x-api-key', '96b4f8b9-91b7-4581-b200-4ae4dae2110e');
    return this.http.get(url,{headers, responseType: 'blob'}).pipe(
      map((res: any) => {
        return new Blob([res], { type: 'application/xml' });
      })
    );
    
  }
  checkNfc(id:string)
  {
    return this.http.get<ResponsePedido>(this.URL_API+ '/'+'ConsultaPedido/PesquisaSituacaoPedido'+'/'+ id).subscribe();
 //  this._URL_API = 'http://localhost:27109/api/v1/ConsultaPedido/PesquisaSituacaoPedido'+'/'+ id;
  //  return this.http.get<ResponsePedido>(this._URL_API).pipe(retry(2), catchError(this.handleError))
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
