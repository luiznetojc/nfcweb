import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
//import { Produto } from '../Models/produto';
import { Produtos } from '../modelos/produtos';


const ELEMENT_DATA: Produtos[] = [
 /*  { Id: 1, Nome: 'Feijão',Categoria: 'grâos', Valor: 5.1,Fornecedor: "fornecedor 1", Quantidade:155},
  { Id: 1, Nome: 'Arroz',Categoria: 'grãos', Valor: 4.1,Fornecedor: "fornecedor 1", Quantidade:1243},
  { Id: 1, Nome: 'Alface',Categoria: 'verdura', Valor: 3,Fornecedor: "fornecedor 1", Quantidade:3},
  { Id: 1, Nome: 'Repolho',Categoria: 'verdura', Valor: 8.5,Fornecedor: "fornecedor 1", Quantidade:1423 },
  { Id: 1, Nome: 'Couve',Categoria: 'legume', Valor: 9.4,Fornecedor: "fornecedor 1", Quantidade:1253 },
  { Id: 1, Nome: 'Lentilha',Categoria: 'grãos', Valor: 1.5,Fornecedor: "fornecedor 1", Quantidade:13 },
  { Id: 1, Nome: 'Cenoura',Categoria: 'verdura', Valor: 2,Fornecedor: "fornecedor 1", Quantidade:12343 },
  { Id: 1, Nome: 'Batata',Categoria: 'verdura', Valor: 1.0079,Fornecedor: "fornecedor 1", Quantidade:1345 },
 */
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  pieChart = [];

  displayedColumns: string[] = ['Id', 'Nome', 'Valor', 'Quantidade','Fornecedor'];
  dataSource_All = new MatTableDataSource<Produtos>(ELEMENT_DATA);
  dataSource_Empty = new MatTableDataSource<Produtos>(ELEMENT_DATA);
  dataSource_byFornecedor = new MatTableDataSource<Produtos>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dataSource_All.paginator = this.paginator;
    this.dataSource_byFornecedor.paginator = this.paginator;
    this.dataSource_Empty.paginator = this.paginator;
  }

}
