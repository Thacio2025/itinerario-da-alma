import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

/** null = ainda carregando; true/false = resultado */
export function useTerapeuta() {
  const { user, loading: authLoading } = useAuth();
  const [isTerapeuta, setIsTerapeuta] = useState<boolean | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsTerapeuta(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("terapeutas")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.warn("[terapeutas]", error.message);
        setIsTerapeuta(false);
        return;
      }
      setIsTerapeuta(!!data);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const loading = authLoading || (user != null && isTerapeuta === null);

  return { isTerapeuta: isTerapeuta ?? false, loading };
}
