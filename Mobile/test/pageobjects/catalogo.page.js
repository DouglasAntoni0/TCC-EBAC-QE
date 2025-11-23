import { $ } from '@wdio/globals'

class CatalogoPage {
    
    // Mapeamento dos elementos
    get botaoBusca() {
        return $('~Search Input'); 
    }

    async abrirCatalogo() {
        // Garante que está na aba Store
        const menuLoja = await $('android=new UiSelector().text("Store")');
        if (await menuLoja.isExisting()) {
            await menuLoja.click();
        }
    }

    async buscarProduto(nome) {
        await this.botaoBusca.click();
        const campoDigitar = await $('android=new UiSelector().className("android.widget.EditText")');
        await campoDigitar.setValue(nome);
        
        // Clica no Enter do teclado
        await driver.execute('mobile: performEditorAction', { action: 'search' });
    }

    async validarProdutoVisivel(nome) {
        const produto = await $(`android=new UiSelector().textContains("${nome}")`);
        await expect(produto).toBeDisplayed();
    }
}

export default new CatalogoPage();