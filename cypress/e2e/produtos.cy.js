/// <reference types="cypress" />
import ProdutosPage from '../support/page_objects/produtos.page'

describe('Funcionalidade: Adicionar item ao carrinho', () => {
  beforeEach(() => ProdutosPage.visitarUrl())

  it('CT005 - Deve adicionar produto ao carrinho com sucesso (Caminho Feliz)', () => {
    const produto = 'Ariel Roll Sleeve Sweatshirt'
    ProdutosPage.buscarProdutoLista(produto)
    ProdutosPage.addProdutoCarrinho('L', 'Red', 1)
    cy.get('.woocommerce-message').should('contain', produto).and('contain', 'adicionado no seu carrinho')
  })

  it('CT006 - Deve validar limite de estoque (Caminho Negativo)', () => {
    ProdutosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
    ProdutosPage.selecionarVariacao('XL', 'Green')
    cy.get('input.qty').should($input => {
      expect(Number($input.attr('max')), 'estoque disponível da variação').to.be.greaterThan(0)
    }).then($input => {
      const acimaDoEstoque = Number($input.attr('max')) + 1
      cy.wrap($input).clear().type(String(acimaDoEstoque))
    })
    cy.get('.single_add_to_cart_button').click()
    cy.get('input.qty').should($input => {
      expect($input[0].validity.rangeOverflow, 'quantidade rejeitada pelo limite de estoque').to.be.true
    })
    cy.get('.woocommerce-message').should('not.exist')
  })
})
