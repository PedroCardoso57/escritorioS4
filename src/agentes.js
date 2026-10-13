// Equipe do escritório. Cada agente ganha uma mesa e um bonequinho.
// Para conectar um motor seu, use o mesmo `id` ao enviar status (ver README).
//
// estilo — penteado: curto | topete | calvo | rabo | volumoso | coque | longo | baguncado
// barba — 'curta' | 'cheia' · feminina — cílios, brincos (cor em brinco) e silhueta mais fina
//
// atividade — o que o bonequinho faz quando está "trabalhando":
//   digitar   → digita no teclado (código, textos)
//   ler       → lê um documento nas mãos
//   telefone  → fala ao telefone (atendimento, vendas)
//   desenhar  → desenha numa mesa digitalizadora (design)
//   analisar  → mexe no mouse olhando gráficos (dados, relatórios)
//   quadro    → levanta e escreve no quadro branco (planejamento, orquestração)

export const AGENTES = [
  { id: 'orquestrador', nome: 'Braço Direito',  funcao: 'Prioriza e distribui as demandas da Head', atividade: 'quadro',   cor: '#e30613', cabelo: '#2b1d14', pele: '#f1c27d', estilo: 'topete', barba: 'curta' },
  { id: 'performance',  nome: 'Performance',    funcao: 'KPIs das contas, dashboards e alertas',    atividade: 'analisar', cor: '#3fb27f', cabelo: '#1a1a1a', pele: '#e0ac69', estilo: 'curto', barba: 'cheia' },
  { id: 'cs',           nome: 'Customer Success', funcao: 'Saúde da carteira, churn e renovações',  atividade: 'telefone', cor: '#4c8dff', cabelo: '#111111', pele: '#c68642', estilo: 'volumoso', feminina: true, brinco: '#f4f4f5' },
  { id: 'squads',       nome: 'Pessoas & Squads', funcao: 'Capacidade, alocação, rituais e PDIs',   atividade: 'ler',      cor: '#b05cf0', cabelo: '#e8b04a', pele: '#f1c27d', estilo: 'rabo', feminina: true },
  { id: 'financeiro',   nome: 'Financeiro',     funcao: 'Margem por conta, fee e forecast',         atividade: 'analisar', cor: '#e0b23c', cabelo: '#6f6f75', pele: '#c68642', estilo: 'calvo' },
  { id: 'planejamento', nome: 'Planejamento',   funcao: 'Planejamento das contas, OKRs e briefings', atividade: 'desenhar', cor: '#f07a3a', cabelo: '#5a3825', pele: '#ffdbac', estilo: 'baguncado' },
  { id: 'qa',           nome: 'Qualidade',      funcao: 'Revisa as entregas antes do cliente',      atividade: 'ler',      cor: '#8e99ad', cabelo: '#3b2a20', pele: '#8d5524', estilo: 'curto', barba: 'curta' },
  { id: 'documentador', nome: 'Processos & SOPs', funcao: 'Procedimentos, playbooks e atas',        atividade: 'digitar',  cor: '#2ec4d6', cabelo: '#a0522d', pele: '#ffdbac', estilo: 'coque', feminina: true, brinco: '#e30613' },
];

// Você! A Head de Operações (sócia): o seu bonequinho fica na mesa da frente e leva as ordens até a equipe.
export const CHEFE = { id: 'chefe', nome: 'Você', funcao: 'Head de Operações · Sócia', cor: '#18181b', cabelo: '#2b1d14', pele: '#f1c27d', estilo: 'longo', feminina: true, brinco: '#e30613' };

// Estados aceitos e a cor de cada um.
export const STATUS = {
  ocioso:      { rotulo: 'ocioso',      cor: '#8e99ad' },
  trabalhando: { rotulo: 'trabalhando', cor: '#3fb27f' },
  aguardando:  { rotulo: 'aguardando',  cor: '#e0b23c' },
  concluido:   { rotulo: 'concluído',   cor: '#4c8dff' },
  erro:        { rotulo: 'erro',        cor: '#e5484d' },
};
