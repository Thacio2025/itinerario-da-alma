/** Citações breves da tradição dos Padres do deserto (encorajamento no caminho). */

export type CitacaoPatristica = {
  texto: string;
  autor: string;
};

/** Conjunto geral quando não há lista específica. */
export const CITACOES_PADRES_DESERTO: CitacaoPatristica[] = [
  {
    texto:
      "Não desanimes, nem te deixes vencer pela preguiça. Faze o que puderes.",
    autor: "Abba Poemen, em Apophthegmata Patrum",
  },
  {
    texto:
      "Se caíres, levanta-te de novo. O caminho de Deus é assim: levantar-se sempre.",
    autor: "Ditos dos Padres do deserto",
  },
  {
    texto:
      "Deus não pede perfeição de relâmpago, mas fidelidade de passos.",
    autor: "Tradição pastoral monástica",
  },
  {
    texto:
      "Não compares o teu começo com o fim de outrem. Cada alma tem o seu ritmo diante de Deus.",
    autor: "Tradição monástica",
  },
  {
    texto:
      "O deserto não é fuga do mundo, mas busca de um só Coração.",
    autor: "Tradição dos Padres do deserto",
  },
  {
    texto:
      "O que importa não é quanto corres, mas se permaneces no caminho.",
    autor: "Espírito dos Apophthegmata Patrum",
  },
];

