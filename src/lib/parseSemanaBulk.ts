/** Campos da tabela `itinerario_semanas` (exceto id, logismoi_id, numero_semana, timestamps). */
export const SEMANA_BULK_KEYS = [
  "titulo_semana",
  "leitura_fonte",
  "leitura_texto",
  "doutrina_titulo",
  "doutrina_corpo",
  "exercicio_titulo",
  "exercicio_descricao",
  "sinal_progresso_titulo",
  "sinal_progresso_descricao",
  "tipo_fase",
  "ordem_aparicao",
] as const;

export type SemanaBulkKey = (typeof SEMANA_BULK_KEYS)[number];

/** Sinônimos que a IA pode usar → nome da coluna */
const ALIASES: Record<string, SemanaBulkKey> = {
  titulo: "titulo_semana",
  titulo_da_semana: "titulo_semana",
  titulo_etapa: "titulo_semana",
  titulo_da_etapa: "titulo_semana",
  leitura: "leitura_texto",
  fonte: "leitura_fonte",
  doutrina: "doutrina_corpo",
  exercicio: "exercicio_descricao",
  sinal: "sinal_progresso_descricao",
  sinal_progresso: "sinal_progresso_descricao",
  fase: "tipo_fase",
  ordem: "ordem_aparicao",
};

function normalizeKey(raw: string): SemanaBulkKey | null {
  const k = raw.trim().toLowerCase().replace(/\s+/g, "_");
  if ((SEMANA_BULK_KEYS as readonly string[]).includes(k)) {
    return k as SemanaBulkKey;
  }
  return ALIASES[k] ?? null;
}

export type ParseSemanaBulkResult = {
  /** Valores reconhecidos (string; ordem_aparicao depois vira número) */
  fields: Partial<Record<SemanaBulkKey, string>>;
  /** Cabeçalhos ##/### que não mapearam para coluna */
  unknownHeaders: string[];
};

/**
 * Interpreta um texto colado com seções `## nome_campo` ou `### nome_campo`
 * (uma linha só com o título). O conteúdo de cada seção vai até o próximo cabeçalho.
 */
export function parseSemanaBulkPaste(raw: string): ParseSemanaBulkResult {
  const fields: Partial<Record<SemanaBulkKey, string>> = {};
  const unknownHeaders: string[] = [];

  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { fields, unknownHeaders };
  }

  const lines = text.split("\n");
  type Chunk = { key: string; lines: string[] };
  const chunks: Chunk[] = [];
  let current: Chunk | null = null;

  const headerRe = /^#{2,3}\s+([a-zA-Z0-9_\sáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]+?)\s*:?\s*$/;

  for (const line of lines) {
    const m = line.match(headerRe);
    if (m) {
      const rawKey = m[1].trim().replace(/\s+/g, "_");
      if (current) chunks.push(current);
      current = { key: rawKey, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) chunks.push(current);

  for (const { key: rawKey, lines } of chunks) {
    const nk = normalizeKey(rawKey);
    const body = lines.join("\n").trim();
    if (!nk) {
      unknownHeaders.push(rawKey);
      continue;
    }
    fields[nk] = body;
  }

  return { fields, unknownHeaders };
}

/** Converte `ordem_aparicao` string em número ou null */
export function parseOrdemAparicao(s: string | undefined): number | null {
  if (s == null || !String(s).trim()) return null;
  const t = String(s).trim();
  if (t === "—" || t === "-" || t.toLowerCase() === "null") return null;
  const n = Number.parseInt(t, 10);
  return Number.isFinite(n) ? n : null;
}

/** Linha `## Etapa N` ou `## Semana N` (nível 2) — separa blocos; `###` não dispara. */
const ETAPA_HEADER_RE = /^##\s+(?:Etapa|Semana)\s*(\d{1,2})\b/i;

export type EtapaMultiItem = {
  numeroEtapa: number;
  fields: Partial<Record<SemanaBulkKey, string>>;
  unknownHeaders: string[];
};

export type ParseMultiEtapasDocumentResult = {
  etapas: EtapaMultiItem[];
  warnings: string[];
  errors: string[];
  /** true quando não havia `## Etapa N` e foi usado um único bloco */
  singleBlockFallback: boolean;
};

function splitByEtapaHeaders(raw: string): { numero: number; body: string }[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: { numero: number; body: string }[] = [];
  let curNum: number | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (curNum == null) return;
    blocks.push({ numero: curNum, body: buf.join("\n").trim() });
    buf = [];
  };

  for (const line of lines) {
    const m = line.match(ETAPA_HEADER_RE);
    if (m) {
      const n = Number.parseInt(m[1], 10);
      if (Number.isFinite(n) && n >= 1 && n <= 12) {
        flush();
        curNum = n;
        continue;
      }
    }
    if (curNum != null) buf.push(line);
  }
  flush();
  return blocks;
}

