// Conversas das pausas: diálogos de verdade (um fala, o outro responde), com
// frases de cada função e assuntos do trabalho real (clientes, últimas entregas).
//
// Cada diálogo é uma lista de falas; "A" é quem puxa o assunto, "B" quem responde
// e "C" um terceiro (na mesa de reunião). Marcadores:
//   {outro}   nome de quem está ouvindo        {cliente}  um cliente cadastrado
//   {entrega} o que quem fala entregou por último
// Regras para não ficar sem sentido:
//   quem  — só puxa esse assunto quem tem essa função (ex.: a Qualidade fala das revisões)
//   menciona — o diálogo fala dessa pessoa: não é usado se ela estiver na roda
//   precisa — 'cliente' ou 'entrega': só aparece se houver esse contexto

const DIALOGOS = [
  // gerais
  { falas: [['A', 'Café?'], ['B', 'Bora, tô precisando.'], ['A', 'Hoje o dia tá puxado.']] },
  { falas: [['A', 'E aí, {outro}, como tá aí?'], ['B', 'Corrido, mas andando. E você?'], ['A', 'Mesma coisa. Uma pausa ajuda.']] },
  { falas: [['A', 'Esse café tá mais forte hoje.'], ['B', 'Alguém exagerou no pó 😅']] },
  { falas: [['A', 'Fez o que no fim de semana?'], ['B', 'Descansei, finalmente.'], ['A', 'Merecido.']] },
  { falas: [['A', 'Ouviu o sino mais cedo?'], ['B', 'Ouvi! Mais uma entrega saindo.'], ['A', 'Assim que eu gosto.']] },
  { falas: [['A', 'Fechamento do mês chegando…'], ['B', 'Relatórios em dia?'], ['A', 'Quase todos. Falta revisar dois.']] },
  { falas: [['A', '{outro}, depois me mostra aquela planilha que você montou?'], ['B', 'Mostro sim, é mais simples do que parece.']] },
  { falas: [['A', 'Água gelada, finalmente.'], ['B', 'O bebedouro tava quente ontem, né?']] },
  { falas: [['A', 'Qual etapa do funil mais trava os clientes hoje?'], ['B', 'Monetização. Lead chega, mas o comercial não converte.'], ['A', 'Vale levar isso para os planejamentos.']] },
  // com o trabalho real
  { precisa: 'cliente', falas: [['A', 'A conta {cliente} tá indo bem, hein.'], ['B', 'Tá sim! O cliente vai gostar do relatório.']] },
  { precisa: 'cliente', falas: [['A', 'Qual o próximo passo da conta {cliente}?'], ['B', 'O Braço Direito vai definir na próxima rodada.']], menciona: ['orquestrador'] },
  { precisa: 'entrega', falas: [['A', 'Acabei de entregar: {entrega}.'], ['B', 'Boa! Rápido, hein.'], ['A', 'Agora é a Head aprovar.']] },
  { precisa: 'entrega', falas: [['A', 'Terminei {entrega}.'], ['B', 'Show. Precisa de revisão?'], ['A', 'A Qualidade já vai dar uma olhada.']], menciona: ['qa'] },
  // de cada função (quem puxa o assunto)
  { quem: 'qa', falas: [['A', '{outro}, revisei sua última entrega. Ficou redondinha.'], ['B', 'Ufa! Valeu pelo cuidado.']] },
  { quem: 'qa', falas: [['A', 'Achei um número que não batia no relatório, já pedi o ajuste.'], ['B', 'Ainda bem que você pegou antes do cliente.']] },
  { quem: 'performance', falas: [['A', 'O CPL de duas contas subiu essa semana.'], ['B', 'Já sabe o motivo?'], ['A', 'Criativo cansado. Já sinalizei para o squad.']] },
  { quem: 'performance', falas: [['A', 'Atualizei o dashboard. Tá quase tudo no verde.'], ['B', 'E o que tá no vermelho?'], ['A', 'Uma conta só, com plano de ação pronto.']] },
  { quem: 'cs', falas: [['A', 'Fiz o check-in com um cliente que tava sumido.'], ['B', 'E aí, tudo certo?'], ['A', 'Tava inseguro com os resultados. Marcamos reunião de alinhamento.']] },
  { quem: 'cs', falas: [['A', 'O NPS desse mês veio melhor.'], ['B', 'Boa! O que mais elogiaram?'], ['A', 'A proximidade do squad.']] },
  { quem: 'squads', falas: [['A', 'Um dos gestores tá com conta demais.'], ['B', 'Dá para redistribuir?'], ['A', 'Dá, já montei a proposta para a Head.']] },
  { quem: 'squads', falas: [['A', '{outro}, tem um tempinho para o seu 1:1 amanhã?'], ['B', 'Tenho sim, de manhã é melhor.']] },
  { quem: 'financeiro', falas: [['A', 'Fechei a margem por conta do mês.'], ['B', 'Alguma surpresa?'], ['A', 'Uma conta dando mais trabalho do que o fee paga.']] },
  { quem: 'financeiro', falas: [['A', 'O forecast do trimestre tá bonito.'], ['B', 'Contando as renovações?'], ['A', 'Contando, e com o churn previsto descontado.']] },
  { quem: 'planejamento', falas: [['A', 'Tô fechando o planejamento do próximo trimestre.'], ['B', 'Já tem as metas por etapa do funil?'], ['A', 'Tenho, falta validar o investimento.']] },
  { quem: 'planejamento', precisa: 'cliente', falas: [['A', 'Revisei o planejamento da conta {cliente}.'], ['B', 'Mudou muita coisa?'], ['A', 'Só a divisão de verba entre os canais.']] },
  { quem: 'documentador', falas: [['A', 'Atualizei o SOP de onboarding. Dá uma olhada quando puder.'], ['B', 'Pode deixar, eu leio hoje.']] },
  { quem: 'orquestrador', falas: [['A', 'Como estão as demandas, {outro}?'], ['B', 'Quase tudo pronto, falta revisar.'], ['A', 'Perfeito, me avisa para eu levar para a Head.']] },
  { quem: 'orquestrador', minimo: 3, falas: [['A', 'Bom trabalho essa semana, pessoal.'], ['B', 'Valeu! O time tá afiado.']] },
  // na reunião, com três
  { minimo: 3, falas: [['A', 'Bom, vamos alinhar rapidinho?'], ['B', 'Do meu lado tá tudo andando.'], ['C', 'Do meu também, sem bloqueio.'], ['A', 'Ótimo, então seguimos.']] },
  { minimo: 3, falas: [['A', 'Alguém precisa de ajuda com alguma coisa?'], ['B', 'Por enquanto não.'], ['C', 'Talvez mais tarde, com o relatório.']] },
];

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];

