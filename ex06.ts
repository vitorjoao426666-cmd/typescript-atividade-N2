enum StatusPedido {
    Recebido = 1,
    EmPreparo = 2,
    SaiuParaEntrega = 3,
    Entregue = 4,
    Cancelado = 5
}

enum FormaPagamento {
    'PIX',
    'CARTAO',
    'DINHEIRO'
}

const descricaoStatus = (status: StatusPedido): string => {
  switch (status) {
    case 1:
      return 'Recebemos seu pedido!';
    case 2:
      return 'Pagamento confirmado';
    case 3:
      return 'Pedido a caminho';
    case 4:
      return 'Pedido entregue';
    case 5:
      return 'Pedido cancelado';
    default:
      return 'Status desconhecido';
  }
};