/**
 * Várias etapas: cada uma começa com `## Etapa N` ou `## Semana N` (1–12), depois
 * `### titulo_semana`, etc. (igual ao colar de uma etapa).
 * Um único bloco sem esses cabeçalhos: interpreta o texto inteiro como **uma** etapa
 * (número vindo de `ordem_aparicao` ou 1).
 */
export function parseMultiEtapasDocument(raw: string): ParseMultiEtapasDocumentResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) {
    errors.push("Texto vazio.");
    return { etapas: [], warnings, errors, singleBlockFallback: false };
  }

  const rawBlocks = splitByEtapaHeaders(text);
  if (rawBlocks.length > 0) {
    const byNum = new Map<number, string>();
    for (const b of rawBlocks) {
      if (byNum.has(b.numero)) {
        warnings.push(
          `Etapa ${b.numero} aparece mais de uma vez no texto; usamos a última ocorrência.`,
        );
      }
      byNum.set(b.numero, b.body);
    }
    const etapas: EtapaMultiItem[] = [];
    for (const [numeroEtapa, body] of [...byNum.entries()].sort((a, b) => a[0] - b[0])) {
      const parsed = parseSemanaBulkPaste(body);
      if (!parsed.fields.titulo_semana?.trim()) {
        errors.push(`Etapa ${numeroEtapa}: falta conteúdo em titulo_semana.`);
        continue;
      }
      etapas.push({
        numeroEtapa,
        fields: parsed.fields,
        unknownHeaders: parsed.unknownHeaders,
      });
    }
    if (etapas.length === 0 && errors.length === 0) {
      errors.push("Nenhuma etapa válida (cada bloco precisa de titulo_semana).");
    }
    return { etapas, warnings, errors, singleBlockFallback: false };
  }

  const single = parseSemanaBulkPaste(text);
  const reconhecidos = SEMANA_BULK_KEYS.filter((k) => single.fields[k] !== undefined);
  if (reconhecidos.length === 0) {
    errors.push(
      "Nenhuma etapa encontrada. Use linhas `## Etapa 1`, `## Etapa 2`, … (cada uma seguida de `### titulo_semana`, etc.) ou um único bloco com `## titulo_semana` e os demais campos.",
    );
    return { etapas: [], warnings, errors, singleBlockFallback: false };
  }
  if (!single.fields.titulo_semana?.trim()) {
    errors.push("Falta titulo_semana no texto.");
    return { etapas: [], warnings, errors, singleBlockFallback: false };
  }
  let num = parseOrdemAparicao(single.fields.ordem_aparicao);
  if (num == null || num < 1 || num > 12) num = 1;
  warnings.push(
    "Sem `## Etapa N` no texto: importando **uma** etapa (número da ordem_aparicao ou 1). Para importar as 12 de uma vez, use `## Etapa 1` … `## Etapa 12` no documento da IA.",
  );
  return {
    etapas: [
      {
        numeroEtapa: num,
        fields: single.fields,
        unknownHeaders: single.unknownHeaders,
      },
    ],
    warnings,
    errors,
    singleBlockFallback: true,
  };
}

/** Payload para insert/update em `itinerario_semanas` (titulo_semana obrigatório). */
export function buildItinerarioSemanaUpsertPayload(
  logismoiId: number,
  numeroEtapa: number,
  fields: Partial<Record<SemanaBulkKey, string>>,
): Record<string, unknown> | null {
  const titulo = fields.titulo_semana?.trim();
  if (!titulo) return null;

  return {
    logismoi_id: logismoiId,
    numero_semana: numeroEtapa,
    titulo_semana: titulo.slice(0, 255),
    leitura_fonte: fields.leitura_fonte?.trim() || null,
    leitura_texto: fields.leitura_texto?.trim() || null,
    doutrina_titulo: fields.doutrina_titulo?.trim() || null,
    doutrina_corpo: fields.doutrina_corpo?.trim() || null,
    exercicio_titulo: fields.exercicio_titulo?.trim() || null,
    exercicio_descricao: fields.exercicio_descricao?.trim() || null,
    sinal_progresso_titulo: fields.sinal_progresso_titulo?.trim() || null,
    sinal_progresso_descricao: fields.sinal_progresso_descricao?.trim() || null,
    tipo_fase: fields.tipo_fase?.trim() || null,
    ordem_aparicao:
      fields.ordem_aparicao !== undefined
        ? parseOrdemAparicao(fields.ordem_aparicao)
        : null,
  };
}
