import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidoItem } from 'src/app/modules/modelos/pedido-item';
import { PedidoPagamentos } from 'src/app/modules/modelos/pedido-pagamentos';
import { Produtos } from 'src/app/modules/modelos/produtos';
import { RequestPedido } from 'src/app/modules/modelos/request-pedido';
import { PedidosService } from 'src/app/modules/services/pedidos.service';
import { ProdutosService } from 'src/app/modules/services/produtos.service';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  request = new RequestPedido(0, "", "", 0, 0,window.localStorage.getItem["idempresa"],window.localStorage.getItem["cnpj_empresa"], [{
    idpedido_item: 0,
    idpedido: 0,
    idproduto: 0,
    descricao_produto: "",
    unidade_medida: "",
    ncm_produto: "",
    preco_item: 0,
    preco_desconto_item: 0,
    quantidade_item: 0
  }],[{
    idpedido_pagamento: 0,
            idpedido: 0,
            tipo_pagamento: "1",
            valor_pagamento: 0
  }]);
  public paginaAtual = 1;
  selecaoProdutos = Array<PedidoItem>();
  constructor(private produtosSvc: ProdutosService, private PedidosSvc: PedidosService, private router: Router) {
    this.cont = 0;
    this.qtd = 1;
  }
  public search = "";
  allProdutos!: Observable<any>;
  allPedidos!: Observable<any>;
  temp = {} as PedidoItem;
  cont = {} as number;
  qtd = {} as number;
  public valid = false;
  public CPF = "";
  ngOnInit(): void {
    //this.getAllProdutos();
    // this.getAllPedidos();
    this.request.pedido_item.pop();//remove valor de inicialização
  }
  getAllPedidos() {
    this.allPedidos = this.PedidosSvc.getAllPedidos();
  }
  getAllProdutos() {
    this.allProdutos = this.produtosSvc.getAllProdutos();
  }
  selectProduto(produto: Produtos, qtd: number) {
      this.cont += 1;
      this.temp = {} as PedidoItem;
      this.temp.idproduto = produto.idproduto;
      this.temp.idpedido_item = this.cont;
      this.temp.descricao_produto = produto.descricao_produto;
      this.temp.ncm_produto = produto.ncm_produto;
      this.temp.quantidade_item = 1;
      this.temp.preco_item = produto.preco_venda;
      this.request.pedido_item.push(this.temp);
      this.addPreco(this.temp);
      this.isValid();

  }
  changeQtd(produto: any, qtd: any){
    this.request.pedido_item.forEach((element, index) => {
      if (element.idpedido_item == produto.idpedido_item){
        this.erasePreco(element);
        element.quantidade_item = qtd.value;
        this.addPreco(element);}
    });
    qtd=1;
  }
  isValid() {
    if (this.cont > 0) {
      this.valid = true;
    }
    else {
      this.valid = false;
    }
  }
  searchProduto() {
    if (this.search.length == 0) {
      this.getAllProdutos();
      return;
    }
    else if (this.search.length >= 3) {

      this.allProdutos = this.produtosSvc.searchProduto(this.search);
    }
  }
  changePreco(produto: any, preco: any){
    this.request.pedido_item.forEach((element, index) => {
      if (element.idpedido_item == produto.idpedido_item){
        this.erasePreco(element);
        element.preco_item = preco.value;
        this.addPreco(element);
      }
   });

  }
  addPreco(produto: PedidoItem)// verify usado para dar desconto no preco total caso opçao 1 selecionada
  {
    console.log('add'+produto.preco_item);
    this.request.valor_pedido += produto.preco_item * produto.quantidade_item - (0);//desconto
    this.request.valor_pedido = parseFloat(this.request.valor_pedido.toFixed(2));

  }
  erasePreco(produto: PedidoItem) {
    console.log('erase'+produto.preco_item);
    this.request.valor_pedido -= produto.preco_item * produto.quantidade_item - (0);//desconto
    this.request.valor_pedido = parseFloat(this.request.valor_pedido.toFixed(2));
  }
  sendPedidos() {
    this.request.cpf = this.CPF;
    this.request.data_pedido = "2021-05-25T13:54:32.805Z";
    console.log(this.request);
    //this.PedidosSvc.sendPedido(this.request).subscribe(accept => (console.log(accept), this.router.navigate(['pedidoslist'])), error => (console.error(error)));
  }
  pagamento!: PedidoPagamentos;
  values= '1 2 3'.split(' ');
  tipo = "1";
  selectPagamento()
  {
    this.pagamento = {} as PedidoPagamentos;
    this.pagamento.tipo_pagamento = this.tipo;
    this.request.pedido_pagamentos.push(this.pagamento);
    console.log(this.tipo);
  }
  clearProdutos() {
    for (let index = 0; index < this.cont; index++) {
      this.request.pedido_item.pop()
    }
    this.cont = 0;
    this.request.valor_pedido = 0;
    this.isValid();
  }
  deleteProduto(produto: PedidoItem) {
    this.erasePreco(produto);
    this.request.pedido_item.forEach((element, index) => {
      if (element.idpedido_item == produto.idpedido_item)
        this.request.pedido_item.splice(index, 1);
    });
    this.cont -= 1;
    this.isValid();
  }
  inputFile(file: any)
  {
    if(file.target.files && file.target.files[0]){
      const txt = file.target.files[0];//falta enviar a API
  }
}
}
