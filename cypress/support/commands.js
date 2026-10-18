Cypress.Commands.add('criarContaTeste', () => {
  const dados = {
    usuario: `qa.tcc.${Date.now()}.${Cypress._.random(1000000)}@example.com`,
    senha: 'CiRegression@2026!',
  }
  cy.visit('/minha-conta/')
  cy.get('#reg_email').type(dados.usuario)
  cy.get('#reg_password').type(dados.senha, { log: false })
  cy.get('[name="register"][type="submit"]').click()
  cy.contains('nav a', /^Sair$/).should('be.visible')
  return cy.wrap(dados, { log: false })
})
