let paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: "123.456.789-00",
  nome: "Ana Souza",
  idade: 34,
  plano: true,
  alergias: ["dipirona", "lactose"],
  contatoEmergencia: { nome: "João Souza", telefone: "(69) 99999-0000" },
};

let paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: "987.654.321-00",
  nome: "Carlos Lima",
  idade: 61,
  plano: false,
};

function resumo(p: {
  nome: string;
  idade: number;
  alergias?: string[];
}): string {
  const textoAlergias: string =
    p.alergias && p.alergias.length > 0
      ? `Alergias: ${p.alergias.join(", ")}`
      : "Sem alergias registradas";

  return `${p.nome}, ${p.idade} anos. ${textoAlergias}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// paciente.cpf = '000.000.000-00';
// error TS2540: Cannot assign to 'cpf' because it is a read-only property.

// paciente.peso = 70;
// error TS2339: Property 'peso' does not exist on type '{ readonly cpf: string; ... }'.

let dados: object = paciente;
// console.log(dados.nome);
// error TS2339: Property 'nome' does not exist on type 'object'.
// object significa apenas "qualquer valor não primitivo". Ao anotar dados como object, o ts passa a enxergar a variável SOMENTE pelo tipo object, que não declara nenhuma propriedade. O valor em tempo de execução tem nome, mas o tipo da variável não, e o compilador verifica o tipo, não o valor.

let x: {} = 10;
// {} é o tipo "qualquer valor que não seja null ou undefined". Isso inclui primitivos, porque eles podem ser tratados como objetos.

//== let y: object = 10;
// error TS2322: Type 'number' is not assignable to type 'object'.
// object aceita apenas valores NÃO primitivos. O número 10 é um primitivo, então não é atribuível a object.
