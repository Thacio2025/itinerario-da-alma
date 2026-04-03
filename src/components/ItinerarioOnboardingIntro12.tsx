import { BookOpen, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ItinerarioOnboardingIntro12Props = {
  nomeLogismoi?: string | null;
  onIrPrimeiraEtapa: () => void;
};

export function ItinerarioOnboardingIntro12({
  nomeLogismoi,
  onIrPrimeiraEtapa,
}: ItinerarioOnboardingIntro12Props) {
  return (
    <Card className="overflow-hidden rounded-2xl border-scriptorium-gold/25 bg-gradient-to-b from-scriptorium-gold/[0.08] to-[rgba(20,17,13,0.92)] shadow-card-lift backdrop-blur-sm">
      <CardHeader className="space-y-4 border-b border-white/[0.06] pb-8 tracking-[0.02em]">
        <div className="flex items-center gap-3 text-scriptorium-gold-muted">
          <BookOpen className="h-8 w-8 shrink-0" strokeWidth={1.4} aria-hidden />
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
            As doze etapas do combate
          </p>
        </div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-scriptorium-cream md:text-3xl">
          O que o espera neste caminho
        </h2>
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-scriptorium-cream/80">
          <p>
            O seu itinerário é composto por{" "}
            <strong className="font-medium text-scriptorium-cream/95">
              doze etapas sequenciais
            </strong>
            . Cada uma desbloqueia a seguinte quando for concluída com
            sinceridade — leitura patrística, doutrina, exercício e um breve
            registo interior (reflexão ou sinal de progresso).
          </p>
          <p>
            {nomeLogismoi ? (
              <>
                O eixo escolhido —{" "}
                <span className="text-scriptorium-gold-muted">{nomeLogismoi}</span>{" "}
                — atravessa todas as etapas: não é pressa, é perseverança ao
                estilo dos Padres do deserto.
              </>
            ) : (
              <>
                O logismoi que escolheu atravessa todas as etapas: não é pressa,
                é perseverança ao estilo dos Padres do deserto.
              </>
            )}
          </p>
          <p className="text-scriptorium-cream/70">
            Comece pela etapa que o sistema lhe mostrar como atual; avance só
            quando estiver pronto para deixar Deus moldar o próximo passo.
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <Button
          type="button"
          size="lg"
          className="w-full gap-2 bg-scriptorium-gold font-semibold text-scriptorium-bg shadow-lg shadow-black/40 hover:bg-scriptorium-gold/92 sm:w-auto"
          onClick={onIrPrimeiraEtapa}
        >
          <Footprints className="h-5 w-5 shrink-0" aria-hidden />
          Ir para a primeira etapa
        </Button>
      </CardContent>
    </Card>
  );
}
