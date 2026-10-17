Cypress.Commands.add('criarContaTeste', () => {
  const dados = {
    usuario: `qa.tcc.${Date.now()}.${Cypress._.random(1000000)}@example.com`,
    senha: 'CiRegression@2026!',
  }
  cy.visit('/minha-conta/')
  cy.get('form.register #reg_email').type(dados.usuario)
  cy.get('form.register #reg_password').type(dados.senha, { log: false })
  cy.get('form.register [name="register"]').click()
  cy.get('.woocommerce-MyAccount-navigation').contains('a', 'Sair').should('be.visible')
  return cy.wrap(dados, { log: false })
})
