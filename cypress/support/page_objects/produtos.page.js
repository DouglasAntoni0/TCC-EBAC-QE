class ProdutosPage {
  visitarUrl() {
    cy.visit('/produtos/')
  }

  buscarProduto(nomeProduto) {
    cy.get('input[name="s"]').filter(':visible').should('have.length', 1)
      .clear().type(`${nomeProduto}{enter}`)
  }

  buscarProdutoLista(nomeProduto) {
    cy.get('a[href]').then($links => {
      const $produto = $links.filter((_, link) =>
        link.pathname.startsWith('/product/') &&
        link.textContent.trim() === nomeProduto &&
        Cypress.$(link).is(':visible'))
      if ($produto.length) {
        expect($produto, `link único do produto ${nomeProduto}`).to.have.length(1)
        cy.wrap($produto).click()
      } else {
        cy.location('pathname').then(path => {
          const paginaAtual = Number(path.match(/\/page\/(\d+)\/?$/)?.[1] || 1)
          const proxima = paginaAtual + 1
          cy.get(`a[href$="/produtos/page/${proxima}/"]`)
            .filter((_, link) => link.textContent.trim() === String(proxima))
            .should('have.length', 1).and('be.visible').click()
          this.buscarProdutoLista(nomeProduto)
        })
      }
    })
  }

  visitarProduto(nomeProduto) {
    const slug = nomeProduto.trim().toLowerCase().replace(/\s+/g, '-')
    cy.visit(`/product/${slug}/`)
  }

  selecionarVariacao(tamanho, cor) {
    cy.get('form[data-product_id]').should('have.length', 1).and('have.class', 'wvs-loaded')
    cy.get('select[name="attribute_size"]').then($select => {
      if ($select.val() !== tamanho) {
        cy.get(`[role="radiogroup"][data-attribute_name="attribute_size"] [role="radio"][data-value="${tamanho}"]`)
          .should('have.length', 1).click({ scrollBehavior: 'center' })
      }
    })
    cy.get('select[name="attribute_size"]').should('have.value', tamanho)
    cy.get('select[name="attribute_color"]').then($select => {
      if ($select.val() !== cor) {
        cy.get(`[role="radiogroup"][data-attribute_name="attribute_color"] [role="radio"][data-value="${cor}"]`)
          .should('have.length', 1).click({ scrollBehavior: 'center' })
      }
    })
    cy.get('select[name="attribute_color"]').should('have.value', cor)
    cy.get('form[data-product_id] button[type="submit"]').should('not.have.class', 'disabled')
    cy.get('input[name="variation_id"]').should($input => {
      expect(Number($input.val())).to.be.greaterThan(0)
    })
  }

  addProdutoCarrinho(tamanho, cor, quantidade) {
    this.selecionarVariacao(tamanho, cor)
    cy.get('input[name="quantity"]').clear().type(String(quantidade))
    cy.get('form[data-product_id] button[type="submit"]').click()
  }
}

export default new ProdutosPage()
