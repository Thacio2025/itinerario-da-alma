import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DIAGNOSTICO_URL = "https://diagnosticoespiritual.com.br/";

type ItinerarioOnboardingDiagnosticoProps = {
  onConfirmouSim: () => void;
};

export function ItinerarioOnboardingDiagnostico({
  onConfirmouSim,
}: ItinerarioOnboardingDiagnosticoProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-scriptorium-gold/20 bg-gradient-to-b from-[rgba(20,17,13,0.92)] to-black/80 shadow-card-lift backdrop-blur-sm">
      <CardHeader className="space-y-3 border-b border-white/[0.06] pb-6 tracking-[0.02em]">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-scriptorium-gold-muted">
          Antes do itinerário
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-scriptorium-cream md:text-3xl">
          Você já realizou o Diagnóstico Espiritual?
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-scriptorium-cream/75">
          O itinerário em doze etapas parte do resultado desse exame da alma.
          Se ainda não o fez, recomendamos concluir o diagnóstico primeiro; em
          seguida volte aqui para escolher o logismoi indicado.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          type="button"
          size="lg"
          className="min-w-[200px] bg-scriptorium-gold font-semibold text-scriptorium-bg shadow-lg shadow-black/40 hover:bg-scriptorium-gold/92"
          onClick={onConfirmouSim}
        >
          Sim, já fiz o diagnóstico
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="min-w-[200px] gap-2 border-scriptorium-gold/40 bg-black/30 text-scriptorium-cream hover:bg-scriptorium-gold/10"
          asChild
        >
          <a
            href={DIAGNOSTICO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            Ainda não — ir ao Diagnóstico Espiritual
            <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          </a>
        </Button>
      </CardContent>
      <CardContent className="pt-0 pb-8">
        <p className="text-sm leading-relaxed text-scriptorium-cream/50">
          Ao abrir o site do diagnóstico, conclua o questionário no seu ritmo.
          Depois volte a esta página e escolha &quot;Sim, já fiz o
          diagnóstico&quot; para continuar.
        </p>
      </CardContent>
    </Card>
  );
}
