import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  Download,
  Loader2,
  Lock,
  Moon,
  Printer,
  Sparkles,
  Users,
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
  aguardandoIntervaloEntreEtapas,
  mensagemBloqueioEtapa,
} from "@/lib/itinerarioEtapas";
import {
  slidesDaEtapa,
  type EtapaSlideId,
} from "@/lib/etapaSlides";
import { citacaoParaEtapaLogismoi } from "@/lib/citacoesPadresDeserto";
import { fraseReforcoConclusao } from "@/lib/frasesReforcoConclusao";
import { obterPlaceholdersReflexaoEtapa } from "@/lib/placeholdersReflexaoEtapa";
import { printCertificadoPrimeiraEtapa } from "@/lib/printCertificadoPrimeiraEtapa";
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

function EtapaSlideSection({
  slide,
  s,
}: {
  slide: EtapaSlideId;
  s: SemanaItinerarioRow;
}) {
  switch (slide) {
    case "leitura":
      return (
        <div className="space-y-4">
          {s.leitura_fonte && (
            <p className="text-xs font-medium uppercase tracking-wide text-scriptorium-gold-muted">
              Fonte: {s.leitura_fonte}
            </p>
          )}
          <section>
            <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-scriptorium-gold">
              Leitura
            </h3>
            <BlocoMarkdown texto={s.leitura_texto} />
          </section>
        </div>
      );
    case "doutrina":
      return (
        <section className="space-y-3">
          {s.doutrina_titulo && (
            <h3 className="font-display text-lg text-scriptorium-cream">
              {s.doutrina_titulo}
            </h3>
          )}
          <BlocoMarkdown texto={s.doutrina_corpo} />
        </section>
      );
    case "exercicio":
      return (
        <section className="space-y-3">
          {s.exercicio_titulo && (
            <h3 className="font-display text-lg text-scriptorium-cream">
              {s.exercicio_titulo}
            </h3>
          )}
          <BlocoMarkdown texto={s.exercicio_descricao} />
        </section>
      );
    case "sinal":
      return (
        <section className="space-y-3">
          {s.sinal_progresso_titulo && (
            <h3 className="font-display text-lg text-scriptorium-cream">
              {s.sinal_progresso_titulo}
            </h3>
          )}
          <BlocoMarkdown texto={s.sinal_progresso_descricao} />
        </section>
      );
    default:
      return null;
  }
}

