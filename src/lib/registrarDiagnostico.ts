import { isSupabaseConfigured, supabase } from "@/lib/supabase";

/**
 * Registra o envio do diagnóstico: cria ou atualiza `usuario_percursos`.
 * O PDF em si não é analisado por IA neste fluxo; o logismoi inicial é
 * placeholder até o terapeuta ajustar. A URL do PDF pode ser ligada depois
 * (Storage + coluna `pdf_diagnostico_url`).
 */
export async function registrarDiagnosticoAposUpload(): Promise<
  { ok: true } | { ok: false; message: string }
> {
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
      .update({ updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (upErr) return { ok: false, message: upErr.message };
    return { ok: true };
  }

  const { error: insErr } = await supabase.from("usuario_percursos").insert({
    user_id: user.id,
    logismoi_id: 1,
    status: "ativo",
  });
  if (insErr) return { ok: false, message: insErr.message };
  return { ok: true };
}
