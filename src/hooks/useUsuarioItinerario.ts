import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type LogismoiResumo = {
  nome_portugues: string;
  nome_grego: string;
  descricao_breve: string | null;
  icone: string | null;
};

export type PercursoUsuario = {
  id: number;
  logismoi_id: number;
  semana_atual: number | null;
  status: string | null;
  logismoi: LogismoiResumo | null;
};

export type SemanaItinerarioRow = {
  numero_semana: number;
  titulo_semana: string;
  exercicio_titulo: string | null;
  exercicio_descricao: string | null;
  tipo_fase: string | null;
};

export function useUsuarioItinerario() {
  const { user, loading: authLoading } = useAuth();
  const [percurso, setPercurso] = useState<PercursoUsuario | null>(null);
  const [semanas, setSemanas] = useState<SemanaItinerarioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!isSupabaseConfigured() || !user) {
      setPercurso(null);
      setSemanas([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data: percursos, error: e1 } = await supabase
      .from("usuario_percursos")
      .select(
        `
        id,
        logismoi_id,
        semana_atual,
        status,
        logismoi ( nome_portugues, nome_grego, descricao_breve, icone )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (e1) {
      setError(e1.message);
      setPercurso(null);
      setSemanas([]);
      setLoading(false);
      return;
    }

    const row = percursos?.[0];
    if (!row) {
      setPercurso(null);
      setSemanas([]);
      setLoading(false);
      return;
    }

    const lm = row.logismoi as LogismoiResumo | LogismoiResumo[] | null;
    const logismoi = Array.isArray(lm) ? lm[0] ?? null : lm;

    setPercurso({
      id: row.id,
      logismoi_id: row.logismoi_id,
      semana_atual: row.semana_atual,
      status: row.status,
      logismoi,
    });

    const { data: weeks, error: e2 } = await supabase
      .from("itinerario_semanas")
      .select(
        "numero_semana, titulo_semana, exercicio_titulo, exercicio_descricao, tipo_fase",
      )
      .eq("logismoi_id", row.logismoi_id)
      .order("numero_semana", { ascending: true })
      .limit(12);

    if (e2) {
      setError(e2.message);
      setSemanas([]);
    } else {
      setSemanas((weeks as SemanaItinerarioRow[]) ?? []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refetch();
  }, [authLoading, refetch]);

  return { percurso, semanas, loading, error, refetch };
}
