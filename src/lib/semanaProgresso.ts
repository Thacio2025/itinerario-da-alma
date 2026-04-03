import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const MIN_CARACTERES_PROVA = 20;

export type ConcluirEtapaPayload = {
  reflexao_texto: string;
  sinal_progresso_observado: string;
  confianca_virtude?: number | null;
};

/** Erro legível se a prova escrita for insuficiente; `null` se válida. */
export function mensagemValidacaoProva(
  reflexao_texto: string,
  sinal_progresso_observado: string,
): string | null {
  const r = reflexao_texto.trim();
  const s = sinal_progresso_observado.trim();
  if (r.length >= MIN_CARACTERES_PROVA || s.length >= MIN_CARACTERES_PROVA) {
    return null;
  }
  return `Descreva uma breve reflexão ou um sinal de progresso (mínimo ${MIN_CARACTERES_PROVA} caracteres num dos campos).`;
}

function confiancaValida(n: number | null | undefined): number | null {
  if (n === null || n === undefined) return null;
  const v = Math.round(Number(n));
  if (Number.isNaN(v)) return null;
  return Math.min(10, Math.max(0, v));
}

/**
 * Conclui uma etapa com registo escrito (reflexão e/ou sinal) e avança o percurso.
 * Exige etapa anterior concluída (exceto na semana 1).
 */
export async function concluirEtapaSemana(
  percursoId: number,
  numeroSemana: number,
  payload: ConcluirEtapaPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const provaMsg = mensagemValidacaoProva(
    payload.reflexao_texto,
    payload.sinal_progresso_observado,
  );
  if (provaMsg) return { ok: false, message: provaMsg };

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "Supabase não está configurado (variáveis VITE_SUPABASE_* no build).",
    };
  }

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return { ok: false, message: "Sessão inválida. Entre novamente." };
  }

  const reflexao = payload.reflexao_texto.trim();
  const sinal = payload.sinal_progresso_observado.trim();
  const confianca = confiancaValida(payload.confianca_virtude ?? null);

  if (numeroSemana > 1) {
    const { data: prev, error: prevErr } = await supabase
      .from("usuario_semana_progresso")
      .select("concluida_em, status")
      .eq("percurso_id", percursoId)
      .eq("numero_semana", numeroSemana - 1)
      .maybeSingle();

    if (prevErr) return { ok: false, message: prevErr.message };

    const prevOk =
      prev &&
      (prev.concluida_em != null || prev.status === "concluida");
    if (!prevOk) {
      return {
        ok: false,
        message: "Conclua e registe a etapa anterior antes de avançar.",
      };
    }
  }

  const now = new Date().toISOString();

  const { data: existing, error: selErr } = await supabase
    .from("usuario_semana_progresso")
    .select("id, iniciada_em")
    .eq("percurso_id", percursoId)
    .eq("numero_semana", numeroSemana)
    .maybeSingle();

  if (selErr) {
    return { ok: false, message: selErr.message };
  }

  const iniciada =
    existing?.iniciada_em ?? now;

  const row = {
    status: "concluida" as const,
    concluida_em: now,
    iniciada_em: iniciada,
    reflexao_texto: reflexao,
    sinal_progresso_observado: sinal,
    confianca_virtude: confianca,
    updated_at: now,
  };

  if (existing) {
    const { error: upErr } = await supabase
      .from("usuario_semana_progresso")
      .update(row)
      .eq("id", existing.id);
    if (upErr) return { ok: false, message: upErr.message };
  } else {
    const { error: insErr } = await supabase
      .from("usuario_semana_progresso")
      .insert({
        percurso_id: percursoId,
        numero_semana: numeroSemana,
        liberada_em: now,
        ...row,
      });
    if (insErr) return { ok: false, message: insErr.message };
  }

  const proximaSemana = Math.min(12, numeroSemana + 1);
  const proximaData = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { error: perErr } = await supabase
    .from("usuario_percursos")
    .update({
      semana_atual: proximaSemana,
      data_proxima_semana: proximaData,
      updated_at: now,
    })
    .eq("id", percursoId)
    .eq("user_id", user.id);

  if (perErr) return { ok: false, message: perErr.message };

  return { ok: true };
}
