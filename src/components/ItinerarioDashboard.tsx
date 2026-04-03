import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  Heart,
  Loader2,
  Lock,
  Moon,
  Printer,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { LogismoiGlyph } from "@/lib/logismoiLucideIcons";
import {
  primeiraEtapaEmAberto,
  etapaEstaDesbloqueada,
} from "@/lib/itinerarioEtapas";
import { citacaoParaEtapaLogismoi } from "@/lib/citacoesPadresDeserto";
import { printEncorajamentoEtapa } from "@/lib/printEncorajamentoEtapa";
import { mensagemValidacaoProva } from "@/lib/semanaProgresso";
import type { ConcluirEtapaPayload } from "@/lib/semanaProgresso";
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

function EtapaConteudoMarkdown({ s }: { s: SemanaItinerarioRow }) {
  return (
    <div className="space-y-6">
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
            O texto completo desta etapa ainda não foi publicado pelo terapeuta.
          </p>
        )}
    </div>
  );
}

type MarcarResult =
  | { ok: true }
  | { ok: false; message: string };

type ItinerarioDashboardProps = {
  userEmail?: string | null;
  percurso?: PercursoUsuario | null;
  semanas?: SemanaItinerarioRow[];
  semanasLidas?: Record<number, boolean>;
  etapaConcluidaEm?: Record<number, string | null>;
  loading?: boolean;
  fetchError?: string | null;
  onMarcarSemanaLida?: (
    numeroSemana: number,
    payload: ConcluirEtapaPayload,
  ) => Promise<MarcarResult>;
  marcandoSemana?: number | null;
  className?: string;
};

