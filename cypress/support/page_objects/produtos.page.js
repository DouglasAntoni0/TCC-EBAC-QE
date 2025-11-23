class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    buscarProdutoLista(nomeProduto) {
        // Clica exatamente no produto com o nome, dentro da lista
        cy.get('.product-block')
            .contains(nomeProduto)
            .click()
    }

    visitarProduto(nomeProduto) {
        cy.visit(`produtos/${nomeProduto}`)
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        // Seleciona tamanho
        cy.get('.button-variable-item-' + tamanho).click()
        // Seleciona cor
        cy.get('.button-variable-item-' + cor).click()
        
        // Força a limpeza do campo antes de digitar
        cy.get('.input-text').clear().type(quantidade)
        
        // Clica em comprar
        cy.get('.single_add_to_cart_button').click()
    }

}

export default new ProdutosPage()