function CartaoAguardando24h({
  numeroEtapa,
  liberadaEm,
}: {
  numeroEtapa: number;
  liberadaEm: Date;
}) {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setAgora(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, liberadaEm.getTime() - agora);
  const h = Math.floor(ms / 3_600_000);
  const min = Math.floor((ms % 3_600_000) / 60_000);
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Card className="rounded-xl border-scriptorium-gold/35 bg-gradient-to-br from-scriptorium-gold/[0.08] to-black/40 shadow-card-lift">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2 text-scriptorium-gold-muted">
          <Clock className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
          <CardTitle className="font-display text-xl text-scriptorium-cream">
            Etapa {numeroEtapa} — aguarde 24 horas
          </CardTitle>
        </div>
        <CardDescription className="text-base leading-relaxed text-scriptorium-cream/80">
          Para iniciar a etapa {numeroEtapa}, é preciso esperar{" "}
          <strong className="font-medium text-scriptorium-cream/95">
            24 horas
          </strong>{" "}
          após a conclusão da etapa anterior. Esse intervalo ajuda a deixar o
          combate espiritual respirar antes do próximo passo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 border-t border-white/10 pt-2">
        <p className="text-sm text-scriptorium-gold-muted">
          Previsão de abertura:{" "}
          <span className="font-medium text-scriptorium-cream/90">
            {fmt.format(liberadaEm)}
          </span>
        </p>
        {ms > 0 && (
          <p className="text-sm tabular-nums text-scriptorium-cream/70">
            Faltam cerca de{" "}
            <span className="text-scriptorium-gold-muted">
              {h > 0 ? `${h} h ` : ""}
              {min} min
            </span>
          </p>
        )}
      </CardContent>
    </Card>
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
  const [balaoParabens, setBalaoParabens] = useState<{
    numeroEtapa: number;
    tituloEtapa: string;
    fraseReforco: string;
  } | null>(null);

  const temPercurso = Boolean(percurso);
  const temSemanasCadastradas = semanas.length > 0;

  const foco = primeiraEtapaEmAberto(
    semanas,
    semanasLidas,
    etapaConcluidaEm,
  );
  const etapaFoco = foco
    ? semanas.find((x) => x.numero_semana === foco)
    : undefined;

  const aguardando24h = useMemo(
    () =>
      temPercurso && temSemanasCadastradas
        ? aguardandoIntervaloEntreEtapas(
            semanas,
            semanasLidas,
            etapaConcluidaEm,
          )
        : null,
    [
      temPercurso,
      temSemanasCadastradas,
      semanas,
      semanasLidas,
      etapaConcluidaEm,
    ],
  );

  const slidesEtapa = useMemo(
    () => (etapaFoco ? slidesDaEtapa(etapaFoco) : []),
    [etapaFoco],
  );

  const [indiceSlide, setIndiceSlide] = useState(0);
  /** Com percurso ativo, a lista completa fica recolhida para focar na etapa atual. */
  const [mostrarCaminhoEtapas, setMostrarCaminhoEtapas] = useState(false);

  const placeholdersEtapa = useMemo(() => {
    if (!etapaFoco || !percurso) return null;
    return obterPlaceholdersReflexaoEtapa(
      percurso.logismoi_id,
      etapaFoco.numero_semana,
    );
  }, [etapaFoco, percurso]);

  useEffect(() => {
    setReflexao("");
    setSinalObservado("");
    setConfianca(5);
    setErroMarcar(null);
    setIndiceSlide(0);
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
    setBalaoParabens({
      numeroEtapa: numeroCompletado,
      tituloEtapa: tituloCompletado,
      fraseReforco: fraseReforcoConclusao(
        percurso?.logismoi_id ?? 1,
        numeroCompletado,
      ),
    });
  };

  useEffect(() => {
    if (!balaoParabens) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBalaoParabens(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [balaoParabens]);

  const emitirCertificadoPrimeiraEtapa = () => {
    if (!encorajamentoPosEtapa || encorajamentoPosEtapa.numeroEtapa !== 1) {
      return;
    }
    printCertificadoPrimeiraEtapa({
      nomeLogismoi: percurso?.logismoi?.nome_portugues ?? "Itinerário",
      tituloEtapa: encorajamentoPosEtapa.tituloEtapa,
      dataConclusao: new Date(),
      emailParticipante: userEmail ?? null,
    });
  };

  return (
    <div
      id="painel-itinerario-principal"
      className={cn("relative space-y-10 scroll-mt-24", className)}
    >
      {balaoParabens && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="parabens-dialog-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            aria-label="Fechar parabéns"
            onClick={() => setBalaoParabens(null)}
          />
          <div
            className={cn(
              "relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem]",
              "border-2 border-scriptorium-gold/85 bg-gradient-to-b from-[#252019] to-[#14110d]",
              "px-8 pb-10 pt-12 shadow-gold-glow shadow-2xl",
            )}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-scriptorium-gold/10 blur-2xl"
              aria-hidden
            />
            <div className="flex justify-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-scriptorium-gold/40 bg-scriptorium-gold/15 text-scriptorium-gold">
                <Sparkles className="h-8 w-8" strokeWidth={1.6} aria-hidden />
              </span>
            </div>
            <h2
              id="parabens-dialog-title"
              className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-scriptorium-cream md:text-[2.5rem]"
            >
              Parabéns!!
            </h2>
            <p className="mt-3 text-center text-base leading-relaxed text-scriptorium-cream/75">
              Concluiu a etapa{" "}
              <span className="font-medium text-scriptorium-gold-muted">
                {balaoParabens.numeroEtapa}
              </span>
              {balaoParabens.tituloEtapa ? (
                <>
                  :{" "}
                  <span className="text-scriptorium-cream/90">
                    {balaoParabens.tituloEtapa}
                  </span>
                </>
              ) : null}
              . Deus abençoe o próximo passo.
            </p>
            <p className="mt-5 border-t border-scriptorium-gold/20 pt-5 text-center font-display text-sm italic leading-relaxed tracking-[0.02em] text-scriptorium-gold-muted">
              {balaoParabens.fraseReforco}
            </p>
            {balaoParabens.numeroEtapa === 1 && (
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  type="button"
                  className="w-full gap-2 bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                  onClick={() => {
                    emitirCertificadoPrimeiraEtapa();
                  }}
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  Baixar certificado da 1ª etapa (PDF)
                </Button>
                <p className="text-center text-xs text-scriptorium-cream/50">
                  Na janela de impressão, escolha &quot;Guardar como PDF&quot;,
                  se disponível.
                </p>
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 bg-black/30 text-scriptorium-cream hover:bg-white/10"
                onClick={() => setBalaoParabens(null)}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}
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
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
                      nomeLogismoi:
                        percurso.logismoi?.nome_portugues ?? "Itinerário",
                      dataConclusao: new Date(),
                      citacao: c,
                    });
                  }}
                >
                  <Printer className="h-4 w-4" aria-hidden />
                  Imprimir ou guardar PDF
                </Button>
                {encorajamentoPosEtapa.numeroEtapa === 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-scriptorium-gold/45 text-scriptorium-gold hover:bg-scriptorium-gold/10"
                    onClick={() => emitirCertificadoPrimeiraEtapa()}
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Certificado da 1ª etapa (PDF)
                  </Button>
                )}
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
            O caminho abre etapa por etapa. Avance com &quot;Seguir&quot; até o
            registro final. Depois de concluir, aguarde 24 horas para a etapa
            seguinte se abrir. Registre uma reflexão ou um sinal de progresso
            na última parte — não basta marcar sem escrever.
          </p>

          {aguardando24h && (
            <CartaoAguardando24h
              numeroEtapa={aguardando24h.numeroEtapa}
              liberadaEm={aguardando24h.liberadaEm}
            />
          )}

          {foco != null && etapaFoco && (() => {
            const slideAtual = slidesEtapa[indiceSlide] ?? "conclusao";
            const totalSlides = slidesEtapa.length;
            const passoNumero = indiceSlide + 1;
            return (
            <Card
              id="primeira-etapa-conteudo"
              className="scroll-mt-28 rounded-xl border-scriptorium-gold/25 bg-gradient-to-b from-scriptorium-gold/[0.07] to-[rgba(20,17,13,0.92)] shadow-card-lift backdrop-blur-[1px]"
            >
              <CardHeader className="space-y-2 pb-2 tracking-[0.02em]">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-scriptorium-gold-muted">
                  Esta etapa no caminho · Etapa {etapaFoco.numero_semana}
                  {etapaFoco.tipo_fase ? ` · ${etapaFoco.tipo_fase}` : ""}
                </p>
                <CardTitle className="font-display text-2xl text-scriptorium-cream md:text-[1.65rem]">
                  {etapaFoco.titulo_semana}
                </CardTitle>
                <p className="text-xs text-scriptorium-gold-muted/90">
                  Passo {passoNumero} de {totalSlides}
                </p>
              </CardHeader>
              <CardContent className="space-y-8 pt-0 tracking-[0.02em]">
                {slideAtual !== "conclusao" && (
                  <div className="min-h-[12rem] space-y-6">
                    <EtapaSlideSection slide={slideAtual} s={etapaFoco} />
                    <div className="flex justify-end border-t border-white/10 pt-6">
                      <Button
                        type="button"
                        className="gap-2 bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                        onClick={() =>
                          setIndiceSlide((i) =>
                            Math.min(i + 1, slidesEtapa.length - 1),
                          )
                        }
                      >
                        Seguir
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                )}

                {slideAtual === "conclusao" && (
                <div className="space-y-4 rounded-lg border border-white/10 bg-[rgba(0,0,0,0.88)] p-4 sm:p-5">
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
                      placeholder={
                        placeholdersEtapa?.reflexao ??
                        "O que esta etapa despertou em si?"
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sinal-etapa">Sinal de progresso observado</Label>
                    <Textarea
                      id="sinal-etapa"
                      value={sinalObservado}
                      onChange={(e) => setSinalObservado(e.target.value)}
                      placeholder={
                        placeholdersEtapa?.sinal ??
                        "Que mudança concreta notou na oração, nas relações ou na disposição interior?"
                      }
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
                  <p className="flex items-start gap-2.5 text-xs leading-relaxed text-scriptorium-cream/50">
                    <Users
                      className="mt-0.5 h-4 w-4 shrink-0 text-scriptorium-gold-muted/80"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span>
                      Você não está sozinho neste deserto. Outros combatentes
                      estão nesta etapa hoje.
                    </span>
                  </p>
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
                        Registrando…
                      </>
                    ) : (
                      "Concluir etapa e desbloquear a seguinte"
                    )}
                  </Button>
                </div>
                )}
              </CardContent>
            </Card>
            );
          })()}

          {foco == null && semanas.length > 0 && !aguardando24h && (
            <Card className="rounded-xl border-emerald-500/20 bg-emerald-950/20 shadow-card-lift">
              <CardHeader>
                <CardTitle className="font-display text-xl text-scriptorium-cream">
                  Itinerário deste eixo concluído
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-scriptorium-cream/75">
                  Concluiu as etapas disponíveis. Pode rever o conteúdo abaixo;
                  o registro das suas reflexões permanece na conta.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="flex h-auto w-full items-center justify-between gap-3 border-white/15 bg-black/25 px-4 py-3 text-left text-scriptorium-cream hover:bg-white/[0.06]"
              onClick={() => setMostrarCaminhoEtapas((v) => !v)}
              aria-expanded={mostrarCaminhoEtapas}
            >
              <span className="font-display text-base font-semibold">
                {mostrarCaminhoEtapas
                  ? "Ocultar caminho das etapas"
                  : "Ver caminho das etapas"}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-scriptorium-gold-muted transition-transform",
                  mostrarCaminhoEtapas && "rotate-180",
                )}
                aria-hidden
              />
            </Button>
            {mostrarCaminhoEtapas && (
              <>
            <h3 className="sr-only">Caminho das etapas</h3>
            <p className="text-sm text-scriptorium-cream/55">
              Etapas futuras abrem após concluir a anterior e aguardar 24 horas.
              Abra uma etapa já concluída para reler o texto ou voltar a imprimir
              o lembrete em PDF.
            </p>
            <div className="flex flex-col gap-2">
              {semanas.map((s) => {
                const lida = Boolean(semanasLidas[s.numero_semana]);
                const desbloqueada = etapaEstaDesbloqueada(
                  s.numero_semana,
                  semanasLidas,
                  etapaConcluidaEm,
                );
                const aberta = expandida === s.numero_semana;
                const eFoco = foco === s.numero_semana;
                const bloqueada = !desbloqueada;
                const textoBloqueio = bloqueada
                  ? mensagemBloqueioEtapa(
                      s.numero_semana,
                      semanasLidas,
                      etapaConcluidaEm,
                    ) ??
                    `Disponível após concluir a etapa ${s.numero_semana - 1}.`
                  : null;

                return (
                  <div
                    key={s.numero_semana}
                    className={cn(
                      "overflow-hidden rounded-xl border bg-[rgba(20,17,13,0.88)] shadow-card-lift",
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
                        {textoBloqueio && (
                          <p className="mt-2 text-sm text-scriptorium-cream/55">
                            {textoBloqueio}
                          </p>
                        )}
                        {eFoco && !lida && !bloqueada && mostrarCaminhoEtapas && (
                          <p className="mt-2 text-sm text-scriptorium-gold-muted">
                            Conteúdo e registro no bloco &quot;Esta etapa no
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
                      <div className="space-y-6 border-t border-white/10 bg-[rgba(0,0,0,0.85)] px-4 py-6 tracking-[0.02em] sm:px-6">
                        {eFoco && !lida && (
                          <p className="text-sm text-scriptorium-cream/60">
                            Leia e registre a reflexão no cartão destacado acima
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
                                  nomeLogismoi:
                                    percurso.logismoi?.nome_portugues ??
                                    "Itinerário",
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
              </>
            )}
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
