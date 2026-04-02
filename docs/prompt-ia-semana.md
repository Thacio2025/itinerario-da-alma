# Prompt para IA — conteúdo de uma semana (Markdown)

Cole o bloco abaixo em qualquer IA e preencha os colchetes **uma vez** por solicitação.

---

## Texto do prompt

```
Contexto: App "Itinerário da Alma". Cada participante percorre até 12 semanas por um dos oito logismoi (tradição dos Padres do deserto): Gula, Luxúria, Avareza, Tristeza, Ira, Acídia, Vanaglória, Soberba.

Tarefa: Escrever o conteúdo da semana [NÚMERO_DE_1_A_12] do percurso para o logismoi [NOME_EM_PORTUGUÊS] (grego: [NOME_EM_GREGO]).

Público: adultos em acompanhamento espiritual; tom acolhedor e claro; tradição católica/ascética sem tom acadêmico pesado. Texto em português do Brasil.

FORMATO DE SAÍDA — use somente Markdown (sem JSON). Entregue exatamente estas seções, nesta ordem, com os títulos de cabeçalho indicados:

## titulo_semana
(Uma linha: título curto e memorável.)

## leitura_fonte
(Uma linha: referência — ex. Escritura, patrística, autor.)

## leitura_texto
(1–3 parágrafos para leitura meditativa. Use parágrafos normais ou listas se fizer sentido.)

## doutrina_titulo
(Uma linha.)

## doutrina_corpo
(Vários parágrafos de ensino sintético.)

## exercicio_titulo
(Uma linha.)

## exercicio_descricao
(Passo a passo ou lista numerada da prática da semana.)

## sinal_progresso_titulo
(Uma linha.)

## sinal_progresso_descricao
(Como a pessoa pode perceber um sinal de crescimento nesta semana.)

## tipo_fase
(Uma palavra ou frase curta opcional, ex.: purificação — ou escreva "—" se não couber.)

## ordem_aparicao
(Só um número inteiro opcional para ordenar na interface, ex.: 1 — ou "—" se não quiser definir.)

Regras:
- Adapte o conteúdo ao número da semana e à progressão dentro do mesmo logismoi (evite repetir textos genéricos de outras semanas).
- Não inclua preâmbulos nem comentários fora dessas seções; comece direto em "## titulo_semana".

Observações opcionais do terapeuta: [EX.: ênfase em silêncio, confissão, caridade, etc. ou deixe em branco]
```

---

## Como colar no painel

1. Gere o texto com a IA (saída em Markdown).
2. No painel **Terapeuta** → **Editar** a semana correspondente:
   - Copie o trecho sob `## titulo_semana` para o campo **Título da semana** (texto puro, sem o `##`).
   - Faça o mesmo para cada campo: **leitura_fonte**, **leitura_texto** (Markdown), **doutrina_titulo**, **doutrina_corpo** (Markdown), etc.
3. Campos longos suportam **Markdown**; use **Pré-visualizar** no formulário para conferir antes de salvar.

---

## Dica

Se a IA agrupar tudo em um único bloco, peça: *"Reformate para que cada seção comece exatamente com `## nome_do_campo` como acima"* e depois copie campo a campo.
