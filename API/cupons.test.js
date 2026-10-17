const request = require('supertest');
const API_URL = process.env.EBAC_BASE_URL || 'http://lojaebac.ebaconline.art.br';

describe('API de Cupons - EBAC Shop', () => {
    jest.setTimeout(30000);
    const authHeader = 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy';
    const criados = new Set();
    const codigoUnico = () => `qa_ci_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const api = () => request(API_URL);
    const payload = code => ({ code, amount: '10', discount_type: 'fixed_cart' });

    async function criar(code) {
        const response = await api().post('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader).send(payload(code));
        if (response.status === 201 && response.body.id) criados.add(response.body.id);
        expect(response.status).toBe(201);
        expect(response.body.code).toBe(code);
        expect(response.body.id).toEqual(expect.any(Number));
        return response;
    }

    afterAll(async () => {
        for (const id of criados) {
            const response = await api().delete(`/wp-json/wc/v3/coupons/${id}?force=true`)
                .set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(id);
        }
    });

    test('Deve listar todos os cupons cadastrados (GET)', async () => {
        const response = await api().get('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Deve cadastrar um cupom com sucesso (POST)', async () => {
        await criar(codigoUnico());
    });

    test('Não deve cadastrar cupom com nome duplicado (Caminho Negativo)', async () => {
        const code = codigoUnico();
        await criar(code);
        const response = await api().post('/wp-json/wc/v3/coupons')
            .set('Authorization', authHeader).send(payload(code));
        expect(response.status).toBe(400);
        expect(response.body.message).toContain('O código de cupom já existe');
    });
});
