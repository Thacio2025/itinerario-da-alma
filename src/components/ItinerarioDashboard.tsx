import { BookOpen, Compass, Heart, Loader2, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <div className={cn("space-y-8", className)}>
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-scriptorium-gold md:text-4xl">
          Seu itinerário
        </h1>
        {!temPercurso && !loading && (
          <p className="max-w-2xl text-scriptorium-cream/75">
            Um espaço para acompanhar as etapas do caminho interior. Envie o
            diagnóstico e use <strong className="font-medium text-scriptorium-cream/90">Processar diagnóstico</strong>{" "}
            para criar o seu percurso no banco. As semanas exibidas aqui vêm da
            tabela <code className="rounded bg-scriptorium-bg px-1 text-scriptorium-gold">itinerario_semanas</code>{" "}
            (conteúdo cadastrado pelo terapeuta).
          </p>
        )}
        {temPercurso && percurso?.logismoi && (
          <div className="max-w-2xl space-y-2 text-scriptorium-cream/80">
            <p>
              <span className="text-scriptorium-gold-muted">Logismoi: </span>
              <span className="font-medium text-scriptorium-cream">
                {percurso.logismoi.icone && (
                  <span className="mr-1.5" aria-hidden>
                    {percurso.logismoi.icone}
                  </span>
                )}
                {percurso.logismoi.nome_portugues}
              </span>
              <span className="text-scriptorium-cream/60">
                {" "}
                ({percurso.logismoi.nome_grego})
              </span>
            </p>
            <p className="text-sm text-scriptorium-cream/65">
              Semana atual no percurso:{" "}
              <span className="text-scriptorium-gold-muted">
                {percurso.semana_atual ?? 1}
              </span>
              {percurso.logismoi.descricao_breve && (
                <>
                  {" "}
                  — {percurso.logismoi.descricao_breve}
                </>
              )}
            </p>
          </div>
        )}
        {userEmail && (
          <p className="text-sm text-scriptorium-gold-muted">
            Conectado como {userEmail}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {semanas.slice(0, 8).map((s) => (
            <Card
              key={s.numero_semana}
              className="border-scriptorium-border/80 transition-colors hover:border-scriptorium-gold/40"
            >
              <CardHeader className="pb-2">
                <p className="mb-1 text-xs uppercase tracking-wider text-scriptorium-gold-muted">
                  Semana {s.numero_semana}
                  {s.tipo_fase ? ` · ${s.tipo_fase}` : ""}
                </p>
                <CardTitle className="text-lg leading-snug">
                  {s.titulo_semana}
                </CardTitle>
                <CardDescription className="text-scriptorium-cream/70">
                  {s.exercicio_titulo
                    ? `${s.exercicio_titulo}${s.exercicio_descricao ? ` — ${s.exercicio_descricao}` : ""}`
                    : "Conteúdo da semana no painel do terapeuta."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-scriptorium-border">
                  <div
                    className="h-full rounded-full bg-scriptorium-gold/70"
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
        <Card className="border-scriptorium-gold/25 bg-scriptorium-surface/50">
          <CardHeader>
            <CardTitle className="text-lg">Semanas ainda não publicadas</CardTitle>
            <CardDescription className="text-scriptorium-cream/75">
              O seu percurso está registrado, mas ainda não há linhas em{" "}
              <code className="rounded bg-scriptorium-bg px-1 text-scriptorium-gold">
                itinerario_semanas
              </code>{" "}
              para o logismoi{" "}
              <strong className="text-scriptorium-cream/90">
                {percurso?.logismoi?.nome_portugues ?? "deste percurso"}
              </strong>
              . Peça ao terapeuta para cadastrar as semanas no painel ou importar
              o conteúdo.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {!loading && !temPercurso && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <Card
              key={p.title}
              className="border-scriptorium-border/80 transition-colors hover:border-scriptorium-gold/40"
            >
              <CardHeader className="pb-2">
                <p.icon
                  className="mb-2 h-8 w-8 text-scriptorium-gold"
                  aria-hidden
                />
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <CardDescription className="text-scriptorium-cream/70">
                  {p.note}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-scriptorium-border">
                  <div
                    className="h-full rounded-full bg-scriptorium-gold/70"
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

      <Card className="border-scriptorium-gold/20 bg-scriptorium-surface/60">
        <CardHeader>
          <CardTitle className="text-lg">Próximo passo</CardTitle>
          <CardDescription>
            {temPercurso
              ? "Acompanhe as semanas acima e registre reflexões ao longo do caminho. Em produção, reflexões podem ser guardadas numa tabela "
              : "Complete o processamento do diagnóstico (botão acima) e registre reflexões ao longo das etapas. Em produção, isto pode vir de uma tabela "}
            <code className="rounded bg-scriptorium-bg px-1 text-scriptorium-gold">
              reflexoes
            </code>{" "}
            no Supabase.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
