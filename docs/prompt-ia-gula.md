# Prompt — material completo do logismoi **Gula** (do zero)

Cole o bloco abaixo **inteiro** numa conversa nova com a IA. Ajuste só o que estiver entre `[ ]` se quiser.

---

## Texto do prompt (copiar daqui)

```
Papel: você é redator de conteúdo espiritual para o aplicativo católico “Itinerário da Alma”. O participante percorre até **12 etapas** por logismoi (sem cronograma civil obrigatório: a pessoa escolhe por onde começar e quando continuar), no estilo dos Padres do deserto e da espiritualidade ascética cristã, com linguagem acolhedora, clara e pastoral (adultos leigos).

Tema exclusivo deste pedido: o logismoi **Gula** (grego: **Gastrimargia** — desregramento no comer/beber e, em sentido ampliado, fome desordenada de prazeres que substituem Deus).

Objetivo: produzir DO ZERO o material completo das **12 etapas** do percurso da Gula. Cada etapa deve ser distinta, com progressão lógica (introdução → purificação → consolidação → síntese), sem repetir blocos inteiros entre etapas.

Público: brasileiros; português do Brasil; tom respeitoso, não moralista; citar Escritura e tradição com parcimônia (referências curtas).

FORMATO DE SAÍDA — use somente Markdown. Entregue um documento único com esta estrutura:

# Módulo Gula (Gastrimargia) — Itinerário de 12 etapas

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
- Ancore cada etapa no combate espiritual à Gula: moderação, jejum (onde fizer sentido pastoral), vigilância dos desejos, gratidão, eucaristia, caridade em relação ao corpo e à mesa; evite dietas médicas prescritivas.
- Varie os ângulos: Escritura, vida dos santos (breve), examen da consciência, silêncio, relações (mesa, festas, solidão), consumo digital como “apetite”, etc.
- Não copie texto genérico repetido entre etapas; cada “leitura_texto” e “doutrina_corpo” deve trazer matéria nova.
- Não inclua preâmbulos da IA; comece direto em “# Módulo Gula”.

Observações opcionais do terapeuta (se não houver, escreva “nenhuma”): [EX.: ênfase em eucaristia, ou em recuperação de transtornos alimentares com sensibilidade pastoral]
```

---

## Como usar depois que a IA responder

**Forma mais rápida:** no painel **Terapeuta**, abra **Importar várias etapas de uma vez**, escolha o logismoi **Gula**, cole o documento inteiro (do `# Módulo Gula` até a última etapa) e clique em **Importar etapas**. O sistema separa por `## Etapa 1` … `## Etapa 12` e grava tudo no Supabase (etapas já existentes são atualizadas).

**Alternativa etapa a etapa:** use **Nova etapa** → Logismoi **Gula**, número **1…12**, título = o texto de `### titulo_semana` → **Criar**; depois **Editar** e o bloco **Colar etapa inteira** → **Aplicar ao formulário** → **Salvar**.

Ou copie campo a campo manualmente.

---

## Se a IA disser que é “grande demais” numa só mensagem

Peça em duas etapas:

1. *“Gere só o **índice** das 12 etapas: para cada uma, `titulo_semana` + uma frase de foco.”*
2. Depois: *“Desenvolva com o formato completo apenas a **Etapa 1**.”* — e repita pedindo Etapa 2, 3… até 12.

---

## Referência rápida dos logismoi (só contexto)

| Português | Grego      |
|-----------|------------|
| Gula      | Gastrimargia |
