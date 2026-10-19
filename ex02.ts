const nomeDigitado: string = " maria da silva ";

function formatarNome(nome: string): string {
  const preposicoes: string[] = ["da", "de", "do"];
  return nome
    .trim()
    .split(" ")
    .filter((palavra) => palavra !== "")
    .map((palavra) => {
      const minuscula = palavra.toLowerCase();
      if (preposicoes.includes(minuscula)) {
        return minuscula;
      }
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(" ");
}

const nomeFormatado: string = formatarNome(nomeDigitado);

const precoLido: string = "12.40";
const quantidadeLida: string = "3un";

const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida, 10);

const clienteFidelidade: boolean = true;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const totalPagar: number = subtotal - desconto;

const numeroCupom: string = String(42).padStart(6, "0");

const cupom = `CUPOM Nº ${numeroCupom}
Cliente: ${nomeFormatado}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalPagar.toFixed(2)}
`;

console.log(cupom);
