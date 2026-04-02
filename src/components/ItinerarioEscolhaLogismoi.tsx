import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLogismoiOpcoes } from "@/hooks/useLogismoiOpcoes";
import { salvarPercursoLogismoi } from "@/lib/percursoUsuario";

type ItinerarioEscolhaLogismoiProps = {
  /** Logismoi do percurso já guardado (para pré-selecionar). */
  logismoiIdAtual?: number | null;
  /** Enquanto true, não aplica o logismoi padrão (evita flash antes de saber se já há percurso). */
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
      className={cn("overflow-hidden border-scriptorium-border/80", className)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-scriptorium-gold" aria-hidden />
          <CardTitle className="text-xl md:text-2xl">
            Seu percurso
          </CardTitle>
        </div>
        <CardDescription>
          Escolha o logismoi em que deseja caminhar neste itinerário. Pode
          alterar mais tarde; o conteúdo das semanas vem da base de dados
          (cadastrado pelo terapeuta para cada logismoi no Supabase).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            className="grid gap-2 sm:grid-cols-2"
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
                    "flex w-full flex-col items-start gap-1 rounded-lg border px-3 py-3 text-left transition-colors",
                    selected
                      ? "border-scriptorium-gold bg-scriptorium-gold/10 ring-1 ring-scriptorium-gold/50"
                      : "border-scriptorium-border bg-scriptorium-bg/40 hover:border-scriptorium-gold-muted",
                  )}
                >
                  <span className="flex items-center gap-2 font-medium text-scriptorium-cream">
                    {l.icone && (
                      <span className="text-lg leading-none" aria-hidden>
                        {l.icone}
                      </span>
                    )}
                    {l.nome_portugues}
                  </span>
                  <span className="text-xs text-scriptorium-cream/55">
                    {l.nome_grego}
                  </span>
                  {l.descricao_breve && (
                    <span className="text-xs text-scriptorium-cream/65 line-clamp-2">
                      {l.descricao_breve}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-scriptorium-gold/40 text-scriptorium-gold"
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
