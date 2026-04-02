# Prompt — material completo do logismoi **Vanaglória** (do zero)

Cole o bloco abaixo **inteiro** numa conversa nova com a IA. Ajuste só o que estiver entre `[ ]` se quiser.

---

## Texto do prompt (copiar daqui)

```
Papel: você é redator de conteúdo espiritual para o aplicativo católico “Itinerário da Alma”. O participante percorre até **12 etapas** por logismoi (não são “semanas” nem “dias” fixos no calendário: a pessoa escolhe por onde começar e quando continuar), no estilo dos Padres do deserto e da espiritualidade ascética cristã, com linguagem acolhedora, clara e pastoral (adultos leigos).

Tema exclusivo deste pedido: o logismoi **Vanaglória** (grego no app: **Kenodoxia** — κενοδοξία: glória vã, sede de aplauso e de “ser visto”, espiritualidade performática que busca admiração humana antes do olhar de Deus; em sentido amplo, inclui ostentação de virtudes, comparação constante, hipersensibilidade a críticas e fuga da vida oculta — sem confundir com o reconhecimento legítimo do trabalho bem-feito nem com a alegria simples de servir em comunidade).

Objetivo: produzir DO ZERO o material completo das **12 etapas** do percurso da Vanaglória. Cada etapa deve ser distinta, com progressão lógica (introdução → purificação → consolidação → síntese), sem repetir blocos inteiros entre etapas.

Público: brasileiros; português do Brasil; tom respeitoso, não humilhante: a humildade cristã **não** é autopunição nem falsa modéstia. Cite Escritura e tradição com parcimônia (referências curtas).

FORMATO DE SAÍDA — use somente Markdown. Entregue um documento único com esta estrutura (compatível com o painel **Importar várias etapas de uma vez**):

- Cada etapa começa com **uma linha** `## Etapa N` (N de 1 a 12).
- Dentro de cada etapa, use exatamente os cabeçalhos `###` abaixo (nomes das colunas no banco).
- Linhas **antes** do primeiro `## Etapa 1` podem ser só título do módulo; o sistema ignora o que vier antes do primeiro `## Etapa`.
- Campos: `titulo_semana` = título da etapa (apesar do nome técnico no banco).

# Módulo Vanaglória (Kenodoxia) — Itinerário de 12 etapas

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
- Ancore cada etapa no combate espiritual à Vanaglória: **humildade** como verdade sobre si e sobre Deus, vida oculta e fecunda, oração sem “plateia”, serviço sem rótulo, aceitação serena da própria limitação, louvor a Deus que tira o foco do ego; distingua **vaidade espiritual** de **responsabilidade pública** e de **gratidão** sã por elogios recebidos.
- Varie os ângulos: Escritura, vida dos santos (breve), examen da consciência, redes sociais e validação, competição espiritual, liderança e autoridade sem teatro, silêncio, anonimato do bem, etc.
- Não copie texto genérico repetido entre etapas; cada “leitura_texto” e “doutrina_corpo” deve trazer matéria nova.
- Não inclua preâmbulos da IA; comece direto em “# Módulo Vanaglória”.

Observações opcionais do terapeuta (se não houver, escreva “nenhuma”): [EX.: ênfase em criadores de conteúdo religioso, ou em voluntários visíveis, ou em adolescentes — sempre com linguagem pastora]
```

---

## Como usar depois que a IA responder

**Forma mais rápida:** no painel **Terapeuta**, abra **Importar várias etapas de uma vez**, escolha o logismoi **Vanaglória**, cole o documento inteiro (do `# Módulo Vanaglória` até a última etapa) e clique em **Importar etapas**. O sistema separa por `## Etapa 1` … `## Etapa 12` e grava tudo no Supabase (**etapas já existentes** para o mesmo logismoi são **atualizadas**).

**Alternativa etapa a etapa:** use **Nova etapa** → Logismoi **Vanaglória**, número **1…12**, título = o texto de `### titulo_semana` → **Criar**; depois **Editar** e o bloco **Colar etapa inteira** → **Aplicar ao formulário** → **Salvar**.

Ou copie campo a campo manualmente.

---

## Se a IA disser que é “grande demais” numa só mensagem

Peça em duas etapas:

1. *“Gere só o **índice** das 12 etapas: para cada uma, `titulo_semana` + uma frase de foco.”*
2. Depois: *“Desenvolva com o formato completo apenas a **Etapa 1**.”* — e repita pedindo Etapa 2, 3… até 12.

---

## Referência rápida dos logismoi (só contexto)

| Português   | Grego      |
|-------------|------------|
| Vanaglória  | Kenodoxia  |
