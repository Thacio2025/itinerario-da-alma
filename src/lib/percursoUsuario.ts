import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const LOGISMOI_MIN = 1;
const LOGISMOI_MAX = 8;

/**
 * Cria ou atualiza o percurso do utilizador com o logismoi escolhido.
 * Mantém um único percurso “ativo” por utilizador (última linha atualizada).
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

  const { data: rows, error: selErr } = await supabase
    .from("usuario_percursos")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (selErr) {
    return { ok: false, message: selErr.message };
  }

  const existing = rows?.[0];

  if (existing) {
    const { error: upErr } = await supabase
      .from("usuario_percursos")
      .update({
        logismoi_id: logismoiId,
        updated_at: new Date().toISOString(),
      })
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
