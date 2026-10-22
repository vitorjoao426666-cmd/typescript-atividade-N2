enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = "PIX",
  Cartao = "CARTAO",
  Dinheiro = "DINHEIRO",
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return "Recebemos seu pedido!";
    case StatusPedido.EmPreparo:
      return "Seu pedido está sendo preparado 🍳";
    case StatusPedido.SaiuParaEntrega:
      return "O entregador está a caminho 🛵";
    case StatusPedido.Entregue:
      return "Pedido entregue. Bom apetite!";
    case StatusPedido.Cancelado:
      return "Seu pedido foi cancelado.";
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    case StatusPedido.Entregue:
    case StatusPedido.Cancelado:
      return status;
  }
}

let statusAtual: StatusPedido = StatusPedido.Recebido;
while (true) {
  console.log(
    `[${statusAtual} - ${StatusPedido[statusAtual]}] ${mensagem(statusAtual)}`,
  );
  if (statusAtual === StatusPedido.Entregue) {
    break;
  }
  statusAtual = avancar(statusAtual);
}

const formaPagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${formaPagamento}`);

// const pagamento_errado: FormaPagamento = "PIX"; // TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// A string enum exige o membro do enum (FormaPagamento.Pix), não apenas uma string com o mesmo texto.
