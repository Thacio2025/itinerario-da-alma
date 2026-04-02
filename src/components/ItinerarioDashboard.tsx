import { BookOpen, Compass, Heart, Loader2, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogismoiGlyph } from "@/lib/logismoiLucideIcons";
import type {
  PercursoUsuario,
  SemanaItinerarioRow,
} from "@/hooks/useUsuarioItinerario";

type Phase = {
  title: string;
  note: string;
  icon: typeof Compass;
};

const phases: Phase[] = [
  {
    title: "Despertar",
    note: "Reconhecer o chamado interior e a necessidade de caminho.",
    icon: Moon,
  },
  {
    title: "Purificação",
    note: "Soltar o que não serve mais à alma.",
    icon: Heart,
  },
  {
    title: "Iluminação",
    note: "Integrar luz e sombra no mesmo itinerário.",
    icon: Compass,
  },
  {
    title: "União",
    note: "Viver o sagrado no cotidiano.",
    icon: BookOpen,
  },
];

type ItinerarioDashboardProps = {
  userEmail?: string | null;
  percurso?: PercursoUsuario | null;
  semanas?: SemanaItinerarioRow[];
  loading?: boolean;
  fetchError?: string | null;
  className?: string;
};

export function ItinerarioDashboard({
  userEmail,
  percurso = null,
  semanas = [],
  loading = false,
  fetchError = null,
  className,
}: ItinerarioDashboardProps) {
  const temPercurso = Boolean(percurso);
  const temSemanasCadastradas = semanas.length > 0;

  return (
    <div className={cn("space-y-10", className)}>
      <div className="space-y-4 text-center sm:text-left">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-scriptorium-cream md:text-4xl">
          Seu itinerário
        </h2>
        {!temPercurso && !loading && (
          <p className="max-w-2xl text-base leading-relaxed text-scriptorium-cream/75">
            Aqui você acompanha as etapas do seu caminho. Escolha o logismoi na
            seção acima e clique em{" "}
            <span className="font-medium text-scriptorium-cream/90">
              Salvar percurso
            </span>
            . Quando o conteúdo estiver disponível, as semanas aparecem
            automaticamente.
          </p>
        )}
        {temPercurso && percurso?.logismoi && (
          <div className="flex max-w-2xl flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-5 text-left shadow-card-lift sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-scriptorium-gold/30 bg-scriptorium-gold/10 text-scriptorium-gold">
              <LogismoiGlyph
                logismoiId={percurso.logismoi_id}
                className="h-7 w-7"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="font-display text-xl font-semibold text-scriptorium-cream">
                {percurso.logismoi.nome_portugues}
                <span className="ml-2 text-base font-normal text-scriptorium-cream/55">
                  ({percurso.logismoi.nome_grego})
                </span>
              </p>
              <p className="text-sm leading-relaxed text-scriptorium-cream/70">
                Semana atual:{" "}
                <span className="font-medium text-scriptorium-gold-muted">
                  {percurso.semana_atual ?? 1}
                </span>
                {percurso.logismoi.descricao_breve && (
                  <> — {percurso.logismoi.descricao_breve}</>
                )}
              </p>
            </div>
          </div>
        )}
        {userEmail && (
          <p className="text-sm text-scriptorium-gold-muted/90">
            Sessão: {userEmail}
          </p>
        )}
        {fetchError && (
          <p className="text-sm text-red-400/90" role="alert">
            Não foi possível carregar o itinerário: {fetchError}
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-scriptorium-cream/60">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Carregando itinerário…
        </div>
      )}

      {!loading && temPercurso && temSemanasCadastradas && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {semanas.slice(0, 8).map((s) => (
            <Card
              key={s.numero_semana}
              className="rounded-xl border-white/10 bg-gradient-to-b from-white/[0.05] to-black/20 shadow-card-lift transition-colors hover:border-scriptorium-gold/25"
            >
              <CardHeader className="pb-2">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-scriptorium-gold-muted">
                  Etapa {s.numero_semana}
                  {s.tipo_fase ? ` · ${s.tipo_fase}` : ""}
                </p>
                <CardTitle className="font-display text-lg font-semibold leading-snug text-scriptorium-cream">
                  {s.titulo_semana}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-scriptorium-cream/70">
                  {s.exercicio_titulo
                    ? `${s.exercicio_titulo}${s.exercicio_descricao ? ` — ${s.exercicio_descricao}` : ""}`
                    : "Conteúdo definido pelo terapeuta."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-scriptorium-gold/50 to-scriptorium-gold"
                    style={{
                      width: `${Math.min(100, 12 + s.numero_semana * 7)}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && temPercurso && !temSemanasCadastradas && (
        <Card className="rounded-xl border-scriptorium-gold/20 bg-black/25 shadow-card-lift">
          <CardHeader>
            <CardTitle className="font-display text-xl text-scriptorium-cream">
              Etapas em preparação
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-scriptorium-cream/75">
              O seu percurso está definido, mas o conteúdo das semanas para{" "}
              <span className="font-medium text-scriptorium-cream/90">
                {percurso?.logismoi?.nome_portugues ?? "este eixo"}
              </span>{" "}
              ainda não foi publicado. O terapeuta pode carregar o material no
              painel administrativo.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {!loading && !temPercurso && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <Card
              key={p.title}
              className="rounded-xl border-white/10 bg-gradient-to-b from-white/[0.04] to-black/25 shadow-card-lift transition-colors hover:border-scriptorium-gold/20"
            >
              <CardHeader className="pb-2">
                <p.icon
                  className="mb-3 h-8 w-8 text-scriptorium-gold/90"
                  aria-hidden
                  strokeWidth={1.25}
                />
                <CardTitle className="font-display text-lg text-scriptorium-cream">
                  {p.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-scriptorium-cream/70">
                  {p.note}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-scriptorium-gold/60"
                    style={{
                      width: `${[45, 62, 38, 71][i]}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="rounded-xl border-white/10 bg-black/20 shadow-card-lift">
        <CardHeader>
          <CardTitle className="font-display text-xl text-scriptorium-cream">
            Próximo passo
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-scriptorium-cream/75">
            {temPercurso
              ? "Reserve momentos regulares para leitura e oração. As reflexões pessoais podem, no futuro, ficar registadas de forma segura na sua conta."
              : "Depois de salvar o percurso, volte a esta página para ver as etapas quando estiverem disponíveis."}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
