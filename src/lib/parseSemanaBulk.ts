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
