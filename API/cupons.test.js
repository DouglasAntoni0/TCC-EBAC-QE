const request = require('supertest');

const API_URL = 'http://lojaebac.ebaconline.art.br';

describe('API de Cupons - EBAC Shop', () => {

    const authHeader = 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy';

    test('Deve listar todos os cupons cadastrados (GET)', async () => {
        const response = await request(API_URL)
            .get('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Deve cadastrar um cupom com sucesso (POST)', async () => {
        const cupomAleatorio = `CUPOM_${Math.floor(Math.random() * 100000000)}`;

        const payload = {
            code: cupomAleatorio,
            amount: '10',
            discount_type: 'fixed_cart',
            description: 'Cupom teste via Supertest'
        };

        const response = await request(API_URL)
            .post('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader)
            .send(payload);

        expect(response.status).toBe(201);
    });

    test('Não deve cadastrar cupom com nome duplicado (Caminho Negativo)', async () => {
        const cupomDuplicado = 'CUPOM_DUPLICADO_TESTE_FIXO';

        await request(API_URL)
            .post('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader)
            .send({ code: cupomDuplicado, amount: '10', discount_type: 'fixed_cart' });

        const response = await request(API_URL)
            .post('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader)
            .send({ code: cupomDuplicado, amount: '10', discount_type: 'fixed_cart' });

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('O código de cupom já existe');
    });

});