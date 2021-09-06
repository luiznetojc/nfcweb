export class RequestPedido {
    idpedido: number;
    cpf: string;
    data_pedido: string;
    valor_pedido: number;
    valor_desconto: number;
    idempresa: number;
    cnpj_empresa:string;
    pedido_item:
        [
            {
                idpedido_item: number,
                idpedido: number,
                idproduto: number,
                descricao_produto: string,
                unidade_medida: string,
                ncm_produto: string,
                preco_item: number,
                preco_desconto_item: number,
                quantidade_item: number
            }
        ];
    pedido_pagamentos:
    [
      {
        idpedido_pagamento: number,
        idpedido: number,
        tipo_pagamento: string,
        valor_pagamento: number
      }
    ]
    constructor(idpedido: number, cpf: string, data_pedido: string,
        valor_pedido: number, valor_desconto: number, idempresa:number,cnpj_empresa:string,
        pedido_item:[
            {
                idpedido_item: number,
                idpedido: number,
                idproduto: number,
                descricao_produto: string,
                unidade_medida: string,
                ncm_produto: string,
                preco_item: number,
                preco_desconto_item: number,
                quantidade_item: number
            }
        ],
        pedido_pagamentos:
        [
          {
            idpedido_pagamento: number,
            idpedido: number,
            tipo_pagamento: string,
            valor_pagamento: number
          }
        ]) {
        this.idpedido = idpedido;
        this.cpf = cpf;
        this.idempresa = idempresa;
        this.cnpj_empresa = cnpj_empresa;
        this.data_pedido = data_pedido;
        this.valor_pedido = valor_pedido;
        this.valor_desconto = valor_desconto;
        this.pedido_item = pedido_item;
        this.pedido_pagamentos = pedido_pagamentos;
    }
}
