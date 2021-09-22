import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePedido } from '../modelos/response-pedido';
import { PedidosService } from '../services/pedidos.service';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import { ProdutosService } from '../services/produtos.service';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(private pedidosSvc: PedidosService, private ProdutosSvc: ProdutosService) { }
  allPedidos!: Observable<any>;
  allProdutos!: Observable<any>;
  pedidosRangeData!: Observable<any>;
  id = 1;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ngOnInit(): void {

    this.searchPedido();

  }
  reloadPedido() {
    this.searchPedido();
  }
  cancelarNota(id: string) {
    this.pedidosSvc.cancelarNota(id);
  }
  begin_data = "";
  end_data = "";
  getAllXML() {
    this.pedidosRangeData = this.pedidosSvc.getPedidosbyRangeData(this.begin_data, this.end_data);
    this.pedidosRangeData.subscribe(pedidos => {
      for (let pedido of pedidos) {
        var res = this.pedidosSvc.getXmlReport(pedido["xml"])
        res.subscribe(res => {
          saveAs(res);
        })
      }
    })

  }
  getPDF(url: string) {
    var res = this.pedidosSvc.getPdfReport(url);
    res.subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    })
  }
  getXML(url: string) {
    var res = this.pedidosSvc.getXmlReport(url);
    res.subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    })
  }
  data = new Date();
  dataString = "";
  formatDate(data: string) {
    data = formatDate(this.data, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    return data;
  }
  formatDatePedidos() {
    this.allPedidos.forEach(data => {
      data.data_pedido = this.formatDate(data.data_pedido);
    })
  }
  searchProdutobyId(id: number) {
    this.allProdutos = this.ProdutosSvc.getProdutosById(id);
  }
  searchPedido() {
    this.dataString = this.formatDate(this.dataString);
    this.allPedidos = this.pedidosSvc.getPedidosbyData(this.dataString.substring(0, 10));
    this.formatDatePedidos();
  }
  checkNfc(id: string) {
    this.pedidosSvc.checkNfc(id)
  }

}
