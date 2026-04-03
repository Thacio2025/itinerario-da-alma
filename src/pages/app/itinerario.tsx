import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItinerarioDashboard } from "@/components/ItinerarioDashboard";
import { ItinerarioEscolhaLogismoi } from "@/components/ItinerarioEscolhaLogismoi";
import { ItinerarioOnboardingDiagnostico } from "@/components/ItinerarioOnboardingDiagnostico";
import { ItinerarioOnboardingIntro12 } from "@/components/ItinerarioOnboardingIntro12";
import { useAuth } from "@/contexts/AuthContext";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { useUsuarioItinerario } from "@/hooks/useUsuarioItinerario";
import {
  getDiagnosticoConfirmado,
  getIntro12EtapasVisto,
  setDiagnosticoConfirmado,
  setIntro12EtapasVisto,
} from "@/lib/onboardingItinerarioStorage";

type OnboardingStep = "diagnostico" | "logismoi" | "intro12" | "complete";

export function ItinerarioAppPage() {
  const { user, loading, signOut } = useAuth();
  const { isTerapeuta, loading: terapeutaLoading } = useTerapeuta();
  const {
    percurso,
    semanas,
    semanasLidas,
    etapaConcluidaEm,
    loading: itinerarioLoading,
    error: itinerarioError,
    refetch: refetchItinerario,
    marcarSemanaLida,
    marcandoSemana,
  } = useUsuarioItinerario();

  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep | null>(
    null,
  );

  useEffect(() => {
    if (!user || itinerarioLoading) return;
    if (percurso) {
      setOnboardingStep(
        getIntro12EtapasVisto(user.id) ? "complete" : "intro12",
      );
    } else {
      setOnboardingStep(
        getDiagnosticoConfirmado(user.id) ? "logismoi" : "diagnostico",
      );
    }
  }, [user, percurso, itinerarioLoading]);

  const confirmarDiagnosticoSim = () => {
    if (!user) return;
    setDiagnosticoConfirmado(user.id);
    setOnboardingStep("logismoi");
  };

  const irParaPrimeiraEtapa = () => {
    if (!user) return;
    setIntro12EtapasVisto(user.id);
    setOnboardingStep("complete");
    requestAnimationFrame(() => {
      const alvo =
        document.getElementById("primeira-etapa-conteudo") ??
        document.getElementById("painel-itinerario-principal");
      alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-sans text-scriptorium-cream/70">
        Carregando…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="relative min-h-screen font-sans">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1610]/95"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-grain opacity-[0.08]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-8 md:px-8 lg:px-12 lg:pb-14 lg:pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-scriptorium-gold-muted md:text-xs">
                Método patrístico · itinerário espiritual
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-scriptorium-cream md:text-5xl lg:text-[3.25rem]">
                Itinerário{" "}
                <span className="text-scriptorium-gold">da Alma</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-scriptorium-cream/80 md:text-lg">
                {onboardingStep === "diagnostico" ||
                onboardingStep === "logismoi" ||
                onboardingStep === "intro12"
                  ? "Siga as etapas: primeiro o diagnóstico, depois o eixo do combate e, por fim, o caminho em doze etapas."
                  : "Um espaço reservado para o caminho interior — escolha o logismoi em que deseja crescer e acompanhe as etapas com calma e clareza."}
              </p>
            </div>

            <nav className="flex flex-shrink-0 flex-wrap gap-2 lg:justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link
                  to="/"
                  className="border-white/15 bg-black/25 text-scriptorium-cream backdrop-blur-sm hover:bg-white/10"
                >
                  Início
                </Link>
              </Button>
              {!terapeutaLoading && isTerapeuta && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    to="/app/terapeuta"
                    className="border-scriptorium-gold/35 bg-black/20 text-scriptorium-gold backdrop-blur-sm hover:bg-scriptorium-gold/10"
                  >
                    Painel terapeuta
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-white/15 bg-black/25 text-scriptorium-cream/95 backdrop-blur-sm hover:bg-white/10"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 md:px-8 lg:px-12 lg:py-16">
        {onboardingStep === null ? (
          <p className="text-center text-scriptorium-cream/65">
            Carregando o seu percurso…
          </p>
        ) : onboardingStep === "diagnostico" ? (
          <ItinerarioOnboardingDiagnostico
            onConfirmouSim={confirmarDiagnosticoSim}
          />
        ) : onboardingStep === "logismoi" ? (
          <ItinerarioEscolhaLogismoi
            mode="onboarding"
            logismoiIdAtual={percurso?.logismoi_id ?? null}
            itinerarioLoading={itinerarioLoading}
            onPercursoSalvo={() => void refetchItinerario()}
          />
        ) : onboardingStep === "intro12" ? (
          <ItinerarioOnboardingIntro12
            nomeLogismoi={percurso?.logismoi?.nome_portugues ?? null}
            onIrPrimeiraEtapa={irParaPrimeiraEtapa}
          />
        ) : (
          <>
            <ItinerarioEscolhaLogismoi
              logismoiIdAtual={percurso?.logismoi_id ?? null}
              itinerarioLoading={itinerarioLoading}
              onPercursoSalvo={() => void refetchItinerario()}
            />

            <ItinerarioDashboard
              userEmail={user.email}
              percurso={percurso}
              semanas={semanas}
              semanasLidas={semanasLidas}
              etapaConcluidaEm={etapaConcluidaEm}
              loading={itinerarioLoading}
              fetchError={itinerarioError}
              onMarcarSemanaLida={marcarSemanaLida}
              marcandoSemana={marcandoSemana}
            />
          </>
        )}
      </div>
    </div>
  );
}
