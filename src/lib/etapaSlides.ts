import type { SemanaItinerarioRow } from "@/hooks/useUsuarioItinerario";

export type EtapaSlideId =
  | "leitura"
  | "doutrina"
  | "exercicio"
  | "sinal"
  | "conclusao";

/** Ordem: leitura → doutrina → exercício → sinal de progresso → conclusão (formulário). */
export function slidesDaEtapa(s: SemanaItinerarioRow): EtapaSlideId[] {
  const out: EtapaSlideId[] = [];
  if (s.leitura_texto?.trim()) out.push("leitura");
  if (s.doutrina_corpo?.trim() || s.doutrina_titulo?.trim())
    out.push("doutrina");
  if (s.exercicio_descricao?.trim() || s.exercicio_titulo?.trim())
    out.push("exercicio");
  if (
    s.sinal_progresso_descricao?.trim() ||
    s.sinal_progresso_titulo?.trim()
  ) {
    out.push("sinal");
  }
  out.push("conclusao");
  return out;
}
