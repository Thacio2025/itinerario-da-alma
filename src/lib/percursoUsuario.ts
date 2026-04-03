import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const LOGISMOI_MIN = 1;
const LOGISMOI_MAX = 8;

/**
 * Garante um percurso por par (utilizador, logismoi), conforme UNIQUE no schema.
 * Não sobrescreve outro eixo: cada logismoi tem o seu próprio progresso e semana_atual.
 * Ao “Salvar”, o percurso desse eixo fica como o mais recente (updated_at) para o painel.
 */
export async function salvarPercursoLogismoi(
  logismoiId: number,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (
    !Number.isInteger(logismoiId) ||
    logismoiId < LOGISMOI_MIN ||
    logismoiId > LOGISMOI_MAX
  ) {
    return { ok: false, message: "Logismoi inválido." };
  }

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
    .from("usuario_percursos")
    .select("id")
    .eq("user_id", user.id)
    .eq("logismoi_id", logismoiId)
    .maybeSingle();

  if (selErr) {
    return { ok: false, message: selErr.message };
  }

  if (existing) {
    const { error: upErr } = await supabase
      .from("usuario_percursos")
      .update({ updated_at: now })
      .eq("id", existing.id);
    if (upErr) return { ok: false, message: upErr.message };
    return { ok: true };
  }

  const { error: insErr } = await supabase.from("usuario_percursos").insert({
    user_id: user.id,
    logismoi_id: logismoiId,
    status: "ativo",
  });
  if (insErr) return { ok: false, message: insErr.message };
  return { ok: true };
}
