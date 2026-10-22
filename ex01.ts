const nomeProduto1: string = "Pão Frânces";
const precoUnitario1: number = 0.75;
const quantidade1: number = 12; // quantidade1 = 'doze';
// error TS2322: Type 'string' is not assignable to type 'number'.

const nomeProduto2: string = "Bolo de cenoura";
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

const aberta = true;
// Para a constante o tipo inferido é o próprio valor da váriavel

let paesVendidosNoAno: number = 1_250_000;
let codigoCategoria: number = 0x1a;

function calcularSubtotais(preco: number, quantidade: number) {
  return preco * quantidade;
}

const subtotal1: number = calcularSubtotais(precoUnitario1, quantidade1);
const subtotal2: number = calcularSubtotais(precoUnitario2, quantidade2);

const total: number = subtotal1 + subtotal2;

console.log(
  `${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`,
);
console.log(
  `${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`,
);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${codigoCategoria}`);
