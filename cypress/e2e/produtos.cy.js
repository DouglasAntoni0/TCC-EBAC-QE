/// <reference types="cypress" />
import ProdutosPage from '../support/page_objects/produtos.page'

describe('Funcionalidade: Adicionar item ao carrinho', () => {

    beforeEach(() => {
        ProdutosPage.visitarUrl()
    });

    it('CT005 - Deve adicionar produto ao carrinho com sucesso (Caminho Feliz)', () => {
        let produto = 'Ariel Roll Sleeve Sweatshirt'
        
        ProdutosPage.buscarProdutoLista(produto)
        
        ProdutosPage.addProdutoCarrinho('L', 'Red', 1)

        cy.get('.woocommerce-message').should('contain', produto)
        cy.get('.woocommerce-message').should('contain', 'adicionado no seu carrinho')
    });

    it('CT006 - Deve validar limite de estoque (Caminho Negativo)', () => {
        // Tentar adicionar uma quantidade absurda para forçar erro de estoque
        let produto = 'Ariel Roll Sleeve Sweatshirt'
        
        ProdutosPage.buscarProdutoLista(produto)
        ProdutosPage.addProdutoCarrinho('XL', 'Green', 200)

        cy.get('.woocommerce-message').should('not.exist') 
    });
});