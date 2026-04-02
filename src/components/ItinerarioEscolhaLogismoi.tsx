import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogismoiGlyph } from "@/lib/logismoiLucideIcons";
import { useLogismoiOpcoes } from "@/hooks/useLogismoiOpcoes";
import type { LogismoiOpcao } from "@/hooks/useLogismoiOpcoes";
import { salvarPercursoLogismoi } from "@/lib/percursoUsuario";

const DIAGNOSTICO_URL = "https://diagnosticoespiritual.com.br/";

function labelLogismoi(l: LogismoiOpcao) {
  return `${l.nome_portugues} — ${l.nome_grego}`;
}

type ItinerarioEscolhaLogismoiProps = {
  logismoiIdAtual?: number | null;
  itinerarioLoading?: boolean;
  onPercursoSalvo?: () => void;
  className?: string;
};

export function ItinerarioEscolhaLogismoi({
  logismoiIdAtual,
  itinerarioLoading = false,
  onPercursoSalvo,
  className,
}: ItinerarioEscolhaLogismoiProps) {
  const { items, loading: loadingLista, error: erroLista } = useLogismoiOpcoes();
  const [selectedId, setSelectedId] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (logismoiIdAtual != null && items.length > 0) {
      const found = items.find((x) => x.id === logismoiIdAtual);
      if (found) {
        setSelectedId(logismoiIdAtual);
        setInputValue(labelLogismoi(found));
      }
    }
  }, [logismoiIdAtual, items]);

  useEffect(() => {
    if (itinerarioLoading || items.length === 0) return;
    if (logismoiIdAtual != null) return;
    const first = items[0];
    if (first) {
      setSelectedId(first.id);
      setInputValue(labelLogismoi(first));
    }
  }, [items, logismoiIdAtual, itinerarioLoading]);

  const filtered = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (l) =>
        l.nome_portugues.toLowerCase().includes(q) ||
        l.nome_grego.toLowerCase().includes(q) ||
        (l.descricao_breve?.toLowerCase().includes(q) ?? false),
    );
  }, [items, inputValue]);

  const selecionar = (l: LogismoiOpcao) => {
    setSelectedId(l.id);
    setInputValue(labelLogismoi(l));
    setOpen(false);
    setSaveOk(false);
    setSaveError(null);
  };

  const onSalvar = async () => {
    setSubmitting(true);
    setSaveError(null);
    setSaveOk(false);
    const result = await salvarPercursoLogismoi(selectedId);
    setSubmitting(false);
    if (!result.ok) {
      setSaveError(result.message);
      return;
    }
    setSaveOk(true);
    onPercursoSalvo?.();
  };

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-white/10 bg-gradient-to-b from-white/[0.06] to-black/20 shadow-card-lift backdrop-blur-md",
        className,
      )}
    >
      <CardHeader className="space-y-3 border-b border-white/[0.06] pb-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-scriptorium-cream md:text-3xl">
          Seu percurso
        </h2>
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-scriptorium-cream/80">
          <p>
            Depois de ter feito o{" "}
            <strong className="font-medium text-scriptorium-cream/95">
              diagnóstico da alma
            </strong>{" "}
            no site{" "}
            <a
              href={DIAGNOSTICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-scriptorium-gold underline-offset-4 hover:underline"
            >
              Diagnóstico Espiritual
              <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
            </a>
            , você é convidado a iniciar um itinerário em{" "}
            <strong className="font-medium text-scriptorium-cream/95">
              12 etapas
            </strong>{" "}
            para lutar contra o logismoi dominante identificado no seu exame —
            com leitura, doutrina e exercícios, no ritmo da tradição dos Padres
            do deserto.
          </p>
          <p className="text-scriptorium-cream/70">
            Indique abaixo qual logismoi será o eixo deste percurso (o mesmo do
            seu diagnóstico ou o que o diretor espiritual recomendar).
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        {loadingLista && (
          <div className="flex items-center gap-2 text-scriptorium-cream/60">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Carregando opções…
          </div>
        )}
        {erroLista && (
          <p className="text-sm text-red-400/90" role="alert">
            Não foi possível carregar os logismoi: {erroLista}
          </p>
        )}
        {!loadingLista && items.length > 0 && (
          <div ref={boxRef} className="relative space-y-2">
            <label
              htmlFor="busca-logismoi"
              className="text-sm font-medium text-scriptorium-cream/85"
            >
              Buscar e selecionar o logismoi
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-scriptorium-gold-muted"
                aria-hidden
              />
              <input
                id="busca-logismoi"
                type="search"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setOpen(true);
                  setSaveOk(false);
                  setSaveError(null);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Digite para filtrar (ex.: Ira, Luxúria, Orgê…)"
                className="w-full rounded-xl border border-white/15 bg-black/35 py-3 pl-10 pr-4 text-sm text-scriptorium-cream placeholder:text-scriptorium-cream/40 outline-none ring-scriptorium-gold/30 transition-shadow focus:border-scriptorium-gold/40 focus:ring-2"
              />
            </div>
            {open && filtered.length > 0 && (
              <ul
                className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[#14110d] py-1 shadow-2xl shadow-black/60 ring-1 ring-white/5"
                role="listbox"
              >
                {filtered.map((l) => {
                  const ativo = selectedId === l.id;
                  return (
                    <li key={l.id} role="option" aria-selected={ativo}>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                          ativo
                            ? "bg-scriptorium-gold/15 text-scriptorium-cream"
                            : "text-scriptorium-cream/90 hover:bg-white/5",
                        )}
                        onClick={() => selecionar(l)}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-scriptorium-gold">
                          <LogismoiGlyph logismoiId={l.id} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium leading-tight">
                            {l.nome_portugues}
                          </span>
                          <span className="text-xs text-scriptorium-gold-muted">
                            {l.nome_grego}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {open && filtered.length === 0 && inputValue.trim() !== "" && (
              <p className="absolute z-30 mt-1 w-full rounded-xl border border-white/10 bg-[#14110d] px-3 py-3 text-sm text-scriptorium-cream/60 shadow-xl">
                Nenhum logismoi corresponde à busca.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            size="lg"
            className="min-w-[200px] bg-scriptorium-gold font-semibold text-scriptorium-bg shadow-lg shadow-black/40 hover:bg-scriptorium-gold/92"
            disabled={submitting || loadingLista || items.length === 0}
            onClick={() => void onSalvar()}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" />
                Salvando…
              </>
            ) : (
              "Salvar percurso"
            )}
          </Button>
        </div>

        {saveError && (
          <p className="text-sm text-red-400/90" role="alert">
            {saveError}
          </p>
        )}
        {saveOk && (
          <p className="flex items-center gap-2 text-sm text-emerald-400/90">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            Percurso salvo. O painel abaixo foi atualizado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
