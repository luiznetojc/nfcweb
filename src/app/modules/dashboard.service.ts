import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Produto } from './modelos/produto';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  URL = "https://localhost:44378/";
  /* getAllProducts(): Observable<Produto>
  {
    return this.http.get<Produto>(this.URL+'api/Produto/getProdutos');
  } */
  bigChart() {
    return [{
      name: 'Fornecedor 1',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Fornecedor 2',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Fornecedor 3',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'Fornecedor 4',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Fornecedor 5',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'Cereais',
      y: 11.41,
      sliced: true,
      selected: true
    }, {
      name: ', Chá',
      y: 11.84
    }, {
      name: ' Frutas',
      y: 10.85
    }, {
      name: 'Grãos',
      y: 14.67
    }, {
      name: 'Hortaliças',
      y: 14.18
    }, {
      name: 'Legumes',
      y: 11.64
    }, {
      name: 'Temperos',
      y: 11.6
    }, {
      name: 'Outros',
      y: 14.61
    }];
  }



}
