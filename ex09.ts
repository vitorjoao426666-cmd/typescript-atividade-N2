const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = "{ cidade: Porto Velho ";

// 1. Versão insegura com any, apenas para demonstrar o problema.
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  // Com respostaQuebrada, a execução lança TypeError porque "quente" é string
  // e não possui um metodo toFixed().
  console.log(dados.temperatura.toFixed(1));
}

// 3. never indica que a função não retorna normalmente.
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2. Versão segura: o conteudo parseado começa como unknown.
function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json) as unknown;
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      return falhar("JSON malformado");
    }
    if (erro instanceof Error) {
      return falhar(erro.message);
    }
    return falhar("Erro desconhecido ao interpretar JSON");
  }

  if (
    typeof dados !== "object" ||
    dados === null ||
    !("cidade" in dados) ||
    !("temperatura" in dados)
  ) {
    return falhar('objeto sem os campos "cidade" e "temperatura"');
  }

  if (typeof dados.cidade !== "string") {
    return falhar('campo "cidade" inválido');
  }
  if (typeof dados.temperatura !== "number") {
    return falhar('campo "temperatura" inválido');
  }

  return { cidade: dados.cidade, temperatura: dados.temperatura };
}

function testar(json: string): void {
  try {
    const clima = lerClima(json);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log("Erro: falha desconhecida");
    }
  }
}

testar(respostaOk);
testar(respostaQuebrada);
testar(respostaInvalida);

// Para executar a demonstração insegura separadamente, descomente a linha abaixo.
// lerComAny(respostaQuebrada);
void lerComAny;
