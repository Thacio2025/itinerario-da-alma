import { isSupabaseConfigured, supabase } from "@/lib/supabase";

/**
 * Marca uma etapa como concluída/lida em `usuario_semana_progresso`
 * (insert ou update; fica persistido no Supabase).
 */
export async function marcarSemanaComoLida(
  percursoId: number,
  numeroSemana: number,
): Promise<{ ok: true } | { ok: false; message: string }> {
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

  const now = new Date().toISOString();

  const { data: existing, error: selErr } = await supabase
    .from("usuario_semana_progresso")
    .select("id")
    .eq("percurso_id", percursoId)
    .eq("numero_semana", numeroSemana)
    .maybeSingle();

  if (selErr) {
    return { ok: false, message: selErr.message };
  }

  if (existing) {
    const { error: upErr } = await supabase
      .from("usuario_semana_progresso")
      .update({
        status: "concluida",
        concluida_em: now,
        updated_at: now,
      })
      .eq("id", existing.id);
    if (upErr) return { ok: false, message: upErr.message };
    return { ok: true };
  }

  const { error: insErr } = await supabase.from("usuario_semana_progresso").insert({
    percurso_id: percursoId,
    numero_semana: numeroSemana,
    status: "concluida",
    concluida_em: now,
  });
  if (insErr) return { ok: false, message: insErr.message };
  return { ok: true };
}
