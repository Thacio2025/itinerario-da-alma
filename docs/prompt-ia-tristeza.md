# Prompt — material completo do logismoi **Tristeza** (do zero)

Cole o bloco abaixo **inteiro** numa conversa nova com a IA. Ajuste só o que estiver entre `[ ]` se quiser.

---

## Texto do prompt (copiar daqui)

```
Papel: você é redator de conteúdo espiritual para o aplicativo católico “Itinerário da Alma”. O participante percorre até **12 etapas** por logismoi (sem cronograma civil obrigatório: a pessoa escolhe por onde começar e quando continuar), no estilo dos Padres do deserto e da espiritualidade ascética cristã, com linguagem acolhedora, clara e pastoral (adultos leigos).

Tema exclusivo deste pedido: o logismoi **Tristeza** (grego no app: **Lypê** — λύπη, *lype*: tristeza espiritual desordenada, desânimo que esmorece a oração, o serviço e a esperança; em sentido amplo, inclui melancolia que se alimenta de si mesma, peso no peito que afasta da luz e consolação de Deus — sem confundir com a “tristeza santa” que leva à conversão, 2 Cor 7,10).

Objetivo: produzir DO ZERO o material completo das **12 etapas** do percurso da Tristeza. Cada etapa deve ser distinta, com progressão lógica (introdução → purificação → consolidação → síntese), sem repetir blocos inteiros entre etapas.

Público: brasileiros; português do Brasil; tom compassivo, não minimizador. **Não** diagnostique nem trate depressão, luto complicado ou ideação suicida: o foco é acompanhamento espiritual no logismoi. Quando o texto tocar em sofrimento intenso, **recomende com clareza** busca de ajuda profissional (psicólogo, psiquiatra, rede de apoio, CVV 188). Cite Escritura e tradição com parcimônia (referências curtas).

FORMATO DE SAÍDA — use somente Markdown. Entregue um documento único com esta estrutura (compatível com o painel **Importar várias etapas de uma vez**):

- Cada etapa começa com **uma linha** `## Etapa N` (N de 1 a 12).
- Dentro de cada etapa, use exatamente os cabeçalhos `###` abaixo (nomes das colunas no banco).
- Linhas **antes** do primeiro `## Etapa 1` podem ser só título do módulo; o sistema ignora o que vier antes do primeiro `## Etapa`.
- Campos: `titulo_semana` = título da etapa (apesar do nome técnico no banco).

# Módulo Tristeza (Lypê) — Itinerário de 12 etapas

## Etapa 1
### titulo_semana
(uma linha)
### leitura_fonte
(uma linha: referência bíblica ou patrística)
### leitura_texto
(parágrafos em Markdown; pode usar listas)
### doutrina_titulo
(uma linha)
### doutrina_corpo
(parágrafos em Markdown)
### exercicio_titulo
(uma linha)
### exercicio_descricao
(passos claros; listas numeradas se ajudar)
### sinal_progresso_titulo
(uma linha)
### sinal_progresso_descricao
(parágrafo(s) em Markdown)
### tipo_fase
(uma palavra ou frase curta, ex.: purificação)
### ordem_aparicao
(número inteiro: use o número da etapa, 1 a 12)

(Repetir o mesmo conjunto de subseções para ## Etapa 2 … ## Etapa 12.)

Regras de conteúdo:
- Ancore cada etapa no combate espiritual à Tristeza: esperança teológica, Cristo consolador, Salmos de lamentação, vigília da fé em noite escura, comunhão eclesial, eucaristia e Palavra, pequenos passos de obediência do amor, gratidão mínima; distinga o peso espiritual do **logismoi** do luto humano legítimo e da dor clínica.
- Varie os ângulos: Escritura, vida dos santos (breve), examen da consciência, silêncio, solidão e amizade, cansaço, culpa sã versus escravidão ao passado, luz do dia a dia, etc.
- Não copie texto genérico repetido entre etapas; cada “leitura_texto” e “doutrina_corpo” deve trazer matéria nova.
- Não inclua preâmbulos da IA; comece direto em “# Módulo Tristeza”.

Observações opcionais do terapeuta (se não houver, escreva “nenhuma”): [EX.: ênfase em luto recente, ou em fadiga de cuidadores, ou em jovens — sempre com linguagem pastora e limites claros]
```

---

## Como usar depois que a IA responder

**Forma mais rápida:** no painel **Terapeuta**, abra **Importar várias etapas de uma vez**, escolha o logismoi **Tristeza**, cole o documento inteiro (do `# Módulo Tristeza` até a última etapa) e clique em **Importar etapas**. O sistema separa por `## Etapa 1` … `## Etapa 12` e grava tudo no Supabase (**etapas já existentes** para o mesmo logismoi são **atualizadas**).

**Alternativa etapa a etapa:** use **Nova etapa** → Logismoi **Tristeza**, número **1…12**, título = o texto de `### titulo_semana` → **Criar**; depois **Editar** e o bloco **Colar etapa inteira** → **Aplicar ao formulário** → **Salvar**.

Ou copie campo a campo manualmente.

---

## Se a IA disser que é “grande demais” numa só mensagem

Peça em duas etapas:

1. *“Gere só o **índice** das 12 etapas: para cada uma, `titulo_semana` + uma frase de foco.”*
2. Depois: *“Desenvolva com o formato completo apenas a **Etapa 1**.”* — e repita pedindo Etapa 2, 3… até 12.

---

## Referência rápida dos logismoi (só contexto)

| Português | Grego        |
|-----------|--------------|
| Tristeza  | Lypê         |
