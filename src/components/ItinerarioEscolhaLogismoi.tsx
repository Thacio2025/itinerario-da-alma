import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogismoiGlyph } from "@/lib/logismoiLucideIcons";
import { useLogismoiOpcoes } from "@/hooks/useLogismoiOpcoes";
import { salvarPercursoLogismoi } from "@/lib/percursoUsuario";

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
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);

  useEffect(() => {
    if (logismoiIdAtual != null) {
      setSelectedId(logismoiIdAtual);
    }
  }, [logismoiIdAtual]);

  useEffect(() => {
    if (itinerarioLoading || items.length === 0) return;
    if (logismoiIdAtual != null) return;
    const first = items[0]?.id;
    if (first != null) setSelectedId(first);
  }, [items, logismoiIdAtual, itinerarioLoading]);

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
        <CardDescription className="max-w-2xl text-base leading-relaxed text-scriptorium-cream/75">
          Os oito logismoi tradicionais mapeiam movimentos da alma. Escolha em
          qual deles deseja aprofundar este itinerário — pode alterar depois. O
          conteúdo das etapas é definido pelo terapeuta na base de dados.
        </CardDescription>
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
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            role="radiogroup"
            aria-label="Logismoi do percurso"
          >
            {items.map((l) => {
              const selected = selectedId === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setSelectedId(l.id);
                    setSaveOk(false);
                    setSaveError(null);
                  }}
                  className={cn(
                    "flex w-full flex-col gap-3 rounded-xl border px-4 py-4 text-left transition-all duration-200",
                    selected
                      ? "border-scriptorium-gold/45 bg-scriptorium-gold/[0.09] shadow-gold-glow ring-1 ring-scriptorium-gold/25"
                      : "border-white/10 bg-black/25 hover:border-scriptorium-gold-muted/40 hover:bg-white/[0.03]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        selected
                          ? "border-scriptorium-gold/40 bg-scriptorium-gold/15 text-scriptorium-gold"
                          : "border-white/10 bg-black/40 text-scriptorium-gold/90",
                      )}
                    >
                      <LogismoiGlyph logismoiId={l.id} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold leading-tight text-scriptorium-cream">
                        {l.nome_portugues}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-scriptorium-gold-muted/90">
                        {l.nome_grego}
                      </span>
                    </div>
                  </div>
                  {l.descricao_breve && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-scriptorium-cream/60">
                      {l.descricao_breve}
                    </p>
                  )}
                </button>
              );
            })}
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
