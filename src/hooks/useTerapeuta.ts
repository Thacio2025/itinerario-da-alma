import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * E-mail autorizado a ver o botão "Painel terapeuta" e a usar a rota
 * `/app/terapeuta`. (RLS no Supabase continua a usar a tabela `terapeutas`.)
 */
export const TERAPEUTA_PANEL_EMAIL = "thaciosiqueira@gmail.com";

function emailAutorizadoTerapeuta(email: string | undefined | null): boolean {
  if (!email) return false;
  return (
    email.toLowerCase().trim() === TERAPEUTA_PANEL_EMAIL.toLowerCase().trim()
  );
}

export function useTerapeuta() {
  const { user, loading: authLoading } = useAuth();

  const isTerapeuta = useMemo(
    () => !authLoading && emailAutorizadoTerapeuta(user?.email),
    [authLoading, user?.email],
  );

  return { isTerapeuta, loading: authLoading };
}
