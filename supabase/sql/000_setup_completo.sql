-- =============================================================================
-- SETUP COMPLETO (projeto novo vazio) — rode UMA VEZ no SQL Editor
-- Depois: Authentication → Users → copie seu UUID e rode o INSERT em terapeutas
-- (está comentado no final do arquivo 001 original; use o bloco abaixo na doc)
-- =============================================================================
-- Itinerário da Alma — schema + dados + RLS
-- Cole e execute no Supabase → SQL Editor (ou: supabase db execute -f ...)
-- =============================================================================

-- 1) Tabelas
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.logismoi (
  id SMALLINT PRIMARY KEY,
  nome_portugues VARCHAR(50) NOT NULL UNIQUE,
  nome_grego VARCHAR(50) NOT NULL UNIQUE,
  descricao_breve TEXT,
  cor_hex VARCHAR(7),
  icone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.itinerario_semanas (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  logismoi_id SMALLINT NOT NULL REFERENCES public.logismoi(id),
  numero_semana SMALLINT NOT NULL CHECK (numero_semana BETWEEN 1 AND 12),
  titulo_semana VARCHAR(255) NOT NULL,
  leitura_fonte VARCHAR(255),
  leitura_texto TEXT,
  doutrina_titulo VARCHAR(255),
  doutrina_corpo TEXT,
  exercicio_titulo VARCHAR(255),
  exercicio_descricao TEXT,
  sinal_progresso_titulo VARCHAR(255),
  sinal_progresso_descricao TEXT,
  tipo_fase VARCHAR(30),
  ordem_aparicao INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(logismoi_id, numero_semana)
);

CREATE TABLE IF NOT EXISTS public.usuario_percursos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logismoi_id SMALLINT NOT NULL REFERENCES public.logismoi(id),
  pontuacao_logismoi INT,
  pdf_diagnostico_url TEXT,
  semana_atual SMALLINT DEFAULT 1,
  data_inicio TIMESTAMP DEFAULT NOW(),
  data_proxima_semana TIMESTAMP DEFAULT (NOW() + INTERVAL '7 days'),
  status VARCHAR(30) DEFAULT 'ativo',
  tem_diretor_espiritual BOOLEAN DEFAULT FALSE,
  diretor_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, logismoi_id)
);

CREATE TABLE IF NOT EXISTS public.usuario_semana_progresso (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  percurso_id BIGINT NOT NULL REFERENCES public.usuario_percursos(id) ON DELETE CASCADE,
  numero_semana SMALLINT NOT NULL,
  liberada_em TIMESTAMP DEFAULT NOW(),
  iniciada_em TIMESTAMP,
  concluida_em TIMESTAMP,
  status VARCHAR(30) DEFAULT 'não_iniciada',
  reflexao_texto TEXT,
  sinal_progresso_observado TEXT,
  confianca_virtude INT CHECK (confianca_virtude BETWEEN 0 AND 10),
  notas_diretor TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(percurso_id, numero_semana)
);

CREATE TABLE IF NOT EXISTS public.sessoes_direcao (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  percurso_id BIGINT NOT NULL REFERENCES public.usuario_percursos(id) ON DELETE CASCADE,
  data_agendada TIMESTAMP,
  data_realizada TIMESTAMP,
  notas_pre_sessao TEXT,
  notas_pos_sessao TEXT,
  recomendacoes VARCHAR(500),
  status VARCHAR(30) DEFAULT 'agendada',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2) Dados iniciais (ON CONFLICT exige coluna de conflito)
-- -----------------------------------------------------------------------------

INSERT INTO public.logismoi (id, nome_portugues, nome_grego, cor_hex, icone) VALUES
(1, 'Gula', 'Gastrimargia', '#D4A574', '🍽️'),
(2, 'Luxúria', 'Porneia', '#E85D75', '🔥'),
(3, 'Avareza', 'Philargyria', '#B8860B', '💰'),
(4, 'Tristeza', 'Lypê', '#4A6FA5', '😢'),
(5, 'Ira', 'Orgê', '#C1121F', '⚡'),
(6, 'Acídia', 'Akêdia', '#6F6F6F', '😑'),
(7, 'Vanaglória', 'Kenodoxia', '#FFD700', '👁️'),
(8, 'Soberba', 'Hyperêphania', '#1A1A1A', '👑')
ON CONFLICT (id) DO NOTHING;

