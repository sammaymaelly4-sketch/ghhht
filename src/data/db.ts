export type NivelRisco = "critico" | "alto" | "medio" | "baixo";

export interface CityData {
  ibge: string;
  pop: number | null;
  rcl: number | null;
  status: "real" | "estimado" | "placeholder";
  score: number;
  nivel: NivelRisco;
  s_proc: number;
  s_fin: number;
  s_sst: number;
  vara_principal: string;
  prefeito?: {
    nome: string;
    partido: string;
    mandato: string;
    historico: string[];
    secretarios?: string[];
  };
  ibge_dados?: {
    pib_per_capita: number;
    idhm: number;
    area: number;
    densidade: number;
  };
  noticias?: {
    data: string;
    manchete: string;
    fonte: string;
    impacto: "positivo" | "negativo" | "neutro" | "alerta";
  }[];
  fin: {
    litigio: number;
    precatorios: number;
    sst: number;
  };
  sst: {
    pcmso: number;
    pgr: number;
    ltcat: number;
    esocial: number;
    mte: number;
  };
  proc: {
    total: number;
    v1: { n: number; tr: number; p1: number; p2: number; val: number };
    v2: { n: number; tr: number; p1: number; p2: number; val: number };
    teses: { jornada: number; adicionais: number; reajuste: number; outros: number };
    fases: { tramite: number; primeira: number; segunda: number; transitado: number };
  };
}

