import { useCallback, useState } from "react";
import { FileUp, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ItinerarioUploadDiagnosticoProps = {
  onUploaded?: (file: File) => void;
  className?: string;
};

const ACCEPT = ".pdf,.doc,.docx,image/*";

export function ItinerarioUploadDiagnostico({
  onUploaded,
  className,
}: ItinerarioUploadDiagnosticoProps) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = useCallback(
    (f: File | null) => {
      if (!f) return;
      setFile(f);
      onUploaded?.(f);
    },
    [onUploaded],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer.files?.[0];
      handleFile(f ?? null);
    },
    [handleFile],
  );

  const onSimulateProcess = async () => {
    if (!file) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
  };

  return (
    <Card className={cn("overflow-hidden border-scriptorium-border/80", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-scriptorium-gold" aria-hidden />
          <CardTitle className="text-xl md:text-2xl">
            Upload do diagnóstico
          </CardTitle>
        </div>
        <CardDescription>
          Envie um PDF ou imagem do seu material para iniciar o mapeamento do
          itinerário espiritual.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              document.getElementById("itinerario-file-input")?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={cn(
            "flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors",
            drag
              ? "border-scriptorium-gold bg-scriptorium-gold/5"
              : "border-scriptorium-border hover:border-scriptorium-gold-muted",
          )}
          onClick={() =>
            document.getElementById("itinerario-file-input")?.click()
          }
        >
          <input
            id="itinerario-file-input"
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <FileUp
            className="mb-3 h-10 w-10 text-scriptorium-gold/90"
            aria-hidden
          />
          <p className="font-medium text-scriptorium-cream">
            Arraste o arquivo ou clique para escolher
          </p>
          <p className="mt-1 text-sm text-scriptorium-cream/60">
            PDF, DOC ou imagem (até 10 MB recomendado)
          </p>
        </div>

        {file && (
          <div className="flex flex-col gap-3 rounded-md border border-scriptorium-border bg-scriptorium-bg/50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-scriptorium-cream">
                {file.name}
              </p>
              <p className="text-xs text-scriptorium-cream/50">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 border-scriptorium-gold/40 text-scriptorium-gold"
              disabled={submitting}
              onClick={(e) => {
                e.stopPropagation();
                onSimulateProcess();
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processando…
                </>
              ) : (
                "Processar diagnóstico"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
