# Prompt para IA — conteúdo de uma etapa (Markdown)

Cole o bloco abaixo em qualquer IA e preencha os colchetes **uma vez** por solicitação.

---

## Texto do prompt

```
Contexto: App "Itinerário da Alma". Cada participante percorre até **12 etapas** por um dos oito logismoi (tradição dos Padres do deserto): Gula, Luxúria, Avareza, Tristeza, Ira, Acídia, Vanaglória, Soberba. As etapas **não** estão amarradas a um calendário civil fixo: a pessoa pode escolher por onde começar e quando continuar.

Tarefa: Escrever o conteúdo da etapa [NÚMERO_DE_1_A_12] do percurso para o logismoi [NOME_EM_PORTUGUÊS] (grego: [NOME_EM_GREGO]).

Público: adultos em acompanhamento espiritual; tom acolhedor e claro; tradição católica/ascética sem tom acadêmico pesado. Texto em português do Brasil.

FORMATO DE SAÍDA — use somente Markdown (sem JSON). Entregue exatamente estas seções, nesta ordem, com os títulos de cabeçalho indicados (o nome `titulo_semana` é o campo no banco; representa o título desta etapa):

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
(Passo a passo ou lista numerada da prática desta etapa.)

## sinal_progresso_titulo
(Uma linha.)

## sinal_progresso_descricao
(Como a pessoa pode perceber um sinal de crescimento nesta etapa.)

## tipo_fase
(Uma palavra ou frase curta opcional, ex.: purificação — ou escreva "—" se não couber.)

## ordem_aparicao
(Só um número inteiro opcional para ordenar na interface, ex.: 1 — ou "—" se não quiser definir.)

Regras:
- Adapte o conteúdo ao número da etapa e à progressão dentro do mesmo logismoi (evite repetir textos genéricos de outras etapas).
- Não inclua preâmbulos nem comentários fora dessas seções; comece direto em "## titulo_semana".

Observações opcionais do terapeuta: [EX.: ênfase em silêncio, confissão, caridade, etc. ou deixe em branco]
```

---

## Como colar no painel

### Várias etapas de uma vez (recomendado para módulos inteiros)

1. Gere o texto com a IA no formato `## Etapa 1` … `## Etapa 12` (como no prompt da Gula).
2. No painel **Terapeuta**, use o bloco **Importar várias etapas de uma vez**: escolha o logismoi, cole o texto completo e clique em **Importar etapas**. O sistema cria ou atualiza cada etapa (1–12) no Supabase. Linhas antes do primeiro `## Etapa` (ex.: título do módulo) são ignoradas.

### Uma etapa por vez

1. Gere o texto com a IA (saída em Markdown).
2. No painel **Terapeuta** → **Editar** a etapa correspondente, use o bloco **Colar etapa inteira**: cole o documento inteiro (cada seção deve começar com uma linha só com `## nome_do_campo` ou `### nome_do_campo`, ex.: `## titulo_semana`, `## leitura_texto`, …). Clique em **Aplicar ao formulário** para preencher todos os campos de uma vez.
3. Revise os campos; nos blocos longos use **Pré-visualizar** e depois **Salvar**.
4. Se preferir, copie campo a campo manualmente (sem o cabeçalho `##` na linha do título).

---

## Dica

Se a IA agrupar tudo em um único bloco, peça: *"Reformate para que cada seção comece exatamente com `## nome_do_campo` como acima"* e depois use **Colar etapa inteira** → **Aplicar ao formulário** no painel.
