/** 24 horas após concluir a etapa anterior, a seguinte fica disponível. */
export const INTERVALO_ENTRE_ETAPAS_MS = 24 * 60 * 60 * 1000;

function liberaAposIntervalo(
  numeroSemana: number,
  etapaConcluidaEm: Record<number, string | null>,
): boolean {
  if (numeroSemana <= 1) return true;
  const prev = numeroSemana - 1;
  const concluida = etapaConcluidaEm[prev];
  if (!concluida) return false;
  const t = new Date(concluida).getTime();
  if (Number.isNaN(t)) return true;
  return Date.now() >= t + INTERVALO_ENTRE_ETAPAS_MS;
}

/**
 * Etapa 1 sempre acessível; demais exigem a anterior concluída e decorridas
 * 24 horas desde essa conclusão.
 */
export function etapaEstaDesbloqueada(
  numeroSemana: number,
  semanasLidas: Record<number, boolean>,
  etapaConcluidaEm: Record<number, string | null> = {},
): boolean {
  if (numeroSemana <= 1) return true;
  if (!semanasLidas[numeroSemana - 1]) return false;
  return liberaAposIntervalo(numeroSemana, etapaConcluidaEm);
}

/** Primeira etapa desbloqueada ainda não concluída; `null` se todas concluídas ou em espera de 24h. */
export function primeiraEtapaEmAberto(
  semanas: { numero_semana: number }[],
  semanasLidas: Record<number, boolean>,
  etapaConcluidaEm: Record<number, string | null> = {},
): number | null {
  const sorted = [...semanas].sort((a, b) => a.numero_semana - b.numero_semana);
  for (const s of sorted) {
    if (semanasLidas[s.numero_semana]) continue;
    if (
      !etapaEstaDesbloqueada(s.numero_semana, semanasLidas, etapaConcluidaEm)
    )
      continue;
    return s.numero_semana;
  }
  return null;
}

/**
 * Há uma etapa pendente, mas a anterior foi concluída há menos de 24h —
 * indica quando a próxima abre.
 */
export function aguardandoIntervaloEntreEtapas(
  semanas: { numero_semana: number }[],
  semanasLidas: Record<number, boolean>,
  etapaConcluidaEm: Record<number, string | null>,
): { numeroEtapa: number; liberadaEm: Date } | null {
  const sorted = [...semanas].sort((a, b) => a.numero_semana - b.numero_semana);
  for (const s of sorted) {
    if (semanasLidas[s.numero_semana]) continue;
    const prev = s.numero_semana - 1;
    if (prev < 1) continue;
    if (!semanasLidas[prev]) continue;
    const concluida = etapaConcluidaEm[prev];
    if (!concluida) continue;
    const t = new Date(concluida).getTime();
    if (Number.isNaN(t)) continue;
    const liberadaEm = new Date(t + INTERVALO_ENTRE_ETAPAS_MS);
    if (Date.now() < liberadaEm.getTime()) {
      return { numeroEtapa: s.numero_semana, liberadaEm };
    }
  }
  return null;
}

/** Texto auxiliar na lista quando a etapa está fechada. */
export function mensagemBloqueioEtapa(
  numeroSemana: number,
  semanasLidas: Record<number, boolean>,
  etapaConcluidaEm: Record<number, string | null>,
): string | null {
  if (numeroSemana <= 1) return null;
  const prev = numeroSemana - 1;
  if (!semanasLidas[prev]) {
    return `Disponível após concluir a etapa ${prev}.`;
  }
  const concluida = etapaConcluidaEm[prev];
  if (!concluida) return null;
  const t = new Date(concluida).getTime();
  if (Number.isNaN(t)) return null;
  if (Date.now() < t + INTERVALO_ENTRE_ETAPAS_MS) {
    return `Para abrir a etapa ${numeroSemana}, aguarde 24 horas após a conclusão da etapa ${prev}.`;
  }
  return null;
}
