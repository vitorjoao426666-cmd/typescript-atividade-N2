type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = {
  readonly placa: Placa;
  tipo: "carro";
  portas: 2 | 4;
};

type Moto = {
  readonly placa: Placa;
  tipo: "moto";
  cilindradas: number;
};

type Caminhao = {
  readonly placa: Placa;
  tipo: "caminhao";
  eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = "ABERTO",
  Pago = "PAGO",
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function error(mensagem: string): never {
  throw new Error(mensagem);
}

function calcularHoras([entrada, saida]: Periodo): number {
  return Math.max(1, saida - entrada);
}

function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais = Math.max(0, Math.ceil(horas) - 1);
  switch (v.tipo) {
    case "carro":
      return 8 + adicionais * 5;
    case "moto":
      return 4 + adicionais * 2;
    case "caminhao":
      return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

function fecharTicket(t: Ticket): Ticket {
  const horas = calcularHoras(t.periodo);
  const valorBruto = calcularTarifa(t.veiculo, horas);
  const valor = t.selo ? valorBruto * 0.5 : valorBruto;

  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

function lerVeiculo(json: string): Veiculo {
  let dado: unknown;
  try {
    dado = JSON.parse(json) as unknown;
  } catch {
    return error("JSON malformado");
  }

  if (typeof dado !== "object" || dado === null) {
    return error("veículo inválido");
  }
  if (!("placa" in dado) || typeof dado.placa !== "string") {
    return error('campo "placa" inválido');
  }
  if (!("tipo" in dado) || typeof dado.tipo !== "string") {
    return error('campo "tipo" inválido');
  }

  const placa = dado.placa;
  switch (dado.tipo) {
    case "carro":
      if (!("portas" in dado) || (dado.portas !== 2 && dado.portas !== 4)) {
        return error('campo "portas" inválido');
      }
      return { placa, tipo: "carro", portas: dado.portas };
    case "moto":
      if (!("cilindradas" in dado) || typeof dado.cilindradas !== "number") {
        return error('campo "cilindradas" inválido');
      }
      return { placa, tipo: "moto", cilindradas: dado.cilindradas };
    case "caminhao":
      if (!("eixos" in dado) || typeof dado.eixos !== "number") {
        return error('campo "eixos" inválido');
      }
      return { placa, tipo: "caminhao", eixos: dado.eixos };
    default:
      return error(`tipo "${dado.tipo}" desconhecido`);
  }
}

const tickets: Ticket[] = [
  {
    veiculo: { placa: "ABC1D23", tipo: "carro", portas: 4 },
    periodo: [8, 11],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: "MOT0A12", tipo: "moto", cilindradas: 160 },
    periodo: [9, 10],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: "CAM9Z99", tipo: "caminhao", eixos: 3 },
    periodo: [7, 12],
    selo: false,
    situacao: SituacaoTicket.Aberto,
  },
  {
    veiculo: { placa: "XYZ4E56", tipo: "carro", portas: 2 },
    periodo: [14, 16],
    selo: true,
    situacao: SituacaoTicket.Aberto,
  },
];

const ticketsFechados = tickets.map(fecharTicket);

ticketsFechados.forEach((ticket) => {
  const horas = calcularHoras(ticket.periodo);
  const valor = ticket.valor ?? 0;
  const seloTexto = ticket.selo ? " (selo -50%)" : "";
  registrar(
    `[${ticket.situacao}] ${ticket.veiculo.placa} (${ticket.veiculo.tipo}) - ${horas}h - R$ ${valor.toFixed(2)}${seloTexto}`,
  );
});

const faturamento = ticketsFechados
  .filter((ticket) => ticket.situacao === SituacaoTicket.Pago)
  .reduce((soma, ticket) => soma + (ticket.valor ?? 0), 0);

const entradas = ticketsFechados.reduce(
  (contagem, ticket) => {
    contagem[ticket.veiculo.tipo] += 1;
    return contagem;
  },
  { carro: 0, moto: 0, caminhao: 0 },
);

registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(
  `Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`,
);

try {
  lerVeiculo('{"placa":"BIC1C23","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    registrar(`Erro ao ler veículo: ${erro.message}`);
  }
}

// Experimento com Van (removido da versão final para compilar com --strict):
// ao incluir `type Van = { readonly placa: Placa; tipo: "van"; lugares: number }`
// na união Veiculo, sem tratá-lo no switch de calcularTarifa, o compilador
// acusa erro em `const _naoTratado: never = v`, porque `v` deixa de ser never
// e passa a ser Van (Van não é atribuível a never).
// O que o never garantiu: a verificação exaustiva. Se alguém ampliar a união
// e esquecer de tratar o novo caso, o erro aparece na compilação, e não só
// quando uma van real passar pela cancela em produção.