// grupo: ids de quem está na roda (o primeiro puxa o assunto); nomeDe(id) → nome;
// contexto: { clientes: [nomes], recentes: { id: 'o que entregou' } }
export function montarConversa(grupo, nomeDe, contexto = {}) {
  if (grupo.length < 2) return [];
  const clientes = contexto.clientes || [];
  const recentes = contexto.recentes || {};
  const papeis = { A: grupo[0], B: grupo[1], C: grupo[2] || grupo[0] };
  const opcoes = DIALOGOS.filter((d) => {
    if (d.minimo && grupo.length < d.minimo) return false;
    if (d.quem && d.quem !== papeis.A) return false;
    if (d.menciona?.some((id) => grupo.includes(id))) return false; // não fala de quem está na roda
    if (d.precisa === 'cliente' && !clientes.length) return false;
    if (d.precisa === 'entrega' && !recentes[papeis.A]) return false;
    return true;
  });
  // assuntos da função e do trabalho real têm mais chance de sair
  const pesadas = opcoes.flatMap((d) => (d.quem || d.precisa ? [d, d, d] : [d]));
  const d = sortear(pesadas.length ? pesadas : DIALOGOS.filter((x) => !x.quem && !x.precisa && !x.menciona && !x.minimo));
  const cliente = sortear(clientes) || 'o projeto';
  return d.falas.map(([papel, texto]) => {
    const quem = papeis[papel];
    const ouvinte = papel === 'A' ? papeis.B : papeis.A;
    return {
      id: quem,
      texto: texto.replaceAll('{outro}', nomeDe(ouvinte)).replaceAll('{cliente}', cliente).replaceAll('{entrega}', recentes[quem] || 'aquela tarefa'),
    };
  });
}
