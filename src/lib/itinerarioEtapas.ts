/** Etapa 1 sempre acessível; demais exigem a anterior concluída. */
export function etapaEstaDesbloqueada(
  numeroSemana: number,
  semanasLidas: Record<number, boolean>,
): boolean {
  if (numeroSemana <= 1) return true;
  return Boolean(semanasLidas[numeroSemana - 1]);
}

/** Primeira etapa desbloqueada ainda não concluída; `null` se todas concluídas. */
export function primeiraEtapaEmAberto(
  semanas: { numero_semana: number }[],
  semanasLidas: Record<number, boolean>,
): number | null {
  const sorted = [...semanas].sort((a, b) => a.numero_semana - b.numero_semana);
  for (const s of sorted) {
    if (!etapaEstaDesbloqueada(s.numero_semana, semanasLidas)) continue;
    if (!semanasLidas[s.numero_semana]) return s.numero_semana;
  }
  return null;
}
