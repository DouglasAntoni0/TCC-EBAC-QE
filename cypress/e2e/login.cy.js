/// <reference types="cypress" />
import LoginPage from '../support/page_objects/login.page'

describe('Funcionalidade: Login na Plataforma', () => {
  let conta
  before(() => cy.criarContaTeste().then(dados => { conta = dados }))
  beforeEach(() => cy.clearCookies())

  it('CT001 - Deve fazer login com sucesso (Caminho Feliz)', () => {
    LoginPage.visitar()
    LoginPage.preencherLogin(conta.usuario, conta.senha)
    LoginPage.submeter()
    cy.contains('Olá, ' + conta.usuario.split('@')[0]).should('be.visible')
    cy.contains('nav a', /^Sair$/).should('be.visible')
  })

  it('CT002 - Deve exibir mensagem de erro ao inserir senha inválida (Caminho Negativo)', () => {
    LoginPage.visitar()
    LoginPage.preencherLogin(conta.usuario, 'SenhaIncorreta@2026!')
    LoginPage.submeter()
    cy.get('[role="alert"]').should('be.visible').and('not.be.empty')
    cy.get('#username').should('be.visible')
  })
})
