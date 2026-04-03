import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  concluirEtapaSemana,
  type ConcluirEtapaPayload,
} from "@/lib/semanaProgresso";

export type { ConcluirEtapaPayload };

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
  tipo_fase: string | null;
  leitura_fonte: string | null;
  leitura_texto: string | null;
  doutrina_titulo: string | null;
  doutrina_corpo: string | null;
  exercicio_titulo: string | null;
  exercicio_descricao: string | null;
  sinal_progresso_titulo: string | null;
  sinal_progresso_descricao: string | null;
};

export function useUsuarioItinerario() {
  const { user, loading: authLoading } = useAuth();
  const [percurso, setPercurso] = useState<PercursoUsuario | null>(null);
  const [semanas, setSemanas] = useState<SemanaItinerarioRow[]>([]);
  const [semanasLidas, setSemanasLidas] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [marcandoSemana, setMarcandoSemana] = useState<number | null>(null);

  const refetch = useCallback(async () => {
    if (!isSupabaseConfigured() || !user) {
      setPercurso(null);
      setSemanas([]);
      setSemanasLidas({});
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
      setSemanasLidas({});
      setLoading(false);
      return;
    }

    const row = percursos?.[0];
    if (!row) {
      setPercurso(null);
      setSemanas([]);
      setSemanasLidas({});
      setLoading(false);
      return;
    }

    const lm = row.logismoi as LogismoiResumo | LogismoiResumo[] | null;
    const logismoi = Array.isArray(lm) ? lm[0] ?? null : lm;

    const percursoId = Number(row.id);

    setPercurso({
      id: percursoId,
      logismoi_id: row.logismoi_id,
      semana_atual: row.semana_atual,
      status: row.status,
      logismoi,
    });

    const { data: weeks, error: e2 } = await supabase
      .from("itinerario_semanas")
      .select(
        `
        numero_semana,
        titulo_semana,
        tipo_fase,
        leitura_fonte,
        leitura_texto,
        doutrina_titulo,
        doutrina_corpo,
        exercicio_titulo,
        exercicio_descricao,
        sinal_progresso_titulo,
        sinal_progresso_descricao
      `,
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

    const { data: prog, error: e3 } = await supabase
      .from("usuario_semana_progresso")
      .select("numero_semana, concluida_em, status")
      .eq("percurso_id", percursoId);

    if (e3) {
      setError((prev) => prev ?? e3.message);
      setSemanasLidas({});
    } else {
      const lidas: Record<number, boolean> = {};
      prog?.forEach((p: { numero_semana: number; concluida_em: string | null; status: string | null }) => {
        lidas[p.numero_semana] =
          p.concluida_em != null || p.status === "concluida";
      });
      setSemanasLidas(lidas);
    }

    setLoading(false);
  }, [user]);

  const marcarSemanaLida = useCallback(
    async (
      numeroSemana: number,
      payload: ConcluirEtapaPayload,
    ): Promise<{ ok: true } | { ok: false; message: string }> => {
      if (!percurso) {
        return { ok: false, message: "Nenhum percurso ativo." };
      }
      setMarcandoSemana(numeroSemana);
      const result = await concluirEtapaSemana(
        percurso.id,
        numeroSemana,
        payload,
      );
      setMarcandoSemana(null);
      if (result.ok) {
        await refetch();
        return { ok: true };
      }
      return { ok: false, message: result.message };
    },
    [percurso, refetch],
  );

  useEffect(() => {
    if (authLoading) return;
    void refetch();
  }, [authLoading, refetch]);

  return {
    percurso,
    semanas,
    semanasLidas,
    loading,
    error,
    refetch,
    marcarSemanaLida,
    marcandoSemana,
  };
}
