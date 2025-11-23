import { expect } from '@wdio/globals'
import CatalogoPage from '../pageobjects/catalogo.page.js'

describe('Funcionalidade: Catálogo de Produtos', () => {

    it('CT013 - Deve listar produtos na tela inicial (Caminho Feliz)', async () => {
        await driver.pause(3000); 
        await CatalogoPage.abrirCatalogo();
        
        // Validação: Verifica se o primeiro produto da lista existe
        const primeiroProduto = await $('android=new UiSelector().resourceId("com.ebac.shop:id/product_name").instance(0)');
        await expect(primeiroProduto).toBeExisting();
    });

    it('CT014 - Deve buscar um produto com sucesso', async () => {
        const nomeProduto = 'Ebacheckout Tee';
        
        await CatalogoPage.abrirCatalogo();
        await CatalogoPage.buscarProduto(nomeProduto);
        
        await driver.pause(2000); 
        
        await CatalogoPage.validarProdutoVisivel(nomeProduto);
    });

});