type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ["Porto Velho", 34],
  ["Curitiba", 12],
  ["Manaus", 31],
  ["Porto Alegre", 9],
  ["Natal", 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas: number[] = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturas);

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const media: number =
  temperaturas.reduce((acc, t) => acc + t, 0) / temperaturas.length;

console.log(
  `Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`,
);

type Contato = [nome: string, telefone: string, email?: string];

const contato1: Contato = ["Ana Souza", "(69) 99999-0000", "ana@jornal.com"];
const contato2: Contato = ["Carlos Lima", "(41) 98888-1111"];

type Historico = [cidade: string, ...temperaturas: number[]];

const historico: Historico = ["Porto Velho", 33, 35, 34, 36, 32, 34, 33];

const [cidadeHist, ...temps] = historico;
const mediaSemana: number = temps.reduce((a, b) => a + b, 0) / temps.length;

console.log(`Média semanal de ${cidadeHist}: ${mediaSemana.toFixed(1)}°C`);

const capitalOficial: readonly [string, string] = ["RO", "Porto Velho"];

// capitalOficial[0] = "AC";
// error TS2540: Cannot assign to '0' because it is a read-only property. O tipo readonly não permite alterar nenhuma posição.
