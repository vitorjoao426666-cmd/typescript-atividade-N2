function formatarCodigo(c: number | string): string {
  const numero =
    typeof c === "number"
      ? String(c).padStart(4, "0")
      : c.replace(/^CLI-?/i, "").padStart(4, "0");
  return `CLI-${numero}`;
}

const codigo: number | string = "CLI-0042";

type TamanhoCamiseta = "P" | "M" | "G" | "GG";
let camiseta: TamanhoCamiseta = "M";
// camiseta = "XG"; // TS2322: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

type Regiao = "norte" | "nordeste" | "centro-oeste" | "sudeste" | "sul";

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case "norte":
      return 25;
    case "nordeste":
      return 20;
    case "centro-oeste":
      return 18;
    case "sudeste":
      return 12;
    case "sul":
      return 15;
  }
}

const complemento: string | null = null;
const complementoFormatado = complemento ?? "(sem complemento)";

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, "");
}

// Inferencia de literais:
// const r = "sul" mantem o tipo literal "sul" e pode ser passado a função.
// let r2 = "sul" é inferido como string, que pode conter outros textos.
// let r2 = "sul";
// calcularFrete(r2); // Erro: string não é atribuível ao tipo Regiao.
// Correção:
let r2 = "sul" as const;

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoFormatado}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r2).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone("(69) 99999-0000")}`);
console.log(`Telefone numérico: ${limparTelefone(69999990000)}`);