-- 3) Índices
-- -----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_usuario_percursos_user_id ON public.usuario_percursos(user_id);
CREATE INDEX IF NOT EXISTS idx_usuario_percursos_logismoi ON public.usuario_percursos(logismoi_id);
CREATE INDEX IF NOT EXISTS idx_usuario_semana_percurso ON public.usuario_semana_progresso(percurso_id);
CREATE INDEX IF NOT EXISTS idx_itinerario_semanas_logismoi ON public.itinerario_semanas(logismoi_id);

-- 4) RLS
-- -----------------------------------------------------------------------------

ALTER TABLE public.logismoi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerario_semanas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario_percursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario_semana_progresso ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessoes_direcao ENABLE ROW LEVEL SECURITY;

-- Idempotência: remover políticas se já existirem
DROP POLICY IF EXISTS "logismoi_select_public" ON public.logismoi;
DROP POLICY IF EXISTS "semanas_select_public" ON public.itinerario_semanas;
DROP POLICY IF EXISTS "percursos_select_user" ON public.usuario_percursos;
DROP POLICY IF EXISTS "percursos_insert_user" ON public.usuario_percursos;
DROP POLICY IF EXISTS "percursos_update_user" ON public.usuario_percursos;
DROP POLICY IF EXISTS "progresso_select_user" ON public.usuario_semana_progresso;
DROP POLICY IF EXISTS "progresso_insert_user" ON public.usuario_semana_progresso;
DROP POLICY IF EXISTS "progresso_update_user" ON public.usuario_semana_progresso;
DROP POLICY IF EXISTS "sessoes_select_owner_or_director" ON public.sessoes_direcao;
DROP POLICY IF EXISTS "sessoes_insert_owner_or_director" ON public.sessoes_direcao;
DROP POLICY IF EXISTS "sessoes_update_owner_or_director" ON public.sessoes_direcao;

-- Leitura pública (anon + authenticated — padrão Supabase)
CREATE POLICY "logismoi_select_public" ON public.logismoi
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "semanas_select_public" ON public.itinerario_semanas
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "percursos_select_user" ON public.usuario_percursos
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "percursos_insert_user" ON public.usuario_percursos
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "percursos_update_user" ON public.usuario_percursos
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progresso_select_user" ON public.usuario_semana_progresso
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos
      WHERE id = usuario_semana_progresso.percurso_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "progresso_insert_user" ON public.usuario_semana_progresso
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos
      WHERE id = percurso_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "progresso_update_user" ON public.usuario_semana_progresso
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos
      WHERE id = usuario_semana_progresso.percurso_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos
      WHERE id = percurso_id AND user_id = auth.uid()
    )
  );

-- sessoes_direcao: com RLS ativo, sem política ninguém acessa.
-- Dono do percurso OU diretor atribuído (diretor_id = auth.uid()) pode ler/inserir/atualizar.
CREATE POLICY "sessoes_select_owner_or_director" ON public.sessoes_direcao
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos p
      WHERE p.id = sessoes_direcao.percurso_id
        AND (p.user_id = auth.uid() OR p.diretor_id = auth.uid())
    )
  );

CREATE POLICY "sessoes_insert_owner_or_director" ON public.sessoes_direcao
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos p
      WHERE p.id = percurso_id
        AND (p.user_id = auth.uid() OR p.diretor_id = auth.uid())
    )
  );

CREATE POLICY "sessoes_update_owner_or_director" ON public.sessoes_direcao
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos p
      WHERE p.id = sessoes_direcao.percurso_id
        AND (p.user_id = auth.uid() OR p.diretor_id = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.usuario_percursos p
      WHERE p.id = percurso_id
        AND (p.user_id = auth.uid() OR p.diretor_id = auth.uid())
    )
  );

-- =============================================================================
-- 5) Depois: Authentication → Users → copie seu UUID e rode (ajuste o UUID):
-- =============================================================================
-- UPDATE public.usuario_percursos
-- SET diretor_id = 'SEU_UUID_AQUI'::uuid
-- WHERE user_id = 'SEU_UUID_AQUI'::uuid;
-- =============================================================================
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

-- =============================================================================
-- Depois de rodar tudo acima com sucesso:
-- 1) Authentication → Users → copie o UUID de thaciosiqueira@gmail.com
-- 2) Nova query SQL:
--    INSERT INTO public.terapeutas (user_id) VALUES ('COLE_O_UUID_AQUI'::uuid);
-- =============================================================================
