class LoginPage {

    visitar() {
        // Acessa a página de Minha Conta
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    }

    preencherLogin(usuario, senha) {
        // Busca o campo de usuário e digita
        cy.get('#username').type(usuario)
        // Busca o campo de senha e digita
        cy.get('#password').type(senha)
    }

    submeter() {
        // Clica no botão de login
        cy.get('.woocommerce-form > .button').click()
    }

}

export default new LoginPage()