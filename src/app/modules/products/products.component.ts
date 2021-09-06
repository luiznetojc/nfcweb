import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
//import { Produto } from '../Models/produto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  valid_qtd = false;
  valid_valor = false;
 // AllProducts!: Observable<Produto>
  constructor(private dashSvc: DashboardService) { }
  getAllProducts()
  {
    //this.AllProducts = this.dashSvc.getAllProducts();

  }
  turnValid_qtd(){
    if(this.valid_qtd == true){
      this.valid_qtd = false;
      return;
    }
    this.valid_qtd = true;
  }
  turnValid_valor(){
    if(this.valid_valor == true){
      this.valid_valor = false;
      return;
    }
    this.valid_valor = true;
  }
  ngOnInit() {
    this.getAllProducts();
  }

}
