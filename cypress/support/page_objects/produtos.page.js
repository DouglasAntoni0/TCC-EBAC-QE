class ProdutosPage {
  visitarUrl() {
    cy.visit('/produtos/')
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).type(nomeProduto)
    cy.get('.button-search').eq(1).click()
  }

  buscarProdutoLista(nomeProduto) {
    cy.get('.products .product-block').then($produtos => {
      const $produto = $produtos.filter((_, el) => Cypress.$(el).text().includes(nomeProduto))
      if ($produto.length) {
        cy.wrap($produto.first()).contains('a', nomeProduto).click()
      } else {
        cy.get('a.next.page-numbers').should('be.visible').click()
        this.buscarProdutoLista(nomeProduto)
      }
    })
  }

  visitarProduto(nomeProduto) {
    const slug = nomeProduto.trim().toLowerCase().replace(/\s+/g, '-')
    cy.visit(`/produtos/${slug}/`)
  }

  selecionarVariacao(tamanho, cor) {
    cy.get('form.variations_form').should('have.class', 'wvs-loaded')
    cy.get('select[name="attribute_size"]').then($select => {
      if ($select.val() !== tamanho) {
        cy.get('.button-variable-item-' + tamanho).click({ scrollBehavior: 'center' })
      }
    })
    cy.get('select[name="attribute_size"]').should('have.value', tamanho)
    cy.get('select[name="attribute_color"]').then($select => {
      if ($select.val() !== cor) {
        cy.get('.button-variable-item-' + cor).click({ scrollBehavior: 'center' })
      }
    })
    cy.get('select[name="attribute_color"]').should('have.value', cor)
    cy.get('.single_add_to_cart_button').should('not.have.class', 'disabled')
    cy.get('input[name="variation_id"]').should($input => {
      expect(Number($input.val())).to.be.greaterThan(0)
    })
  }

  addProdutoCarrinho(tamanho, cor, quantidade) {
    this.selecionarVariacao(tamanho, cor)
    cy.get('input.qty').clear().type(String(quantidade))
    cy.get('.single_add_to_cart_button').click()
  }
}

export default new ProdutosPage()
