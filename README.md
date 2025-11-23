# 🏆 TCC - Engenheiro de Qualidade de Software (EBAC)

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![K6](https://img.shields.io/badge/k6-%237D64FF.svg?style=for-the-badge&logo=k6&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-41c8f5?style=for-the-badge&logo=appium&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

Este repositório contém o **Projeto Final de Conclusão de Curso (TCC)** da especialização em Engenharia de Qualidade de Software da EBAC (Escola Britânica de Artes Criativas e Tecnologia).

O projeto consiste em uma estratégia completa de garantia de qualidade (QA) aplicada ao e-commerce **EBAC Shop**, abrangendo testes de UI (Web), API, Mobile, Performance e integração em pipeline de CI/CD.

---

## 🧠 Estratégia de Testes

O projeto foi desenhado simulando um ambiente real de desenvolvimento ágil, utilizando **BDD (Behavior Driven Development)** e padrões de projeto modernos.

| Nível de Teste | Ferramenta | Cobertura / Escopo |
| :--- | :--- | :--- |
| **Web (E2E/UI)** | **Cypress** | Fluxos críticos: Login, Adição ao Carrinho e Checkout. |
| **API (Integração)** | **Jest + Supertest** | Validação de contratos e regras de negócio do serviço de Cupons. |
| **Mobile** | **WebdriverIO** | Testes funcionais no aplicativo Android (Catálogo de Produtos). |
| **Performance** | **K6** | Teste de carga para validar estabilidade sob alto tráfego. |
| **CI/CD** | **GitHub Actions** | Orquestração automática dos testes a cada Push na branch principal. |

---

## 📂 Estrutura do Projeto

A arquitetura do projeto foi organizada para separar responsabilidades e facilitar a manutenção:

```bash
TCC-EBAC-QE/
├── .github/workflows/   # Pipelines de CI/CD (GitHub Actions)
├── API/                 # Testes de API (Jest/Supertest)
│   └── cupons.test.js
├── Mobile/              # Testes Mobile (WebdriverIO)
│   ├── test/pageobjects # Page Objects do App
│   └── test/specs       # Scripts de teste do App
├── Performance/         # Scripts de Performance (K6)
│   └── teste_carga.js
├── cypress/             # Testes Web (Cypress)
│   ├── e2e/             # Scripts de teste E2E
│   ├── fixtures/        # Massas de dados
│   └── support/         # Page Objects e Comandos customizados
└── package.json         # Gerenciamento de dependências e scripts