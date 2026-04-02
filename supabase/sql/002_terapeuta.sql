-- =============================================================================
-- Terapeutas: quem pode editar conteúdo e ver dados de participantes
-- Rode no SQL Editor do projeto Itinerário (foqbrwheptriktlgdtfx).
-- Depois: INSERT INTO public.terapeutas (user_id) VALUES ('SEU_UUID'::uuid);
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.terapeutas (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.terapeutas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "terapeutas_select_self" ON public.terapeutas;
CREATE POLICY "terapeutas_select_self" ON public.terapeutas
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Cadastro de terapeutas só via SQL / painel Supabase (sem INSERT público)

CREATE OR REPLACE FUNCTION public.is_terapeuta (uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.terapeutas t WHERE t.user_id = uid);
$$;

GRANT EXECUTE ON FUNCTION public.is_terapeuta (uuid) TO authenticated;

-- Conteúdo: logismoi e itinerario_semanas (além do SELECT público já existente)
DROP POLICY IF EXISTS "logismoi_write_terapeuta" ON public.logismoi;
CREATE POLICY "logismoi_write_terapeuta" ON public.logismoi
  FOR ALL TO authenticated
  USING (public.is_terapeuta (auth.uid()))
  WITH CHECK (public.is_terapeuta (auth.uid()));

DROP POLICY IF EXISTS "semanas_insert_terapeuta" ON public.itinerario_semanas;
DROP POLICY IF EXISTS "semanas_update_terapeuta" ON public.itinerario_semanas;
DROP POLICY IF EXISTS "semanas_delete_terapeuta" ON public.itinerario_semanas;

CREATE POLICY "semanas_insert_terapeuta" ON public.itinerario_semanas
  FOR INSERT TO authenticated
  WITH CHECK (public.is_terapeuta (auth.uid()));

CREATE POLICY "semanas_update_terapeuta" ON public.itinerario_semanas
  FOR UPDATE TO authenticated
  USING (public.is_terapeuta (auth.uid()))
  WITH CHECK (public.is_terapeuta (auth.uid()));

CREATE POLICY "semanas_delete_terapeuta" ON public.itinerario_semanas
  FOR DELETE TO authenticated
  USING (public.is_terapeuta (auth.uid()));

-- Terapeuta vê todos os percursos e progresso (além das políticas do próprio usuário)
DROP POLICY IF EXISTS "percursos_select_terapeuta" ON public.usuario_percursos;
CREATE POLICY "percursos_select_terapeuta" ON public.usuario_percursos
  FOR SELECT TO authenticated
  USING (public.is_terapeuta (auth.uid()));

DROP POLICY IF EXISTS "progresso_select_terapeuta" ON public.usuario_semana_progresso;
CREATE POLICY "progresso_select_terapeuta" ON public.usuario_semana_progresso
  FOR SELECT TO authenticated
  USING (public.is_terapeuta (auth.uid()));

DROP POLICY IF EXISTS "progresso_update_terapeuta" ON public.usuario_semana_progresso;
CREATE POLICY "progresso_update_terapeuta" ON public.usuario_semana_progresso
  FOR UPDATE TO authenticated
  USING (public.is_terapeuta (auth.uid()))
  WITH CHECK (public.is_terapeuta (auth.uid()));

DROP POLICY IF EXISTS "sessoes_all_terapeuta" ON public.sessoes_direcao;
CREATE POLICY "sessoes_all_terapeuta" ON public.sessoes_direcao
  FOR ALL TO authenticated
  USING (public.is_terapeuta (auth.uid()))
  WITH CHECK (public.is_terapeuta (auth.uid()));
