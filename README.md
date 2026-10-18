# TCC EBAC — testes da EBAC Shop

[![CI](https://github.com/DouglasAntoni0/TCC-EBAC-QE/actions/workflows/main.yml/badge.svg)](https://github.com/DouglasAntoni0/TCC-EBAC-QE/actions/workflows/main.yml)

Projeto de conclusão da formação em Engenharia de Qualidade de Software da EBAC. Reúne automações Web e API, um perfil de carga k6 e uma estrutura inicial de testes Android.

## Escopo implementado

| Camada | Arquivos | Estado atual |
| --- | --- | --- |
| Web | `cypress/e2e/login.cy.js` | Login válido e senha inválida |
| Web | `cypress/e2e/produtos.cy.js` | Adição de produto e limite de estoque |
| API | `API/cupons.test.js` | Listagem, criação e duplicidade de cupons com Jest/Supertest |
| Performance | `Performance/teste_carga.js` | Home e busca; rampa até vinte VUs, manutenção e descida; p95 abaixo de 500 ms |
| Android | `Mobile/` | Specs e Page Objects de catálogo; setup ainda incompleto |

Não há cenário Web de checkout neste snapshot. Os cenários usam descrições de comportamento, sem integração com um runner Gherkin/Cucumber.

## Executar Web e API

Requisitos: Node.js 22, npm e acesso a `http://lojaebac.ebaconline.art.br/`. Os testes dependem da versão, dos dados e da autenticação do ambiente de treinamento.

```bash
git clone https://github.com/DouglasAntoni0/TCC-EBAC-QE.git
cd TCC-EBAC-QE
npm ci
```

Web:

```bash
npm test
# ou, para depuração
npx cypress open
```

API:

```bash
npm run test:api
```

O spec de API usa as credenciais de demonstração configuradas no arquivo. Cada execução cria códigos únicos e exclui os cupons que gerou no `afterAll`, verificando a resposta da exclusão. Execute contra o ambiente de treinamento previsto. `EBAC_BASE_URL` permite informar outra instalação compatível com a mesma autenticação.

Os testes Web de login criam uma conta fictícia própria por execução, usando `example.com`, e limpam a sessão antes de cada cenário. Não dependem de uma conta de aluno previamente cadastrada. Os seletores usam IDs, nomes de campos, atributos ARIA, dados de variação e texto/destino de links, sem índices de elementos ou classes visuais. Os Page Objects percorrem a paginação para localizar o produto; o caso de estoque usa o limite real da variação e valida a rejeição de uma quantidade acima dele.

## Executar performance

Instale o k6 e, na raiz do repositório, execute:

```bash
k6 run Performance/teste_carga.js
```

O perfil tem 20 segundos de subida, 1 minuto e 40 segundos com vinte VUs e 10 segundos de descida. Os requests negociam `Accept-Encoding: gzip`; o k6 descompacta a resposta para executar os checks de conteúdo. Os checks verificam disponibilidade e conteúdo; o threshold configurado avalia p95 de duração HTTP. A aprovação é específica desse perfil e ambiente.

## Android: preparação pendente

`Mobile/wdio.conf.js` ainda usa `path/to/app.apk`. O repositório não fornece esse APK, e o package.json da raiz não instala WDIO, Appium ou UiAutomator2. Portanto, o módulo não possui um comando de execução reproduzível com a instalação principal.

Para concluí-lo, é necessário fornecer o APK, definir as dependências do módulo, corrigir o caminho do app e as capabilities para o dispositivo/emulador e configurar o servidor Appium. Esses itens permanecem pendentes; mobile não é executado no CI atual.

## GitHub Actions e resultados

O workflow `main.yml` executa em push/pull request para `main` e `master`, além de acionamento manual. API e Web têm jobs independentes com Node.js 22 e `npm ci`; sua aprovação indica que os testes funcionais passaram. Execuções da mesma branch são enfileiradas. Capturas/vídeos de falhas do Cypress são guardados como artefatos quando gerados.

O perfil de carga é executado separadamente em **Actions → Carga k6 - ambiente externo → Run workflow**, pelo arquivo `carga.yml`. Execute-o em uma janela sem testes funcionais contra a mesma loja pública. O resumo JSON fica no artefato `resultado-k6`.

O perfil de vinte VUs e o threshold de p95 abaixo de 500 ms são preservados. Uma falha desse limite reprova o workflow de carga e exige investigar a aplicação/ambiente. O verde no CI funcional não indica aprovação de desempenho. Os resultados ficam na [aba Actions](https://github.com/DouglasAntoni0/TCC-EBAC-QE/actions); consulte a execução correspondente a cada camada.

## Estrutura

```text
API/                       # Jest e Supertest
Mobile/                    # Estrutura Android pendente de setup
Performance/               # Perfil k6
cypress/                   # Specs Web, fixtures e Page Objects
.github/workflows/main.yml # Web/API
.github/workflows/carga.yml # Carga manual contra o ambiente externo
package.json               # Dependências e comandos Web/API
```
