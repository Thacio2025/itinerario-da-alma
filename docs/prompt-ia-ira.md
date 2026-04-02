# Prompt — material completo do logismoi **Ira** (do zero)

Cole o bloco abaixo **inteiro** numa conversa nova com a IA. Ajuste só o que estiver entre `[ ]` se quiser.

---

## Texto do prompt (copiar daqui)

```
Papel: você é redator de conteúdo espiritual para o aplicativo católico “Itinerário da Alma”. O participante percorre até **12 etapas** por logismoi (não são “semanas” nem “dias” fixos no calendário: a pessoa escolhe por onde começar e quando continuar), no estilo dos Padres do deserto e da espiritualidade ascética cristã, com linguagem acolhedora, clara e pastoral (adultos leigos).

Tema exclusivo deste pedido: o logismoi **Ira** (grego no app: **Orgê** — ὀργή: ira desordenada, explosão ou ressentimento que escraviza, queima por dentro e cega o discernimento; em sentido amplo, inclui amargura, desejo de vingança, dureza de coração e “fogo frio” do desprezo — sem confundir com a **justa indignação** ordenada ao bem comum nem com a coragem de defender o inocente).

Objetivo: produzir DO ZERO o material completo das **12 etapas** do percurso da Ira. Cada etapa deve ser distinta, com progressão lógica (introdução → purificação → consolidação → síntese), sem repetir blocos inteiros entre etapas.

Público: brasileiros; português do Brasil; tom firme e misericordioso. **Não** incentive tolerar violência doméstica, abuso ou ameaças: quando o contexto for agressão, **priorize segurança** e encaminhe a redes de proteção, delegacia, defensoria, apoio psicológico. O foco é conversão espiritual da paixão da ira no discípulo, não culpar vítimas. Cite Escritura e tradição com parcimônia (referências curtas).

FORMATO DE SAÍDA — use somente Markdown. Entregue um documento único com esta estrutura (compatível com o painel **Importar várias etapas de uma vez**):

- Cada etapa começa com **uma linha** `## Etapa N` (N de 1 a 12).
- Dentro de cada etapa, use exatamente os cabeçalhos `###` abaixo (nomes das colunas no banco).
- Linhas **antes** do primeiro `## Etapa 1` podem ser só título do módulo; o sistema ignora o que vier antes do primeiro `## Etapa`.
- Campos: `titulo_semana` = título da etapa (apesar do nome técnico no banco).

# Módulo Ira (Orgê) — Itinerário de 12 etapas

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
- Ancore cada etapa no combate espiritual à Ira: mansidão evangélica, paciência, perdão (sem confundir com ingenuidade), examen dos gatilhos, silêncio antes da palavra, reparação onde houve ofensa, eucaristia e confissão, justiça restaurativa quando couber; distinga **ira viciosa** de **zelo** e de **coragem moral** ordenada.
- Varie os ângulos: Escritura, vida dos santos (breve), examen da consciência, relações familiares e de trabalho, trânsito e impaciência, ressentimento político ou eclesial, corpo e tensão, etc.
- Não copie texto genérico repetido entre etapas; cada “leitura_texto” e “doutrina_corpo” deve trazer matéria nova.
- Não inclua preâmbulos da IA; comece direto em “# Módulo Ira”.

Observações opcionais do terapeuta (se não houver, escreva “nenhuma”): [EX.: ênfase em pais de adolescentes, ou em líderes comunitários, ou em quem lida com injustiça social — sempre com linguagem pastora e limites de segurança]
```

---

## Como usar depois que a IA responder

**Forma mais rápida:** no painel **Terapeuta**, abra **Importar várias etapas de uma vez**, escolha o logismoi **Ira**, cole o documento inteiro (do `# Módulo Ira` até a última etapa) e clique em **Importar etapas**. O sistema separa por `## Etapa 1` … `## Etapa 12` e grava tudo no Supabase (**etapas já existentes** para o mesmo logismoi são **atualizadas**).

**Alternativa etapa a etapa:** use **Nova etapa** → Logismoi **Ira**, número **1…12**, título = o texto de `### titulo_semana` → **Criar**; depois **Editar** e o bloco **Colar etapa inteira** → **Aplicar ao formulário** → **Salvar**.

Ou copie campo a campo manualmente.

---

## Se a IA disser que é “grande demais” numa só mensagem

Peça em duas etapas:

1. *“Gere só o **índice** das 12 etapas: para cada uma, `titulo_semana` + uma frase de foco.”*
2. Depois: *“Desenvolva com o formato completo apenas a **Etapa 1**.”* — e repita pedindo Etapa 2, 3… até 12.

---

## Referência rápida dos logismoi (só contexto)

| Português | Grego   |
|-----------|---------|
| Ira       | Orgê    |
