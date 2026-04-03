/** Frases curtas de reforço (tom dos Padres do deserto / combate espiritual) após concluir etapa. */

const FRASES_POR_LOGISMOI: Record<number, string[]> = {
  1: [
    "Você venceu o batalhão de choque. A porta da alma agora está mais protegida.",
    "Um passo de sobriedade hoje é um muro contra a gula amanhã.",
    "O ventre aprendeu a ouvir outra voz que não a do impulso.",
    "Não foi pouco: foi fidelidade. O deserto reconhece quem persevera.",
    "A razão voltou à sentinelha; guarde esse nome: temperança.",
    "Cada ‘não’ pequeno ensina o corpo a pertencer a Deus.",
  ],
  2: [
    "A vigilância fechou uma brecha; o coração agradece em silêncio.",
    "Hoje a pureza não foi sentimento — foi escolha. Isso é combate santo.",
    "Os olhos aprenderam a buscar outra luz que não a da fantasia.",
    "Castidade é liberdade: você deu um passo nessa direção.",
    "O templo respirou: menos dispersão, mais presença de Deus.",
    "Um limite posto com amor vale mais que mil promessas em vão.",
  ],
  3: [
    "A mão que abre confia; a avareza perdeu uma batalha hoje.",
    "Deus não é devedor: o que você soltou, Ele sabe nomear.",
    "Menos medo de faltar, mais espaço para o Céu no coração.",
    "Generosidade é desarmar o ídolo do ‘meu’ — você desarmou um pouco.",
    "A esmola do coração pesa mais que o cofre trancado.",
    "Confiança cresce onde o aperto do ‘nunca chega’ afrouxa.",
  ],
  4: [
    "A esperança não é sentimento: é âncora. Você fincou uma estaca hoje.",
    "A tristeza não governou o dia inteiro: isso já é vitória.",
    "Levantar os olhos custou — e custar é oração.",
    "O Senhor não despreza o coração atribulado; você O buscou.",
    "Lágrimas oferecidas são água de batismo no deserto interior.",
    "Um passo fora do poço, ainda que trêmulo, é obra da graça.",
  ],
  5: [
    "A mansidão desarmou um raio. A paz agradece.",
    "Silêncio santo vale mais que vitória ruidosa na língua.",
    "Hoje a ira não foi dona da casa: Cristo entrou primeiro.",
    "Perdão parcial já é semente de céu.",
    "O corpo relaxou onde antes só havia tensão de ataque.",
    "Zelo sem ferida: você escolheu o caminho estreito da paciência.",
  ],
  6: [
    "Fidelidade sem consolação é perfume de deserto — Deus cheira.",
    "A acídia perdeu uma hora: você não desistiu do essencial.",
    "Pequeno começo, grande obediência: assim se edifica o muro.",
    "O dever santo feito ‘sem gosto’ ainda é música para os céus.",
    "Um Pai Nosso vencido à preguiça vale legiões.",
    "A oração seca, se é verdadeira, ainda é oração.",
  ],
  7: [
    "Deus viu o que ninguém aplaudiu: isso já é recompensa.",
    "Humildade não é apagar-se — é deixar Deus ser grande em si.",
    "O palco interior apagou uma luz falsa hoje.",
    "Serviço em secreto é moeda que não enferruja.",
    "Menos ‘eu’ na narrativa, mais Espírito no passo.",
    "A vanaglória perdeu um round: glória só a Deus.",
  ],
  8: [
    "O último lugar é o primeiro aos olhos de Deus — você ensaiou isso.",
    "Soberba cedeu terreno; a cruz ganhou espaço.",
    "Correção aceita sem defesa é coroa escondida.",
    "Servir sem brilho próprio é imitar o Mestre que lavou pés.",
    "Humildade não é teoria: é postura — e você mudou a postura hoje.",
    "Menos trono interior, mais trono de Deus no peito.",
  ],
};

const FRASES_GERAIS: string[] = [
  "Você venceu o batalhão de choque. A porta da alma agora está mais protegida.",
  "O deserto não é vazio: é escola. Hoje você provou isso.",
  "Não é pouco: é fidelidade. O Senhor guarda cada passo.",
];

export function fraseReforcoConclusao(
  logismoiId: number,
  numeroEtapa: number,
): string {
  const id = Math.max(1, Math.min(8, logismoiId));
  const n = Math.max(1, Math.min(12, numeroEtapa));
  const pool = FRASES_POR_LOGISMOI[id] ?? FRASES_GERAIS;
  if (pool.length === 0) {
    return FRASES_GERAIS[(n - 1) % FRASES_GERAIS.length];
  }
  return pool[(n - 1) % pool.length];
}
