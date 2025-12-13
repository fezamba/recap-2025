export type FieldType = "textarea" | "text";

export type Question = {
  id: string;
  label: string;
  type: FieldType;
  rows?: number;
};

export type Section = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export const formSchema: Section[] = [
  {
    id: "vida_pessoal",
    title: "Vida Pessoal",
    questions: [
      { id: "vida_pessoal.maior_aprendizado_pessoal_2025", label: "Qual foi o maior aprendizado pessoal de 2025?", type: "textarea", rows: 5 },
      { id: "vida_pessoal.coragem_real_2025", label: "O que você enfrentou que exigiu coragem real?", type: "textarea", rows: 5 },
      { id: "vida_pessoal.amadureceu_inesperado_2025", label: "Onde você amadureceu de forma inesperada?", type: "textarea", rows: 5 },
      { id: "vida_pessoal.deixou_para_tras_2025", label: "O que você deixou para trás, consciente ou não?", type: "textarea", rows: 5 },
      { id: "vida_pessoal.habitos_fortaleceram_2025", label: "Que hábitos fortaleceram você?", type: "textarea", rows: 4 },
      { id: "vida_pessoal.habitos_drenaram_2025", label: "Que hábitos drenaram sua energia?", type: "textarea", rows: 4 },
      { id: "vida_pessoal.momentos_paz_genuina_2025", label: "Em que momentos você sentiu paz genuína?", type: "textarea", rows: 5 },
      { id: "vida_pessoal.ainda_evita_olhar_2025", label: "O que você ainda evita olhar?", type: "textarea", rows: 5 },
    ],
  },
  {
    id: "saude_energia",
    title: "Saúde e Energia",
    questions: [
      { id: "saude_energia.vitalidade_ao_longo_2025", label: "Como você avalia seu nível de vitalidade ao longo do ano?", type: "textarea", rows: 5 },
      { id: "saude_energia.melhorou_rotina_cuidados_2025", label: "O que melhorou na sua rotina de cuidados?", type: "textarea", rows: 5 },
      { id: "saude_energia.negligenciou_2025", label: "O que você negligenciou?", type: "textarea", rows: 4 },
      { id: "saude_energia.impacto_emocional_energia_fisica_2025", label: "Qual foi o impacto emocional na sua energia física?", type: "textarea", rows: 5 },
      { id: "saude_energia.ajustes_simples_mudariam_muito_2025", label: "Que ajustes simples poderiam ter mudado muito?", type: "textarea", rows: 4 },
    ],
  },
  {
    id: "proposito_criatividade",
    title: "Propósito e Criatividade",
    questions: [
      { id: "proposito_criatividade.criatividade_floresceu_2025", label: "Onde sua criatividade floresceu em 2025?", type: "textarea", rows: 5 },
      { id: "proposito_criatividade.ideias_iniciou_nao_consolidou_2025", label: "Quais ideias você iniciou, mas não consolidou? Por quê?", type: "textarea", rows: 6 },
      { id: "proposito_criatividade.produziu_representa_quem_e_hoje_2025", label: "O que você produziu que representa quem você é hoje?", type: "textarea", rows: 5 },
      { id: "proposito_criatividade.voz_interior_mais_clara_2025", label: "Que voz interior ficou mais clara ao longo do ano?", type: "textarea", rows: 5 },
      { id: "proposito_criatividade.ousada_em_2026", label: "Em que você quer se tornar mais ousada em 2026?", type: "textarea", rows: 5 },
    ],
  },
  {
    id: "espiritualidade",
    title: "Espiritualidade",
    questions: [
      { id: "espiritualidade.praticas_fortaleceram_conexao_2025", label: "Quais práticas fortaleceram sua conexão com o sagrado?", type: "textarea", rows: 5 },
      { id: "espiritualidade.momentos_direcao_espiritual_2025", label: "Em que momentos você sentiu direção espiritual?", type: "textarea", rows: 5 },
      { id: "espiritualidade.areas_pedem_cura_2025", label: "Que áreas pedem cura ou reconciliação?", type: "textarea", rows: 5 },
      { id: "espiritualidade.entregou_vs_controlar_2025", label: "O que você entregou e o que você insistiu em controlar?", type: "textarea", rows: 5 },
      { id: "espiritualidade.aprofundar_essencia_proximo_ciclo_2026", label: "Como deseja aprofundar sua essência no próximo ciclo?", type: "textarea", rows: 5 },
    ],
  },
  {
    id: "relacoes",
    title: "Relações",
    questions: [
      { id: "relacoes.quem_apoiou_verdadeiro_2025", label: "Quem te apoiou de forma verdadeira este ano?", type: "textarea", rows: 5 },
      { id: "relacoes.quem_precisou_afastar_2025", label: "Quem você precisou se afastar?", type: "textarea", rows: 4 },
      { id: "relacoes.limites_saudaveis_2025", label: "Onde você praticou limites de forma saudável?", type: "textarea", rows: 5 },
      { id: "relacoes.foi_ouvida_e_vista_2025", label: "Em quais momentos você foi ouvida e vista?", type: "textarea", rows: 5 },
      { id: "relacoes.transformar_relacoes_2026", label: "O que você deseja transformar nas relações em 2026?", type: "textarea", rows: 5 },
    ],
  },
  {
    id: "trabalho_missao_expansao",
    title: "Trabalho, Missão e Expansão",
    questions: [
      { id: "trabalho_missao_expansao.conquistas_satisfacao_real_2025", label: "Quais conquistas profissionais te deram satisfação real?", type: "textarea", rows: 5 },
      { id: "trabalho_missao_expansao.frustrou_ou_limitou_2025", label: "O que te frustrou ou limitou?", type: "textarea", rows: 5 },
      { id: "trabalho_missao_expansao.habilidades_desenvolveu_2025", label: "Quais habilidades você desenvolveu?", type: "textarea", rows: 5 },
      { id: "trabalho_missao_expansao.portas_se_abriram_2025", label: "Que portas se abriram?", type: "textarea", rows: 4 },
      { id: "trabalho_missao_expansao.movimento_2026_proposito_maior", label: "Que movimento você deseja fazer em 2026 para se aproximar do seu propósito maior?", type: "textarea", rows: 6 },
    ],
  },
  {
    id: "realizacoes_desafios",
    title: "Realizações e Desafios",
    description: "Uma visão ampliada em formato de tabela para facilitar:",
    questions: [
      { id: "realizacoes_desafios.pessoal.melhor_realizacao_2025", label: "Pessoal — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.pessoal.maior_desafio_2025", label: "Pessoal — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.pessoal.o_que_aprendi_2025", label: "Pessoal — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.pessoal.o_que_quero_mudar_2026", label: "Pessoal — O que quero mudar em 2026", type: "textarea", rows: 3 },

      { id: "realizacoes_desafios.saude.melhor_realizacao_2025", label: "Saúde — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.saude.maior_desafio_2025", label: "Saúde — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.saude.o_que_aprendi_2025", label: "Saúde — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.saude.o_que_quero_mudar_2026", label: "Saúde — O que quero mudar em 2026", type: "textarea", rows: 3 },

      { id: "realizacoes_desafios.criatividade.melhor_realizacao_2025", label: "Criatividade — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.criatividade.maior_desafio_2025", label: "Criatividade — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.criatividade.o_que_aprendi_2025", label: "Criatividade — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.criatividade.o_que_quero_mudar_2026", label: "Criatividade — O que quero mudar em 2026", type: "textarea", rows: 3 },

      { id: "realizacoes_desafios.espiritualidade.melhor_realizacao_2025", label: "Espiritualidade — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.espiritualidade.maior_desafio_2025", label: "Espiritualidade — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.espiritualidade.o_que_aprendi_2025", label: "Espiritualidade — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.espiritualidade.o_que_quero_mudar_2026", label: "Espiritualidade — O que quero mudar em 2026", type: "textarea", rows: 3 },

      { id: "realizacoes_desafios.relacoes.melhor_realizacao_2025", label: "Relações — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.relacoes.maior_desafio_2025", label: "Relações — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.relacoes.o_que_aprendi_2025", label: "Relações — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.relacoes.o_que_quero_mudar_2026", label: "Relações — O que quero mudar em 2026", type: "textarea", rows: 3 },

      { id: "realizacoes_desafios.profissional.melhor_realizacao_2025", label: "Profissional — Melhor Realização", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.profissional.maior_desafio_2025", label: "Profissional — Maior Desafio", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.profissional.o_que_aprendi_2025", label: "Profissional — O que aprendi", type: "textarea", rows: 3 },
      { id: "realizacoes_desafios.profissional.o_que_quero_mudar_2026", label: "Profissional — O que quero mudar em 2026", type: "textarea", rows: 3 },
    ],
  },
  {
    id: "visao_2026",
    title: "Visão para 2026",
    questions: [
      { id: "visao_2026.o_que_quer_viver_2026", label: "O que você quer viver, não apenas fazer?", type: "textarea", rows: 5 },
      { id: "visao_2026.palavra_chave_2026", label: "Qual é a sua palavra-chave para 2026?", type: "textarea", rows: 3 },
      { id: "visao_2026.precisa_encerrar_antes_virar_2025", label: "O que precisa ser encerrado antes do ano virar?", type: "textarea", rows: 4 },
      { id: "visao_2026.compromisso_consigo_2026", label: "Que compromisso você quer assumir consigo mesma?", type: "textarea", rows: 4 },
      { id: "visao_2026.norte_espiritual_emocional_criativo_2026", label: "Qual será seu norte espiritual, emocional e criativo?", type: "textarea", rows: 5 },
    ],
  },
];
