const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: "Arroz 5kg", preco: 28.9, quantidade: 1 },
  { nome: "Feijão 1kg", preco: 8.49, quantidade: 2 },
  { nome: "Leite 1L", preco: 4.99, quantidade: 6 },
  { nome: "Café 500g", preco: 17.9, quantidade: 1 },
  { nome: "Sabão em pó", preco: 12.5, quantidade: 1 },
];

const nomes: string[] = itens.map((i) => {
  return i.nome;
});

const caros: string[] = itens
  .filter((i) => {
    return i.preco > 10;
  })
  .map((i) => {
    return i.nome;
  });

const total: number = itens.reduce((acumulador, i) => {
  return acumulador + i.preco * i.quantidade;
}, 0);

const categorias: readonly string[] = ["Mercearia", "Laticínios", "Limpeza"];

// categorias.push();
// A propriedade 'push' não existe no tipo 'readonly string[]'. Basicamente nós diz que essa váriavel é apenas para leitura

const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];

const itensGuardados: number = despensa.flat().reduce((a, b) => a + b, 0);

const [primeiro, segundo] = itens;

const itensComExtra = [
  ...itens,
  { nome: "Açúcar 1kg", preco: 4.5, quantidade: 2 },
];

console.log("Itens: " + nomes.join(", "));
console.log("Acima de R$ 10: " + caros.join(", "));
console.log("Total da compra: R$" + total);
console.log("Itens na despensa: " + itensGuardados);

// Verificações extras
console.log(primeiro.nome, segundo.nome);
console.log(itens.length, itensComExtra.length);
