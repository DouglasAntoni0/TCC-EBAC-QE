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
npm install
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

O spec de API usa as credenciais de demonstração configuradas no arquivo. Ele cria cupons e não implementa limpeza completa da massa; execute contra o ambiente de treinamento previsto.

## Executar performance

Instale o k6 e, na raiz do repositório, execute:

```bash
k6 run Performance/teste_carga.js
```

O perfil tem 20 segundos de subida, 1 minuto e 40 segundos com vinte VUs e 10 segundos de descida. Os checks verificam disponibilidade e conteúdo; o threshold configurado avalia p95 de duração HTTP. A aprovação é específica desse perfil e ambiente.

## Android: preparação pendente

`Mobile/wdio.conf.js` ainda usa `path/to/app.apk`. O repositório não fornece esse APK, e o package.json da raiz não instala WDIO, Appium ou UiAutomator2. Portanto, o módulo não possui um comando de execução reproduzível com a instalação principal.

Para concluí-lo, é necessário fornecer o APK, definir as dependências do módulo, corrigir o caminho do app e as capabilities para o dispositivo/emulador e configurar o servidor Appium. Esses itens permanecem pendentes; mobile não é executado no CI atual.

## GitHub Actions e resultados

O workflow `main.yml` executa em push/pull request para `main` e `master`. Um job roda API e Cypress; outro roda k6. Os resultados ficam na [aba Actions](https://github.com/DouglasAntoni0/TCC-EBAC-QE/actions). Consulte a conclusão e os logs da execução correspondente; o README descreve o escopo versionado, sem afirmar aprovação atual de todas as camadas.

## Estrutura

```text
API/                       # Jest e Supertest
Mobile/                    # Estrutura Android pendente de setup
Performance/               # Perfil k6
cypress/                   # Specs Web, fixtures e Page Objects
.github/workflows/main.yml # Web/API e performance
package.json               # Dependências e comandos Web/API
```
