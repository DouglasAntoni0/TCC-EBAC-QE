import http from 'k6/http';
import { check, sleep } from 'k6';

// Negocia a mesma compressão de resposta usada por clientes HTTP comuns.
// k6 descompacta o corpo antes das verificações de conteúdo.
const requestParams = { headers: { 'Accept-Encoding': 'gzip' } };

// Configurações do teste (Conforme TCC)
export const options = {
  stages: [
    { duration: '20s', target: 20 }, // RampUp: Sobe para 20 usuários em 20 segundos
    { duration: '1m40s', target: 20 }, // Mantém 20 usuários pelo resto do tempo (totalizando 2m)
    { duration: '10s', target: 0 },  // RampDown: Desce para 0 nos últimos 10s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em menos de 500ms
  },
};

// Massa de dados (Usuários do TCC)
const usuarios = [
    { user: 'user1_ebac', pass: 'psw!ebac@test' },
    { user: 'user2_ebac', pass: 'psw!ebac@test' },
    { user: 'user3_ebac', pass: 'psw!ebac@test' },
    { user: 'user4_ebac', pass: 'psw!ebac@test' },
    { user: 'user5_ebac', pass: 'psw!ebac@test' },
];

export default function () {
  // Caso de Teste 1: Acessar a Página Inicial (Caminho Feliz)
  const resHome = http.get('http://lojaebac.ebaconline.art.br/', requestParams);
  
  check(resHome, {
    'Home: status é 200': (r) => r.status === 200,
    'Home: carregou rápido': (r) => r.timings.duration < 2000,
  });

  // Caso de Teste 2: Buscar um Produto (Simulando carga no banco)
  // Vamos buscar por "Hebrew" que sabemos que existe
  const resBusca = http.get('http://lojaebac.ebaconline.art.br/?s=Hebrew&post_type=product', requestParams);

  check(resBusca, {
    'Busca: status é 200': (r) => r.status === 200,
    'Busca: encontrou produtos': (r) => r.body.includes('Hebrew'),
  });

  // Simula um usuário pensando entre ações (1 segundo)
  sleep(1);
}