export function ItinerarioDashboard({
  userEmail,
  percurso = null,
  semanas = [],
  semanasLidas = {},
  etapaConcluidaEm = {},
  loading = false,
  fetchError = null,
  onMarcarSemanaLida,
  marcandoSemana = null,
  className,
}: ItinerarioDashboardProps) {
  const [expandida, setExpandida] = useState<number | null>(null);
  const [erroMarcar, setErroMarcar] = useState<string | null>(null);
  const [reflexao, setReflexao] = useState("");
  const [sinalObservado, setSinalObservado] = useState("");
  const [confianca, setConfianca] = useState(5);
  const [encorajamentoPosEtapa, setEncorajamentoPosEtapa] = useState<{
    numeroEtapa: number;
    tituloEtapa: string;
  } | null>(null);

  const temPercurso = Boolean(percurso);
  const temSemanasCadastradas = semanas.length > 0;

  const foco = primeiraEtapaEmAberto(semanas, semanasLidas);
  const etapaFoco = foco
    ? semanas.find((x) => x.numero_semana === foco)
    : undefined;

  useEffect(() => {
    setReflexao("");
    setSinalObservado("");
    setConfianca(5);
    setErroMarcar(null);
  }, [foco]);

  const toggle = (n: number) => {
    setExpandida((prev) => (prev === n ? null : n));
    setErroMarcar(null);
  };

  const concluirEtapaAtual = async () => {
    if (!onMarcarSemanaLida || foco == null) return;
    setErroMarcar(null);
    const localErr = mensagemValidacaoProva(reflexao, sinalObservado);
    if (localErr) {
      setErroMarcar(localErr);
      return;
    }
    const payload: ConcluirEtapaPayload = {
      reflexao_texto: reflexao,
      sinal_progresso_observado: sinalObservado,
      confianca_virtude: confianca,
    };
    const numeroCompletado = foco;
    const tituloCompletado = etapaFoco?.titulo_semana ?? "";
    const res = await onMarcarSemanaLida(foco, payload);
    if (!res.ok) {
      setErroMarcar(res.message);
      return;
    }
    setEncorajamentoPosEtapa({
      numeroEtapa: numeroCompletado,
      tituloEtapa: tituloCompletado,
    });
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
                Etapa atual do percurso:{" "}
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
        <div className="space-y-8">
          {encorajamentoPosEtapa && percurso?.logismoi && (
            <Card className="rounded-xl border-scriptorium-gold/30 bg-gradient-to-br from-scriptorium-gold/[0.09] to-black/35 shadow-card-lift">
              <CardHeader className="space-y-2 pb-2">
                <CardTitle className="font-display text-xl text-scriptorium-cream">
                  Etapa {encorajamentoPosEtapa.numeroEtapa} concluída
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-scriptorium-cream/80">
                  A frase combina o seu eixo espiritual (logismoi) com o número
                  desta etapa. Use &quot;Guardar como PDF&quot; na janela de
                  impressão, se o navegador permitir.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const c = citacaoParaEtapaLogismoi(
                    encorajamentoPosEtapa.numeroEtapa,
                    percurso.logismoi_id,
                  );
                  return (
                    <blockquote className="border-l-2 border-scriptorium-gold/45 pl-4 text-sm leading-relaxed text-scriptorium-cream/85">
                      <p className="italic">&ldquo;{c.texto}&rdquo;</p>
                      <footer className="mt-2 text-xs not-italic text-scriptorium-gold-muted">
                        — {c.autor}
                      </footer>
                    </blockquote>
                  );
                })()}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  className="gap-2 bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                  onClick={() => {
                    const c = citacaoParaEtapaLogismoi(
                      encorajamentoPosEtapa.numeroEtapa,
                      percurso.logismoi_id,
                    );
                    printEncorajamentoEtapa({
                      numeroEtapa: encorajamentoPosEtapa.numeroEtapa,
                      tituloEtapa: encorajamentoPosEtapa.tituloEtapa,
                      nomeLogismoi: percurso.logismoi.nome_portugues,
                      dataConclusao: new Date(),
                      citacao: c,
                    });
                  }}
                >
                  <Printer className="h-4 w-4" aria-hidden />
                  Imprimir ou guardar PDF
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="gap-2 text-scriptorium-cream/80 hover:bg-white/10 hover:text-scriptorium-cream"
                  onClick={() => setEncorajamentoPosEtapa(null)}
                >
                  <X className="h-4 w-4" aria-hidden />
                  Fechar
                </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <p className="max-w-2xl text-sm leading-relaxed text-scriptorium-cream/65">
            O caminho abre etapa por etapa. Registe uma reflexão ou um sinal de
            progresso para concluir — não basta marcar sem escrever. As etapas
            seguintes desbloqueiam quando a anterior estiver concluída.
          </p>

          {foco != null && etapaFoco && (
            <Card className="rounded-xl border-scriptorium-gold/25 bg-gradient-to-b from-scriptorium-gold/[0.07] to-black/30 shadow-card-lift">
              <CardHeader className="space-y-2 pb-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-scriptorium-gold-muted">
                  Esta etapa no caminho · Etapa {etapaFoco.numero_semana}
                  {etapaFoco.tipo_fase ? ` · ${etapaFoco.tipo_fase}` : ""}
                </p>
                <CardTitle className="font-display text-2xl text-scriptorium-cream md:text-[1.65rem]">
                  {etapaFoco.titulo_semana}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-0">
                <EtapaConteudoMarkdown s={etapaFoco} />

                <div className="space-y-4 rounded-lg border border-white/10 bg-black/35 p-4 sm:p-5">
                  <p className="font-display text-base font-medium text-scriptorium-cream">
                    Antes de concluir esta etapa
                  </p>
                  <p className="text-sm leading-relaxed text-scriptorium-cream/70">
                    Escreva com sinceridade. Basta preencher com profundidade{" "}
                    <span className="text-scriptorium-cream/90">
                      um dos dois primeiros campos
                    </span>{" "}
                    (mínimo de 20 caracteres).
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="reflexao-etapa">Reflexão breve</Label>
                    <Textarea
                      id="reflexao-etapa"
                      value={reflexao}
                      onChange={(e) => setReflexao(e.target.value)}
                      placeholder="O que esta etapa despertou em si?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sinal-etapa">Sinal de progresso observado</Label>
                    <Textarea
                      id="sinal-etapa"
                      value={sinalObservado}
                      onChange={(e) => setSinalObservado(e.target.value)}
                      placeholder="Que mudança concreta notou na oração, nas relações ou na disposição interior?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="confianca-etapa">
                        Confiança na virtude oposta (0–10)
                      </Label>
                      <span className="text-sm tabular-nums text-scriptorium-gold-muted">
                        {confianca}
                      </span>
                    </div>
                    <input
                      id="confianca-etapa"
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={confianca}
                      onChange={(e) =>
                        setConfianca(Number.parseInt(e.target.value, 10))
                      }
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-scriptorium-gold"
                    />
                    <p className="text-xs text-scriptorium-cream/50">
                      Opcional; ajuda a acompanhar o movimento interior ao longo
                      das etapas.
                    </p>
                  </div>
                  <Button
                    type="button"
                    disabled={
                      marcandoSemana === foco || !onMarcarSemanaLida
                    }
                    className="w-full bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90 sm:w-auto"
                    onClick={() => void concluirEtapaAtual()}
                  >
                    {marcandoSemana === foco ? (
                      <>
                        <Loader2 className="animate-spin" />
                        A registar…
                      </>
                    ) : (
                      "Concluir etapa e desbloquear a seguinte"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {foco == null && semanas.length > 0 && (
            <Card className="rounded-xl border-emerald-500/20 bg-emerald-950/20 shadow-card-lift">
              <CardHeader>
                <CardTitle className="font-display text-xl text-scriptorium-cream">
                  Itinerário deste eixo concluído
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-scriptorium-cream/75">
                  Concluiu as etapas disponíveis. Pode rever o conteúdo abaixo;
                  o registo das suas reflexões permanece na conta.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-scriptorium-cream">
              Caminho das etapas
            </h3>
            <p className="text-sm text-scriptorium-cream/55">
              Etapas futuras permanecem fechadas até concluir a anterior. Abra
              uma etapa já concluída para reler o texto ou voltar a imprimir o
              lembrete em PDF.
            </p>
            <div className="flex flex-col gap-2">
              {semanas.map((s) => {
                const lida = Boolean(semanasLidas[s.numero_semana]);
                const desbloqueada = etapaEstaDesbloqueada(
                  s.numero_semana,
                  semanasLidas,
                );
                const aberta = expandida === s.numero_semana;
                const eFoco = foco === s.numero_semana;
                const bloqueada = !desbloqueada;

                return (
                  <div
                    key={s.numero_semana}
                    className={cn(
                      "overflow-hidden rounded-xl border bg-black/25 shadow-card-lift",
                      eFoco && !lida
                        ? "border-scriptorium-gold/35 ring-1 ring-scriptorium-gold/15"
                        : "border-white/10",
                      bloqueada && "opacity-90",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        bloqueada ? undefined : toggle(s.numero_semana)
                      }
                      disabled={bloqueada}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors sm:items-center sm:gap-4",
                        bloqueada
                          ? "cursor-not-allowed"
                          : "hover:bg-white/[0.04]",
                      )}
                    >
                      {bloqueada ? (
                        <Lock
                          className="mt-0.5 h-5 w-5 shrink-0 text-scriptorium-cream/45"
                          aria-hidden
                        />
                      ) : (
                        <ChevronDown
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0 text-scriptorium-gold-muted transition-transform sm:mt-0",
                            aberta && "rotate-180",
                          )}
                          aria-hidden
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-scriptorium-gold-muted">
                          Etapa {s.numero_semana}
                          {s.tipo_fase ? ` · ${s.tipo_fase}` : ""}
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold leading-snug text-scriptorium-cream">
                          {s.titulo_semana}
                        </p>
                        {bloqueada && (
                          <p className="mt-2 text-sm text-scriptorium-cream/55">
                            Disponível após concluir a etapa {s.numero_semana - 1}.
                          </p>
                        )}
                        {eFoco && !lida && !bloqueada && (
                          <p className="mt-2 text-sm text-scriptorium-gold-muted">
                            Conteúdo e registo no bloco &quot;Esta etapa no
                            caminho&quot; acima.
                          </p>
                        )}
                      </div>
                      {lida && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400/95">
                          <Check className="h-3.5 w-3.5" aria-hidden />
                          Concluída
                        </span>
                      )}
                    </button>
                    {aberta && !bloqueada && (
                      <div className="space-y-6 border-t border-white/10 bg-black/30 px-4 py-6 sm:px-6">
                        {eFoco && !lida && (
                          <p className="text-sm text-scriptorium-cream/60">
                            Leia e registe a reflexão no cartão destacado acima
                            — não é necessário repetir aqui.
                          </p>
                        )}
                        {!eFoco && (
                          <>
                            <EtapaConteudoMarkdown s={s} />
                            {!lida && (
                              <p className="text-sm text-scriptorium-cream/55">
                                Para concluir etapas em aberto, use o bloco
                                principal no topo da página.
                              </p>
                            )}
                          </>
                        )}
                        {eFoco && lida && (
                          <p className="text-sm text-scriptorium-cream/60">
                            O conteúdo desta etapa está no bloco principal
                            acima. Pode imprimir o lembrete abaixo.
                          </p>
                        )}
                        {lida && percurso?.logismoi && (
                          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2 border-scriptorium-gold/35 text-scriptorium-gold hover:bg-scriptorium-gold/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                const ds =
                                  etapaConcluidaEm[s.numero_semana];
                                printEncorajamentoEtapa({
                                  numeroEtapa: s.numero_semana,
                                  tituloEtapa: s.titulo_semana,
                                  nomeLogismoi: percurso.logismoi.nome_portugues,
                                  dataConclusao: ds
                                    ? new Date(ds)
                                    : new Date(),
                                  citacao: citacaoParaEtapaLogismoi(
                                    s.numero_semana,
                                    percurso.logismoi_id,
                                  ),
                                });
                              }}
                            >
                              <Printer className="h-4 w-4" aria-hidden />
                              Imprimir lembrete (PDF)
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
              ? "Reserve tempo para uma etapa de cada vez. O progresso e os seus escritos ficam associados à sua conta."
              : "Salve o percurso acima para ver as etapas quando estiverem disponíveis."}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