/** Uma lista por logismoi (id 1–8): tom alinhado à virtude oposta e ao combate espiritual desse eixo. */
export const CITACOES_POR_LOGISMOI: Record<number, CitacaoPatristica[]> = {
  1: [
    {
      texto:
        "Mais vale comer pão com Deus do que banquetes sem paz interior.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "A sobriedade não é tristeza: é liberdade para amar o essencial.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Domina o estômago e não serás escravo; deixa-o dominar-te e perderás a clareza da oração.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Come para viver; não vivas para comer. Cristo é o pão que sacia.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "Um dia de jejum humilde vale mais que mil palavras sobre temperança.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "A medida no corpo abre medida no coração.",
      autor: "Tradição ascética",
    },
  ],
  2: [
    {
      texto:
        "Guarda os olhos e guardarás o coração; guarda o coração e guardarás a tua alma.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "A pureza começa no recolhimento do desejo: não é fuga do mundo, mas ordem do amor.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Não deixes que a carne comande o teu dia; deixa que a oração marque o ritmo.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "A vigilância de noite e dia é mãe da castidade do coração.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "Foge não só do mal, mas das ocasiões que te fazem fraquejar sem necessidade.",
      autor: "Ditos dos Padres do deserto",
    },
    {
      texto:
        "O corpo é templo do Espírito: trata-o com respeito, não com servidão.",
      autor: "1 Cor 6:19 (espírito monástico)",
    },
  ],
  3: [
    {
      texto:
        "Mais vale dar um punhado com Deus do que acumular tesouros sem descanso na alma.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Quem confia em Deus não aperta a mão até sangrar; abre a palma.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "A avareza fecha a mão e o coração; a esmola abre ambos ao Céu.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "Nada trouxeste, nada levarás: o que importa é o amor com que serviste.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "O dinheiro pode ser servo ou senhor; escolhe servir a Deus com ele.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Generosidade pequena, feita com fé, pesa mais que grandes somas sem Deus.",
      autor: "Tradição monástica",
    },
  ],
  4: [
    {
      texto:
        "A tristeza que leva a Deus cura; a que te fecha nele mesma, pede luz.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Não carregues o mundo inteiro: Cristo já carregou a cruz por ti.",
      autor: "Tradição pastoral monástica",
    },
    {
      texto:
        "Levanta os olhos: a esperança não é sentimento, é encontro com quem te sustenta.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "A acídia mente quando diz que Deus não importa; resiste um dia de cada vez.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Chora se precisas, mas não te afogues: a oração é tábua na tempestade.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "A alegria do Senhor é a tua força — pede-a, ainda que a voz trema.",
      autor: "Ne 8:10 (espírito monástico)",
    },
  ],
  5: [
    {
      texto:
        "A ira entra como convidada e torna-se dona da casa: não lhe abras todas as portas.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Mais vale calar um instante que arrepender-te por um mês.",
      autor: "Abba Poemen (espírito dos Apophthegmata)",
    },
    {
      texto:
        "A mansidão não é fraqueza: é força posta ao serviço da paz.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Quando te levantares contra alguém, lembra-te primeiro do teu próprio coração.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "Perdoa depressa: o sol não deve pôr-se sobre a tua amargura.",
      autor: "Ef 4:26 (espírito patrístico)",
    },
    {
      texto:
        "A paciência desarma o íntimo; a ira só o escurece.",
      autor: "Tradição patrística",
    },
  ],
  6: [
    {
      texto:
        "Levanta-te para orar, ainda que a alma esteja pesada: a fidelidade cura a acídia.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "Não exijas consolação a cada momento: Deus trabalha no silêncio da perseverança.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Um versículo meditado vale mais que um livro folheado com desgosto.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "A preguiça espiritual foge do trabalho de hoje; escolhe o pequeno dever presente.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "Faze o que as tuas mãos acharem — com Deus à frente, sem esperar ânimo perfeito.",
      autor: "Qo 9:10 (espírito monástico)",
    },
    {
      texto:
        "A hora da oração não pede sentimento; pede presença.",
      autor: "Tradição dos Padres do deserto",
    },
  ],
  7: [
    {
      texto:
        "Quem busca aplausos já recebeu a recompensa; quem busca Deus recebe tudo em segredo.",
      autor: "Mt 6:1 (espírito monástico)",
    },
    {
      texto:
        "Esconde as tuas boas obras como quem esconde joias: para o Pai que vê em oculto.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "A vanaglória rouba o fruto da oração: ora sem te mostrares.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Humilha-te e serás exaltado no tempo de Deus, não no relógio dos homens.",
      autor: "Tradição ascética",
    },
    {
      texto:
        "Melhor ser desconhecido na terra e conhecido por Deus.",
      autor: "Tradição patrística",
    },
    {
      texto:
        "Cuida do testemunho interior mais que da imagem exterior.",
      autor: "Tradição dos Padres do deserto",
    },
  ],
  8: [
    {
      texto:
        "Deus resiste aos soberbos e dá graça aos humildes: escolhe o lugar baixo.",
      autor: "Tg 4:6 (espírito monástico)",
    },
    {
      texto:
        "Quanto mais alto te julgas, mais longe estás da verdade sobre ti mesmo.",
      autor: "Tradição dos Padres do deserto",
    },
    {
      texto:
        "A soberba mede os outros para se sentir grande; a humildade mede-se a si pela caridade.",
      autor: "Tradição monástica",
    },
    {
      texto:
        "Aprende de Cristo, que era manso e humilde de coração.",
      autor: "Mt 11:29 (espírito patrístico)",
    },
    {
      texto:
        "Ninguém se eleva por si: quem se exalta será humilhado.",
      autor: "Lc 14:11 (espírito monástico)",
    },
    {
      texto:
        "Servir sem ser notado é escola de verdadeira grandeza.",
      autor: "Tradição ascética",
    },
  ],
};

/**
 * Citação para combinar número da etapa (1–12) com o eixo espiritual (logismoi 1–8).
 */
export function citacaoParaEtapaLogismoi(
  numeroEtapa: number,
  logismoiId: number,
): CitacaoPatristica {
  const n = Math.max(1, Math.min(12, numeroEtapa));
  const id = Math.max(1, Math.min(8, logismoiId));
  const pool =
    CITACOES_POR_LOGISMOI[id] ?? CITACOES_PADRES_DESERTO;
  const i = (n - 1) % pool.length;
  return pool[i];
}
