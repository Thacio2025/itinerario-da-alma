/** Pares de placeholders (reflexão + sinal) por logismoi; rodam com o nº da etapa. */

type ParPlaceholder = { reflexao: string; sinal: string };

const POOLS: Record<number, ParPlaceholder[]> = {
  1: [
    {
      reflexao:
        "Qual foi a desculpa mental exata que você desmascarou hoje — aquela frase que o corpo ou a fantasia usou para pedir mais?",
      sinal:
        "Em que momento do dia você sentiu que a razão retomou o comando do ventre, ainda que por pouco tempo?",
    },
    {
      reflexao:
        "Que gatilho externo (hora, cansaço, companhia) mais costuma abrir a porta do desregramento no comer ou no beber?",
      sinal:
        "Descreva um pequeno ato de sobriedade que fez hoje sem dramatizar — só fidelidade ao que decidiu.",
    },
    {
      reflexao:
        "O que o Evangelho ou a doutrina desta etapa confrontou de mais incômodo na sua fome desordenada de prazer?",
      sinal:
        "Onde notou leveza intelectual ou paz depois de resistir a um impulso — mesmo que a tentação tenha voltado depois?",
    },
    {
      reflexao:
        "Que ‘negociação’ a mente fez hoje com a temperança (só desta vez, amanhã eu começo…)?",
      sinal:
        "Que sinal concreto deixou Deus entrar na mesa ou no ritmo do dia — oração, pausa, gratidão?",
    },
    {
      reflexao:
        "Em que ponto o jejum espiritual (de palavras, de telas ou de volume) se cruzou com o jejum do estômago?",
      sinal:
        "Quando sentiu que o desejo não era dono absoluto da próxima hora?",
    },
    {
      reflexao:
        "Qual medo secreto alimenta a gula ou a fuga — tédio, solidão, ansiedade?",
      sinal:
        "Um versículo ou nome de Jesus que repetiu ou quis repetir no meio da luta.",
    },
  ],
  2: [
    {
      reflexao:
        "Que imagem, lembrança ou fantasia mais insistiu hoje — e como você a nomeou diante de Deus, sem fugir?",
      sinal:
        "Em que instante a vigilância dos olhos ou do coração foi para você um ato de amor a Deus e ao próximo?",
    },
    {
      reflexao:
        "Onde a pureza de intenção foi testada: solidão, cansaço, proximidade, telas?",
      sinal:
        "Um limite concreto que pôs (tempo, lugar, conversa) para proteger a castidade do coração.",
    },
    {
      reflexao:
        "Que ‘direito’ o corpo reclamou com voz alta — e que resposta cristã você ensaiou?",
      sinal:
        "Sinal de paz ou de vergonha sã depois de ter escolhido o bem menor do mal?",
    },
    {
      reflexao:
        "Como esta etapa ajudou a ver o desejo não como inimigo total, mas como energia a ordenar?",
      sinal:
        "Momento de oração ou de sacramento em que sentiu o apoio da graça na fragilidade.",
    },
    {
      reflexao:
        "Que conversa interior precisa mudar para que o templo do Espírito não vire cenário de dispersão?",
      sinal:
        "Pequeno jejum de olhar ou de palavra que custou e valeu a pena.",
    },
    {
      reflexao:
        "Quem ou o que hoje foi ‘ídolo fácil’ no lugar do amor fiel?",
      sinal:
        "Onde a mansidão venceu a precipitação — ainda que só no último segundo?",
    },
  ],
  3: [
    {
      reflexao:
        "Que pensamento de escassez ou de ‘nunca é suficiente’ voltou hoje a apertar o coração?",
      sinal:
        "Um gesto de largueza (tempo, dinheiro, perdão) que foi contra a tendência de acumular segurança só para si.",
    },
    {
      reflexao:
        "Em que situação você mediu demais o outro ou a si mesmo pela conta bancária interior?",
      sinal:
        "Momento em que confiar em Deus pesou mais que calcular o risco.",
    },
    {
      reflexao:
        "Qual medo de perder o controle financeiro ou social alimentou a avareza hoje?",
      sinal:
        "Sinal de generosidade anônima ou silenciosa que fez sem buscar retorno.",
    },
    {
      reflexao:
        "O que esta etapa desafia a soltar para que a mão abra a palma da esmola espiritual?",
      sinal:
        "Onde notou que ‘bastava’ o que Deus já tinha dado neste dia?",
    },
    {
      reflexao:
        "Que promessa de Deus precisa ocupar o lugar do ‘e se faltar?’",
      sinal:
        "Decisão concreta de partilha ou de confiança que adia o ‘só mais um pouco guardado’.",
    },
    {
      reflexao:
        "Como a avareza se disfarçou de prudência hoje?",
      sinal:
        "Um agradecimento espontâneo por um bem não monetário que recebeu.",
    },
  ],
  4: [
    {
      reflexao:
        "Qual tristeza hoje foi sã (luto, compaixão) e qual parecia mais acídia disfarçada de cansaço?",
      sinal:
        "Momento em que levantou os olhos — literal ou interiormente — para algo que não fosse o próprio buraco.",
    },
    {
      reflexao:
        "Que pensamento repetiu mais vezes: ‘não adianta’ ou ‘Deus está aqui’?",
      sinal:
        "Pequeno ato de bondade que fez sem sentir vontade, e mesmo assim foi oferta.",
    },
    {
      reflexao:
        "Onde o peso do mundo fechou a oração — e o que você fez com essa resistência?",
      sinal:
        "Sinal de esperança mínima: uma palavra, um salmo, um nome de Jesus que ficou.",
    },
    {
      reflexao:
        "Que memória ou culpa tentou roubar o dia inteiro?",
      sinal:
        "Onde a mansidão com a própria fraqueza foi mais forte que o veredito severo.",
    },
    {
      reflexao:
        "Como Cristo na tristeza (Getsemani) ilumina a sua sem fingir que a dor não existe?",
      sinal:
        "Choro ou silêncio oferecidos sem exigir consolação imediata.",
    },
    {
      reflexao:
        "Que ‘não’ você precisou dizer à vontade de desistir do combate espiritual?",
      sinal:
        "Luz breve — um versículo, um amigo, um sol — que Deus encaixou no meio do nevoeiro.",
    },
  ],
  5: [
    {
      reflexao:
        "Qual foi a palavra ou o gesto que quase saiu em fúria — e o que a segurou ou não?",
      sinal:
        "Instante em que escolheu calar, orar primeiro ou pedir tempo antes de ferir.",
    },
    {
      reflexao:
        "Quem ou o que hoje merecia, aos seus olhos, ‘uma resposta na hora’?",
      sinal:
        "Onde a paciência foi caridade disfarçada de tolerância?",
    },
    {
      reflexao:
        "Que injustiça real ou imaginária reacendeu a ira — como você a levou ao Senhor?",
      sinal:
        "Sinal de perdão parcial (um passo) mesmo sem sentimento de perdão total.",
    },
    {
      reflexao:
        "Como a mansidão de Cristo confronta o seu ‘direito’ de explodir?",
      sinal:
        "Corpo que relaxou (ombros, mandíbula) quando decidiu não alimentar a chama.",
    },
    {
      reflexao:
        "Que hábito de linguagem alimenta a ira — ironia, corte, silêncio punidor?",
      sinal:
        "Pedido de desculpas dado ou recebido que mudou o clima de um ambiente.",
    },
    {
      reflexao:
        "Onde a ira santificável (zelo) se confundiu com a ira destrutiva?",
      sinal:
        "Momento em que rezou pelo ‘adversário’ interior ou exterior.",
    },
  ],
  6: [
    {
      reflexao:
        "Qual tarefa espiritual hoje pareceu ‘sem gosto’ — leitura, oração, trabalho honesto?",
      sinal:
        "Cinco minutos feitos com fidelidade, sem esperar consolação nem emoção.",
    },
    {
      reflexao:
        "O que a acídia sussurrou para você adiar o essencial: ‘depois’, ‘não é a hora’, ‘não sou capaz’?",
      sinal:
        "Onde começou pequeno e terminou — ainda que sem brilho — por amor a Deus?",
    },
    {
      reflexao:
        "Que distração substituiu a presença a Deus com mais facilidade que o pecado grave?",
      sinal:
        "Sinal de que venceu a primeira resistência ao levantar para orar ou ao abrir a Bíblia.",
    },
    {
      reflexao:
        "Como esta etapa ajuda a ver que a luta não é pelo humor, mas pela fidelidade?",
      sinal:
        "Hora do dia em que escolheu o dever santo antes do conforto espiritual.",
    },
    {
      reflexao:
        "Que imagem de Deus a acídia distorce (distante, indiferente, exigente demais)?",
      sinal:
        "Versículo ou jaculatória que repetiu como tábua em mar revolto.",
    },
    {
      reflexao:
        "Onde o tédio espiritual pediu fugas — telas, comida, sono em excesso?",
      sinal:
        "Pequeno jejum de fuga que abriu espaço para um Pai Nosso inteiro.",
    },
  ],
  7: [
    {
      reflexao:
        "Onde hoje você buscou ser visto — palavra, postura, narrativa sobre si mesmo?",
      sinal:
        "Ato bom feito em oculto ou sem explicar a ninguém o mérito.",
    },
    {
      reflexao:
        "Que elogio ou crítica mais mexeu com o seu equilíbrio interior?",
      sinal:
        "Momento em que louvou a Deus sem acrescentar o seu nome na história.",
    },
    {
      reflexao:
        "Como a vanaglória se disfarçou de ‘testemunho’ ou de ‘serviço’?",
      sinal:
        "Escolha de último lugar, silêncio ou delegação que feriu o ego e libertou.",
    },
    {
      reflexao:
        "Que comparação com outro feriu mais que ajudou?",
      sinal:
        "Gratidão genuína pelo dom do outro sem inveja encoberta.",
    },
    {
      reflexao:
        "O que esta etapa pede para esconder diante do Pai que vê em secreto?",
      sinal:
        "Sinal de que a oração foi refúgio, não palco.",
    },
    {
      reflexao:
        "Qual título você não quer perder — e que Jesus pede para largar?",
      sinal:
        "Serviço simples que ninguém aplaudiu e mesmo assim foi oferta.",
    },
  ],
  8: [
    {
      reflexao:
        "Onde hoje você se colocou acima — julgamento, ironia, correção sem mansidão?",
      sinal:
        "Momento em que pediu conselho ou obedeceu sem discutir o próprio critério.",
    },
    {
      reflexao:
        "Que ‘eu sei melhor’ quase governou uma conversa ou uma decisão?",
      sinal:
        "Atitude de último, de quem lava pés, mesmo pequena.",
    },
    {
      reflexao:
        "Como a soberba espiritual se escondeu sob roupas de zelo ou de pureza de doutrina?",
      sinal:
        "Onde aceitou correção ou ignorância sem se justificar por dez minutos.",
    },
    {
      reflexao:
        "Que vitória espiritual corre o risco de virar troféu em vez de gratidão?",
      sinal:
        "Sinal de que colocou Deus no centro da narrativa, não o ‘eu convertido’.",
    },
    {
      reflexao:
        "Quem Deus colocou hoje como mestre de humildade — fraco, criança, inimigo?",
      sinal:
        "Pedido de bênção por quem normalmente você desprezaria intelectual ou moralmente.",
    },
    {
      reflexao:
        "O que esta etapa corta do pedestal onde você ainda gosta de subir?",
      sinal:
        "Silêncio santo depois de ter razão e não usar a razão como chicote.",
    },
  ],
};

const FALLBACK: ParPlaceholder = {
  reflexao:
    "O que esta etapa despertou em si de mais concreto — sem devocional vago?",
  sinal:
    "Que mudança notou na oração, nas relações ou na disposição interior, ainda que pequena?",
};

export function obterPlaceholdersReflexaoEtapa(
  logismoiId: number,
  numeroEtapa: number,
): ParPlaceholder {
  const id = Math.max(1, Math.min(8, logismoiId));
  const n = Math.max(1, Math.min(12, numeroEtapa));
  const pool = POOLS[id] ?? [];
  if (pool.length === 0) return FALLBACK;
  return pool[(n - 1) % pool.length];
}