export const DB: Record<string, CityData> = {
  "Natividade da Serra": {
    ibge: "3532603",
    pop: 6999,
    rcl: 28000000,
    status: "real",
    score: 95,
    nivel: "critico",
    s_proc: 40,
    s_fin: 35,
    s_sst: 20,
    vara_principal: "1ª e 2ª Vara — Taubaté",
    prefeito: {
      nome: "Evail",
      partido: "PSD",
      mandato: "2025-2028",
      historico: [
        "Reeleito. Enfrenta o desafio constante de gerir uma cidade dividida por uma represa.",
        "O seu histórico é de resiliência e foco em transporte e logística básica."
      ],
      secretarios: ["Luiz C. (Transportes)", "Dra. Fernanda (Saúde)", "Manoel R. (Finanças)"],
    },
    ibge_dados: {
      pib_per_capita: 15430.5,
      idhm: 0.69,
      area: 833.37,
      densidade: 8.16,
    },
    noticias: [
      {
        data: "Março 2026",
        manchete: "A aguardar verbas federais para uma nova balsa. Posiciona-se como um gestor focado em problemas estruturais e sociais urgentes.",
        fonte: "Dossiê Vale 2026",
        impacto: "neutro",
      },
      {
        data: "10/02/2026",
        manchete: "Prefeitura de Natividade da Serra assina TAC com Ministério Público do Trabalho",
        fonte: "Vale News",
        impacto: "alerta",
      },
      {
        data: "15/01/2026",
        manchete: "Novos investimentos em pavimentação anunciados pelo prefeito Macalé",
        fonte: "Gazeta de Taubaté",
        impacto: "positivo",
      }
    ],
    fin: { litigio: 2478550, precatorios: 1150000, sst: 900000 },
    sst: { pcmso: 0, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: {
      total: 89,
      v1: { n: 50, tr: 26, p1: 15, p2: 9, val: 1250300 },
      v2: { n: 39, tr: 16, p1: 19, p2: 4, val: 1228250 },
      teses: { jornada: 40, adicionais: 27, reajuste: 13, outros: 9 },
      fases: { tramite: 42, primeira: 34, segunda: 13, transitado: 0 },
    },
  },
  "Jambeiro": {
    ibge: "3524709",
    pop: 5349,
    rcl: 55000000,
    status: "estimado",
    score: 81,
    nivel: "critico",
    s_proc: 37,
    s_fin: 28,
    s_sst: 15,
    vara_principal: "Vara de Caçapava (Num.119)",
    prefeito: {
      nome: "Casquinha",
      partido: "PSD",
      mandato: "2025-2028",
      historico: [
        "Figura histórica da cidade, reeleito para mais um mandato.",
        "É conhecido pela gestão de 'pé no chão', priorizando as festas tradicionais e o apoio direto ao pequeno produtor."
      ],
      secretarios: ["José Bento (Agricultura)", "Cláudio Luiz (Desporto)", "Beatriz S. (Saúde)"],
    },
    ibge_dados: {
      pib_per_capita: 42100.8,
      idhm: 0.73,
      area: 184.41,
      densidade: 35.84,
    },
    noticias: [
      {
        data: "Março 2026",
        manchete: "A trabalhar na ampliação do polo logístico para aproveitar a proximidade com SJC. Defende o municipalismo e a descentralização administrativa.",
        fonte: "Dossiê Vale 2026",
        impacto: "positivo",
      },
      {
        data: "05/03/2026",
        manchete: "Servidores de Jambeiro ameaçam greve por reajuste salarial atrasado",
        fonte: "O Vale",
        impacto: "negativo",
      },
      {
        data: "20/11/2025",
        manchete: "Jambeiro inaugura novo posto de saúde no centro",
        fonte: "Prefeitura Oficial",
        impacto: "positivo",
      },
    ],
    fin: { litigio: 2403000, precatorios: 1115000, sst: 873000 },
    sst: { pcmso: 1, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: {
      total: 84,
      v1: { n: 44, tr: 12, p1: 15, p2: 10, val: 1250000 },
      v2: { n: 40, tr: 10, p1: 12, p2: 10, val: 1153000 },
      teses: { jornada: 38, adicionais: 25, reajuste: 13, outros: 8 },
      fases: { tramite: 22, primeira: 27, segunda: 20, transitado: 15 },
    },
  },
  "Redenção da Serra": {
    ibge: "3542602",
    pop: 4494,
    rcl: 35000000,
    status: "estimado",
    score: 72,
    nivel: "alto",
    s_proc: 24,
    s_fin: 28,
    s_sst: 20,
    vara_principal: "Vara de Taubaté (Num.102)",
    prefeito: {
      nome: "Jucimar",
      partido: "PSD",
      mandato: "2025-2028",
      historico: [
        "Líder carismático, reeleito.",
        "O seu percurso político está muito ligado às tradições de raiz e ao fortalecimento da rede de saúde nas comunidades isoladas."
      ],
      secretarios: ["Benedito P. (Cultura)", "Aline V. (Saúde)", "Tiago G. (Agricultura)"],
    },
    ibge_dados: {
      pib_per_capita: 12890.2,
      idhm: 0.68,
      area: 309.44,
      densidade: 14.98,
    },
    noticias: [
      {
        data: "Março 2026",
        manchete: "Investimento pesado na 'Festa do Milho' como motor económico. Defende o regionalismo e a preservação das raízes caipiras.",
        fonte: "Dossiê Vale 2026",
        impacto: "positivo",
      },
      {
        data: "28/02/2026",
        manchete: "Câmara de Redenção da Serra barra projeto de reestruturação administrativa",
        fonte: "Diário do Vale",
        impacto: "negativo",
      },
      {
        data: "10/12/2025",
        manchete: "Prefeitura quita 13º salário dos servidores antecipadamente",
        fonte: "Vale News",
        impacto: "positivo",
      },
    ],
    fin: { litigio: 1498000, precatorios: 690000, sst: 540000 },
    sst: { pcmso: 0, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: {
      total: 54,
      v1: { n: 30, tr: 10, p1: 9, p2: 6, val: 780000 },
      v2: { n: 24, tr: 6, p1: 11, p2: 4, val: 718000 },
      teses: { jornada: 24, adicionais: 16, reajuste: 9, outros: 5 },
      fases: { tramite: 16, primeira: 20, segunda: 10, transitado: 8 },
    },
  },
  "Arapeí": {
    ibge: "3503208",
    pop: 2330,
    rcl: 34000000,
    status: "estimado",
    score: 50,
    nivel: "medio",
    s_proc: 13,
    s_fin: 16,
    s_sst: 20,
    vara_principal: "Vara de Cruzeiro (Num.40)",
    prefeito: {
      nome: "Renê Arantes",
      partido: "PSD",
      mandato: "2025-2028",
      historico: [
        "Reeleito com forte apoio da base rural.",
        "O seu percurso é marcado pela defesa acérrima dos produtores de leite e pela melhoria das estradas que ligam a cidade ao estado do Rio de Janeiro.",
        "É um político de perfil executor."
      ],
      secretarios: ["Maria Silva (Saúde)", "João Paulo (Educação)", "Carlos Alberto (Finanças)"],
    },
    ibge_dados: {
      pib_per_capita: 18500.0,
      idhm: 0.67,
      area: 156.9,
      densidade: 15.0,
    },
    noticias: [
      {
        data: "Março 2026",
        manchete: "Focado na conclusão do plano de saneamento rural. Posiciona-se no centro-direita, mantendo uma relação cordial com o Governo Estadual para garantir verbas de infraestrutura.",
        fonte: "Dossiê Vale 2026",
        impacto: "positivo",
      },
      {
        data: "02/03/2026",
        manchete: "Arapeí lança plano de fomento ao turismo regional",
        fonte: "Turismo SP",
        impacto: "positivo",
      },
      {
        data: "15/02/2026",
        manchete: "TCE aponta irregularidades em contratos antigos da prefeitura",
        fonte: "G1 Vale do Paraíba",
        impacto: "alerta",
      },
    ],
    fin: { litigio: 868000, precatorios: 402000, sst: 315000 },
    sst: { pcmso: 0, pgr: 0, ltcat: 0, esocial: 0, mte: 1 },
    proc: {
      total: 31,
      v1: { n: 31, tr: 9, p1: 8, p2: 5, val: 868000 },
      v2: { n: 0, tr: 0, p1: 0, p2: 0, val: 0 },
      teses: { jornada: 14, adicionais: 8, reajuste: 5, outros: 4 },
      fases: { tramite: 9, primeira: 13, segunda: 5, transitado: 4 },
    },
  },
  "Lagoinha": {
    ibge: "3526308",
    pop: 4841,
    rcl: null,
    status: "placeholder",
    score: 25,
    nivel: "baixo",
    s_proc: 0,
    s_fin: 0,
    s_sst: 25,
    vara_principal: "—",
    prefeito: {
      nome: "Tiago Magno",
      partido: "PL",
      mandato: "2025-2028",
      historico: [
        "Político com forte base religiosa, reeleito.",
        "O seu mandato anterior foi marcado por grandes obras de pavimentação e pelo fomento ao turismo religioso na região."
      ],
      secretarios: ["Getúlio O. (Obras)", "Marisa T. (Turismo)", "Wilson P. (Educação)"],
    },
    ibge_dados: {
      pib_per_capita: 14200.0,
      idhm: 0.7,
      area: 255.47,
      densidade: 19.5,
    },
    noticias: [
      {
        data: "Março 2026",
        manchete: "Posiciona-se firmemente à direita, alinhado com a bancada federal do PL. Atualmente foca na modernização do centro histórico e eventos católicos.",
        fonte: "Dossiê Vale 2026",
        impacto: "neutro",
      },
      {
        data: "12/03/2026",
        manchete: "Prefeito de Lagoinha decreta calamidade financeira",
        fonte: "O Vale",
        impacto: "negativo",
      },
      {
        data: "01/02/2026",
        manchete: "Novo portal da transparência é lançado em Lagoinha",
        fonte: "Prefeitura Oficial",
        impacto: "positivo",
      },
    ],
    fin: { litigio: 0, precatorios: 0, sst: 0 },
    sst: { pcmso: 0, pgr: 0, ltcat: 0, esocial: 0, mte: 0 },
    proc: {
      total: 0,
      v1: { n: 0, tr: 0, p1: 0, p2: 0, val: 0 },
      v2: { n: 0, tr: 0, p1: 0, p2: 0, val: 0 },
      teses: { jornada: 0, adicionais: 0, reajuste: 0, outros: 0 },
      fases: { tramite: 0, primeira: 0, segunda: 0, transitado: 0 },
    },
  },
  "Areias": {
    ibge: "3503505", pop: 3577, rcl: 25000000, status: "estimado", score: 60, nivel: "medio",
    s_proc: 20, s_fin: 20, s_sst: 20, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "Paulo Henrique (PH)", partido: "PSD", mandato: "2025-2028", historico: ["Jovem liderança que emergiu do legislativo.", "Focando na revitalização do património histórico."], secretarios: ["Eliane Castro (Turismo)", "Ricardo Mendes (Obras)", "Dr. Marcos (Saúde)"] },
    ibge_dados: { pib_per_capita: 16200, idhm: 0.68, area: 305, densidade: 11.7 },
    noticias: [{ data: "Março 2026", manchete: "Anunciou parcerias para o restauro de casarões do Ciclo do Café. Defende o conservadorismo moderado e a economia criativa.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 500000, precatorios: 200000, sst: 100000 }, sst: { pcmso: 1, pgr: 1, ltcat: 0, esocial: 0, mte: 0 },
    proc: { total: 15, v1: { n: 10, tr: 5, p1: 3, p2: 2, val: 300000 }, v2: { n: 5, tr: 2, p1: 2, p2: 1, val: 200000 }, teses: { jornada: 5, adicionais: 5, reajuste: 3, outros: 2 }, fases: { tramite: 5, primeira: 5, segunda: 3, transitado: 2 } }
  },
  "Bananal": {
    ibge: "3504909", pop: 9969, rcl: 45000000, status: "estimado", score: 75, nivel: "alto",
    s_proc: 25, s_fin: 30, s_sst: 20, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "William Landim", partido: "Republicanos", mandato: "2025-2028", historico: ["Venceu uma eleição polarizada em 2024.", "Histórico ligado ao setor de serviços e preservação ambiental."], secretarios: ["Roberta Lima (Administração)", "Profa. Ana (Ensino)", "Jorge Viana (Saúde)"] },
    ibge_dados: { pib_per_capita: 19500, idhm: 0.71, area: 616, densidade: 16.1 },
    noticias: [{ data: "Março 2026", manchete: "Lidera o movimento regional para a melhoria da SP-064. Posicionamento conservador, ligado ao agronegócio.", fonte: "Dossiê Vale", impacto: "neutro" }],
    fin: { litigio: 1200000, precatorios: 500000, sst: 300000 }, sst: { pcmso: 0, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: { total: 42, v1: { n: 22, tr: 10, p1: 8, p2: 4, val: 700000 }, v2: { n: 20, tr: 8, p1: 10, p2: 2, val: 500000 }, teses: { jornada: 20, adicionais: 12, reajuste: 6, outros: 4 }, fases: { tramite: 12, primeira: 18, segunda: 8, transitado: 4 } }
  },
  "Canas": {
    ibge: "3509957", pop: 4931, rcl: 30000000, status: "estimado", score: 45, nivel: "medio",
    s_proc: 15, s_fin: 15, s_sst: 15, vara_principal: "Vara de Lorena",
    prefeito: { nome: "Silvana Chagas", partido: "PSD", mandato: "2025-2028", historico: ["Reeleita por larga margem.", "Pautada pela eficiência na assistência social e organização urbana."], secretarios: ["Sandra R. (Social)", "Valéria M. (Educação)", "Paulo S. (Governo)"] },
    ibge_dados: { pib_per_capita: 21000, idhm: 0.74, area: 53, densidade: 93.0 },
    noticias: [{ data: "Março 2026", manchete: "Foco na expansão do programa de habitação popular. Mantém um posicionamento pragmático.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 400000, precatorios: 150000, sst: 80000 }, sst: { pcmso: 1, pgr: 1, ltcat: 1, esocial: 1, mte: 0 },
    proc: { total: 18, v1: { n: 10, tr: 4, p1: 4, p2: 2, val: 250000 }, v2: { n: 8, tr: 3, p1: 3, p2: 2, val: 150000 }, teses: { jornada: 8, adicionais: 5, reajuste: 3, outros: 2 }, fases: { tramite: 6, primeira: 6, segunda: 4, transitado: 2 } }
  },
  "Lavrinhas": {
    ibge: "3526605", pop: 7171, rcl: 38000000, status: "estimado", score: 55, nivel: "medio",
    s_proc: 18, s_fin: 22, s_sst: 15, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "Jhow", partido: "PSD", mandato: "2025-2028", historico: ["Consolidou liderança através do turismo das águas.", "Gestão elogiada pela transparência."], secretarios: ["Carla S. (Turismo)", "Roberto F. (Ambiente)", "Patrícia L. (Saúde)"] },
    ibge_dados: { pib_per_capita: 17800, idhm: 0.72, area: 167, densidade: 42.9 },
    noticias: [{ data: "Março 2026", manchete: "Luta contra o avanço de loteamentos irregulares para preservar o potencial ecoturístico.", fonte: "Dossiê Vale", impacto: "alerta" }],
    fin: { litigio: 650000, precatorios: 250000, sst: 150000 }, sst: { pcmso: 1, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: { total: 25, v1: { n: 15, tr: 6, p1: 5, p2: 4, val: 400000 }, v2: { n: 10, tr: 4, p1: 4, p2: 2, val: 250000 }, teses: { jornada: 10, adicionais: 8, reajuste: 4, outros: 3 }, fases: { tramite: 8, primeira: 10, segunda: 5, transitado: 2 } }
  },
  "Monteiro Lobato": {
    ibge: "3531704", pop: 4138, rcl: 28000000, status: "estimado", score: 40, nivel: "baixo",
    s_proc: 10, s_fin: 15, s_sst: 15, vara_principal: "Vara de São José dos Campos",
    prefeito: { nome: "Edinho", partido: "PSD", mandato: "2025-2028", historico: ["Venceu como o candidato da continuidade.", "Foca na digitalização dos serviços públicos e educação."], secretarios: ["Lúcia S. (Educação)", "André M. (Inovação)", "Sérgio B. (Obras)"] },
    ibge_dados: { pib_per_capita: 18200, idhm: 0.73, area: 332, densidade: 12.4 },
    noticias: [{ data: "Março 2026", manchete: "Expansão da rede Wi-Fi gratuita para as áreas rurais. Perfil moderado e técnico.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 350000, precatorios: 100000, sst: 50000 }, sst: { pcmso: 1, pgr: 1, ltcat: 1, esocial: 1, mte: 0 },
    proc: { total: 12, v1: { n: 8, tr: 3, p1: 3, p2: 2, val: 200000 }, v2: { n: 4, tr: 2, p1: 1, p2: 1, val: 150000 }, teses: { jornada: 5, adicionais: 4, reajuste: 2, outros: 1 }, fases: { tramite: 4, primeira: 4, segunda: 2, transitado: 2 } }
  },
  "Queluz": {
    ibge: "3541901", pop: 9159, rcl: 48000000, status: "estimado", score: 65, nivel: "alto",
    s_proc: 22, s_fin: 25, s_sst: 18, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "Lió", partido: "PSDB", mandato: "2025-2028", historico: ["Veterano na política, reeleito.", "Respeitado pela austeridade fiscal e atração de indústrias."], secretarios: ["Fábio L. (Gestão)", "Sonia M. (Planeamento)", "Dr. Henrique (Saúde)"] },
    ibge_dados: { pib_per_capita: 22500, idhm: 0.76, area: 249, densidade: 36.7 },
    noticias: [{ data: "Março 2026", manchete: "Focado na criação de um novo parque industrial. Prioriza o desenvolvimento económico.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 950000, precatorios: 400000, sst: 200000 }, sst: { pcmso: 0, pgr: 1, ltcat: 1, esocial: 0, mte: 0 },
    proc: { total: 35, v1: { n: 20, tr: 8, p1: 7, p2: 5, val: 550000 }, v2: { n: 15, tr: 6, p1: 6, p2: 3, val: 400000 }, teses: { jornada: 15, adicionais: 10, reajuste: 6, outros: 4 }, fases: { tramite: 10, primeira: 15, segunda: 6, transitado: 4 } }
  },
  "Santo Antônio do Pinhal": {
    ibge: "3548203", pop: 7133, rcl: 42000000, status: "estimado", score: 35, nivel: "baixo",
    s_proc: 10, s_fin: 10, s_sst: 15, vara_principal: "Vara de Campos do Jordão",
    prefeito: { nome: "Anderson", partido: "PSD", mandato: "2025-2028", historico: ["Elevou o patamar turístico da cidade.", "Líder do consórcio de municípios da Mantiqueira."], secretarios: ["Izabel C. (Ambiente)", "Marcos A. (Obras)", "Solange R. (Educação)"] },
    ibge_dados: { pib_per_capita: 24100, idhm: 0.78, area: 133, densidade: 53.6 },
    noticias: [{ data: "Março 2026", manchete: "A implementar leis rígidas contra a verticalização. Defensor do turismo de luxo sustentável.", fonte: "Dossiê Vale", impacto: "alerta" }],
    fin: { litigio: 250000, precatorios: 50000, sst: 50000 }, sst: { pcmso: 1, pgr: 1, ltcat: 1, esocial: 1, mte: 0 },
    proc: { total: 8, v1: { n: 5, tr: 2, p1: 2, p2: 1, val: 150000 }, v2: { n: 3, tr: 1, p1: 1, p2: 1, val: 100000 }, teses: { jornada: 3, adicionais: 2, reajuste: 2, outros: 1 }, fases: { tramite: 2, primeira: 3, segunda: 2, transitado: 1 } }
  },
  "São José do Barreiro": {
    ibge: "3549607", pop: 3853, rcl: 26000000, status: "estimado", score: 48, nivel: "medio",
    s_proc: 15, s_fin: 18, s_sst: 15, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "Lê Braga", partido: "PSD", mandato: "2025-2028", historico: ["Reeleito. Mandato focado no portal da Serra da Bocaina.", "Articulador diplomático com órgãos federais."], secretarios: ["Flávia B. (Turismo)", "Jonas L. (Meio Ambiente)", "Márcia S. (Educação)"] },
    ibge_dados: { pib_per_capita: 15800, idhm: 0.69, area: 570, densidade: 6.7 },
    noticias: [{ data: "Março 2026", manchete: "Plano de recuperação de trilhas históricas. Posicionamento voltado para a economia verde.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 450000, precatorios: 150000, sst: 100000 }, sst: { pcmso: 1, pgr: 0, ltcat: 1, esocial: 0, mte: 0 },
    proc: { total: 16, v1: { n: 10, tr: 4, p1: 4, p2: 2, val: 250000 }, v2: { n: 6, tr: 2, p1: 3, p2: 1, val: 200000 }, teses: { jornada: 6, adicionais: 5, reajuste: 3, outros: 2 }, fases: { tramite: 5, primeira: 6, segunda: 3, transitado: 2 } }
  },
  "Silveiras": {
    ibge: "3551900", pop: 6186, rcl: 32000000, status: "estimado", score: 58, nivel: "medio",
    s_proc: 18, s_fin: 20, s_sst: 20, vara_principal: "Vara de Cruzeiro",
    prefeito: { nome: "Guilherme Carvalho", partido: "PSD", mandato: "2025-2028", historico: ["Político muito ligado à cultura local.", "Promessa de expandir o mercado de artesanato."], secretarios: ["Mestre Zé (Cultura)", "Valdir P. (Obras)", "Juliana D. (Saúde)"] },
    ibge_dados: { pib_per_capita: 16500, idhm: 0.70, area: 414, densidade: 14.9 },
    noticias: [{ data: "Março 2026", manchete: "Construção de um novo centro cultural para os artesãos da madeira.", fonte: "Dossiê Vale", impacto: "positivo" }],
    fin: { litigio: 550000, precatorios: 200000, sst: 120000 }, sst: { pcmso: 0, pgr: 1, ltcat: 1, esocial: 0, mte: 0 },
    proc: { total: 22, v1: { n: 12, tr: 5, p1: 4, p2: 3, val: 300000 }, v2: { n: 10, tr: 4, p1: 4, p2: 2, val: 250000 }, teses: { jornada: 9, adicionais: 7, reajuste: 4, outros: 2 }, fases: { tramite: 7, primeira: 8, segunda: 4, transitado: 3 } }
  }
};

export const CITY_ORDER = [
  "Arapeí",
  "Areias",
  "Bananal",
  "Canas",
  "Jambeiro",
  "Lagoinha",
  "Lavrinhas",
  "Monteiro Lobato",
  "Natividade da Serra",
  "Queluz",
  "Redenção da Serra",
  "Santo Antônio do Pinhal",
  "São José do Barreiro",
  "Silveiras"
];

export const NV_COL = {
  critico: "#dc2626",
  alto: "#d97706",
  medio: "#059669",
  baixo: "#64748b",
};

export const NV_BG = {
  critico: "#fef2f2",
  alto: "#fffbeb",
  medio: "#f0fdf4",
  baixo: "#f8fafc",
};

export const NV_BR = {
  critico: "#fca5a5",
  alto: "#fcd34d",
  medio: "#86efac",
  baixo: "#e2e8f0",
};

export const NV_LABEL = {
  critico: "Risco Crítico",
  alto: "Risco Alto",
  medio: "Risco Médio",
  baixo: "Risco Baixo",
};

export const NV_BADGE_BG = {
  critico: "rgba(220,38,38,.8)",
  alto: "rgba(217,119,6,.8)",
  medio: "rgba(5,150,105,.8)",
  baixo: "rgba(100,116,139,.8)",
};
