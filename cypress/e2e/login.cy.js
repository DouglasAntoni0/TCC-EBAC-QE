/// <reference types="cypress" />
import LoginPage from '../support/page_objects/login.page'

describe('Funcionalidade: Login na Plataforma', () => {

    /* CT001 - Login com sucesso 
       Estamos usando um dos usuários de teste fornecidos no PDF do TCC (user1_ebac)
    */
    it('CT001 - Deve fazer login com sucesso (Caminho Feliz)', () => {
        LoginPage.visitar()
        LoginPage.preencherLogin('user1_ebac', 'psw!ebac@test')
        LoginPage.submeter()

        // Validação: Verifica se apareceu a mensagem de 'Olá' no painel
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, user1_ebac')
    })

    /* CT002 - Login com senha inválida
    */
    it('CT002 - Deve exibir mensagem de erro ao inserir senha inválida (Caminho Negativo)', () => {
        LoginPage.visitar()
        LoginPage.preencherLogin('user1_ebac', 'senhaerrada')
        LoginPage.submeter()

        // Validação: Verifica a mensagem de erro
        cy.get('.woocommerce-error > li')
    })
})