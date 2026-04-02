import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type LogismoiOpcao = {
  id: number;
  nome_portugues: string;
  nome_grego: string;
  descricao_breve: string | null;
  icone: string | null;
  cor_hex: string | null;
};

export function useLogismoiOpcoes() {
  const [items, setItems] = useState<LogismoiOpcao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setItems([]);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const { data, error: e } = await supabase
        .from("logismoi")
        .select("id, nome_portugues, nome_grego, descricao_breve, icone, cor_hex")
        .order("id", { ascending: true });

      if (cancelled) return;
      if (e) {
        setError(e.message);
        setItems([]);
      } else {
        setError(null);
        setItems((data as LogismoiOpcao[]) ?? []);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
