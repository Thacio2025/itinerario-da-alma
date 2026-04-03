# Prompt — material completo do logismoi **Acídia** (do zero)

Cole o bloco abaixo **inteiro** numa conversa nova com a IA. Ajuste só o que estiver entre `[ ]` se quiser.

---

## Texto do prompt (copiar daqui)

```
Papel: você é redator de conteúdo espiritual para o aplicativo católico “Itinerário da Alma”. O participante percorre até **12 etapas** por logismoi (sem cronograma civil obrigatório: a pessoa escolhe por onde começar e quando continuar), no estilo dos Padres do deserto e da espiritualidade ascética cristã, com linguagem acolhedora, clara e pastoral (adultos leigos).

Tema exclusivo deste pedido: o logismoi **Acídia** (grego no app: **Akêdia** — ἀκηδία: acídia, “tédio espiritual”, desgosto da luta interior, fuga da oração e das obrigações do amor; em sentido amplo, inclui inércia do coração, dispersão, “demônio do meio-dia” (tradição dos Padres), vontade de estar em qualquer lugar menos onde Deus chama — sem reduzir a Acídia a pura preguiça física ou a falta de sono).

Objetivo: produzir DO ZERO o material completo das **12 etapas** do percurso da Acídia. Cada etapa deve ser distinta, com progressão lógica (introdução → purificação → consolidação → síntese), sem repetir blocos inteiros entre etapas.

Público: brasileiros; português do Brasil; tom respeitoso, não moralista. **Não** confunda Acídia com depressão clínica ou transtornos que exigem tratamento: quando houver apatia, desconforto persistente ou ideação de morte, **recomende ajuda profissional** (psicólogo, psiquiatra, CVV 188). O foco é a luta espiritual do **logismoi** e a recuperação do zelo. Cite Escritura e tradição com parcimônia (referências curtas).

FORMATO DE SAÍDA — use somente Markdown. Entregue um documento único com esta estrutura (compatível com o painel **Importar várias etapas de uma vez**):

- Cada etapa começa com **uma linha** `## Etapa N` (N de 1 a 12).
- Dentro de cada etapa, use exatamente os cabeçalhos `###` abaixo (nomes das colunas no banco).
- Linhas **antes** do primeiro `## Etapa 1` podem ser só título do módulo; o sistema ignora o que vier antes do primeiro `## Etapa`.
- Campos: `titulo_semana` = título da etapa (apesar do nome técnico no banco).

# Módulo Acídia (Akêdia) — Itinerário de 12 etapas

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
- Ancore cada etapa no combate espiritual à Acídia: **zelo** moderado, perseverança, constância na oração mesmo “sem gosto”, estabilidade (estabilidade monástica como imagem), trabalho bem feito como serviço a Deus, descanso legítimo versus fuga, eucaristia e Palavra, pequenos compromissos cumpridos; distinga **ociosidade** espiritual de **descanso** sábio e de **fadiga** humana.
- Varie os ângulos: Escritura, vida dos santos (breve), examen da consciência, silêncio versus dispersão digital, rotina e monotonia, vocação no cotidiano, comunidade que sustenta, etc.
- Não copie texto genérico repetido entre etapas; cada “leitura_texto” e “doutrina_corpo” deve trazer matéria nova.
- Não inclua preâmbulos da IA; comece direto em “# Módulo Acídia”.

Observações opcionais do terapeuta (se não houver, escreva “nenhuma”): [EX.: ênfase em estudantes, ou em pais sobrecarregados, ou em ministérios — sempre com linguagem pastora e limites claros]
```

---

## Como usar depois que a IA responder

**Forma mais rápida:** no painel **Terapeuta**, abra **Importar várias etapas de uma vez**, escolha o logismoi **Acídia**, cole o documento inteiro (do `# Módulo Acídia` até a última etapa) e clique em **Importar etapas**. O sistema separa por `## Etapa 1` … `## Etapa 12` e grava tudo no Supabase (**etapas já existentes** para o mesmo logismoi são **atualizadas**).

**Alternativa etapa a etapa:** use **Nova etapa** → Logismoi **Acídia**, número **1…12**, título = o texto de `### titulo_semana` → **Criar**; depois **Editar** e o bloco **Colar etapa inteira** → **Aplicar ao formulário** → **Salvar**.

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
| Acídia    | Akêdia       |
