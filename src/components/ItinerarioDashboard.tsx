import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  Heart,
  Loader2,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

function BlocoMarkdown({ texto }: { texto: string | null | undefined }) {
  if (!texto?.trim()) return null;
  return (
    <div
      className={cn(
        "prose prose-invert prose-sm max-w-none text-scriptorium-cream/85",
        "prose-p:leading-relaxed prose-headings:font-display prose-headings:text-scriptorium-cream",
        "prose-strong:text-scriptorium-cream prose-li:marker:text-scriptorium-gold-muted",
      )}
    >
      <ReactMarkdown>{texto}</ReactMarkdown>
    </div>
  );
}

type ItinerarioDashboardProps = {
  userEmail?: string | null;
  percurso?: PercursoUsuario | null;
  semanas?: SemanaItinerarioRow[];
  semanasLidas?: Record<number, boolean>;
  loading?: boolean;
  fetchError?: string | null;
  onMarcarSemanaLida?: (numeroSemana: number) => Promise<boolean>;
  marcandoSemana?: number | null;
  className?: string;
};

export function ItinerarioDashboard({
  userEmail,
  percurso = null,
  semanas = [],
  semanasLidas = {},
  loading = false,
  fetchError = null,
  onMarcarSemanaLida,
  marcandoSemana = null,
  className,
}: ItinerarioDashboardProps) {
  const [expandida, setExpandida] = useState<number | null>(null);
  const [erroMarcar, setErroMarcar] = useState<string | null>(null);

  const temPercurso = Boolean(percurso);
  const temSemanasCadastradas = semanas.length > 0;

  const toggle = (n: number) => {
    setExpandida((prev) => (prev === n ? null : n));
    setErroMarcar(null);
  };

  const onMarcar = async (numeroSemana: number) => {
    setErroMarcar(null);
    if (!onMarcarSemanaLida) return;
    const ok = await onMarcarSemanaLida(numeroSemana);
    if (!ok) {
      setErroMarcar("Não foi possível guardar a leitura. Tente de novo.");
    }
  };

  return (
    <div className={cn("space-y-10", className)}>
      <div className="space-y-4 text-center sm:text-left">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-scriptorium-cream md:text-4xl">
          Seu itinerário
        </h2>
        {!temPercurso && !loading && (
          <p className="max-w-2xl text-base leading-relaxed text-scriptorium-cream/75">
            Depois do diagnóstico no{" "}
            <a
              href="https://diagnosticoespiritual.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-scriptorium-gold underline-offset-4 hover:underline"
            >
              Diagnóstico Espiritual
            </a>
            , escolha o logismoi acima e salve o percurso. As etapas aparecem
            aqui quando estiverem cadastradas.
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
                Etapa sugerida no percurso:{" "}
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
        {erroMarcar && (
          <p className="text-sm text-red-400/90" role="alert">
            {erroMarcar}
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
        <div className="space-y-3">
          <p className="text-sm text-scriptorium-cream/65">
            Toque numa etapa para abrir o texto completo. Marque como lido
            quando terminar — o estado fica guardado na sua conta.
          </p>
          <div className="flex flex-col gap-2">
            {semanas.map((s) => {
              const lida = Boolean(semanasLidas[s.numero_semana]);
              const aberta = expandida === s.numero_semana;
              return (
                <div
                  key={s.numero_semana}
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/25 shadow-card-lift"
                >
                  <button
                    type="button"
                    onClick={() => toggle(s.numero_semana)}
                    className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:items-center sm:gap-4"
                  >
                    <ChevronDown
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 text-scriptorium-gold-muted transition-transform sm:mt-0",
                        aberta && "rotate-180",
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-scriptorium-gold-muted">
                        Etapa {s.numero_semana}
                        {s.tipo_fase ? ` · ${s.tipo_fase}` : ""}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold leading-snug text-scriptorium-cream">
                        {s.titulo_semana}
                      </p>
                    </div>
                    {lida && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400/95">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Lido
                      </span>
                    )}
                  </button>
                  {aberta && (
                    <div className="space-y-6 border-t border-white/10 bg-black/30 px-4 py-6 sm:px-6">
                      {s.leitura_fonte && (
                        <p className="text-xs font-medium uppercase tracking-wide text-scriptorium-gold-muted">
                          Fonte: {s.leitura_fonte}
                        </p>
                      )}
                      {s.leitura_texto && (
                        <section>
                          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-scriptorium-gold">
                            Leitura
                          </h3>
                          <BlocoMarkdown texto={s.leitura_texto} />
                        </section>
                      )}
                      {(s.doutrina_titulo || s.doutrina_corpo) && (
                        <section>
                          {s.doutrina_titulo && (
                            <h3 className="mb-2 font-display text-lg text-scriptorium-cream">
                              {s.doutrina_titulo}
                            </h3>
                          )}
                          <BlocoMarkdown texto={s.doutrina_corpo} />
                        </section>
                      )}
                      {(s.exercicio_titulo || s.exercicio_descricao) && (
                        <section>
                          {s.exercicio_titulo && (
                            <h3 className="mb-2 font-display text-lg text-scriptorium-cream">
                              {s.exercicio_titulo}
                            </h3>
                          )}
                          <BlocoMarkdown texto={s.exercicio_descricao} />
                        </section>
                      )}
                      {(s.sinal_progresso_titulo || s.sinal_progresso_descricao) && (
                        <section>
                          {s.sinal_progresso_titulo && (
                            <h3 className="mb-2 font-display text-lg text-scriptorium-cream">
                              {s.sinal_progresso_titulo}
                            </h3>
                          )}
                          <BlocoMarkdown texto={s.sinal_progresso_descricao} />
                        </section>
                      )}
                      {!s.leitura_texto &&
                        !s.doutrina_corpo &&
                        !s.exercicio_descricao &&
                        !s.sinal_progresso_descricao && (
                          <p className="text-sm text-scriptorium-cream/65">
                            O texto completo desta etapa ainda não foi publicado
                            pelo terapeuta.
                          </p>
                        )}
                      <div className="pt-2">
                        <Button
                          type="button"
                          size="sm"
                          disabled={
                            lida ||
                            marcandoSemana === s.numero_semana ||
                            !onMarcarSemanaLida
                          }
                          className={
                            lida
                              ? "border border-emerald-500/40 bg-transparent text-emerald-400/90"
                              : "bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                          }
                          variant={lida ? "outline" : "default"}
                          onClick={(e) => {
                            e.stopPropagation();
                            void onMarcar(s.numero_semana);
                          }}
                        >
                          {marcandoSemana === s.numero_semana ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Salvando…
                            </>
                          ) : lida ? (
                            <>
                              <Check className="h-4 w-4" />
                              Etapa registrada como lida
                            </>
                          ) : (
                            "Marcar etapa como lida"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && temPercurso && !temSemanasCadastradas && (
        <Card className="rounded-xl border-scriptorium-gold/20 bg-black/25 shadow-card-lift">
          <CardHeader>
            <CardTitle className="font-display text-xl text-scriptorium-cream">
              Etapas em preparação
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-scriptorium-cream/75">
              O seu percurso está definido, mas o conteúdo das etapas para{" "}
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
              ? "Reserve momentos regulares para cada etapa. O progresso de leitura fica associado à sua conta."
              : "Salve o percurso acima para ver as etapas quando estiverem disponíveis."}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
