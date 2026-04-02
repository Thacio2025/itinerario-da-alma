import { Link, Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItinerarioDashboard } from "@/components/ItinerarioDashboard";
import { ItinerarioUploadDiagnostico } from "@/components/ItinerarioUploadDiagnostico";
import { useAuth } from "@/contexts/AuthContext";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { useUsuarioItinerario } from "@/hooks/useUsuarioItinerario";

export function ItinerarioAppPage() {
  const { user, loading, signOut } = useAuth();
  const { isTerapeuta, loading: terapeutaLoading } = useTerapeuta();
  const {
    percurso,
    semanas,
    loading: itinerarioLoading,
    error: itinerarioError,
    refetch: refetchItinerario,
  } = useUsuarioItinerario();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-scriptorium-cream/70">
        Carregando…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex flex-col gap-4 border-b border-scriptorium-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-scriptorium-gold-muted">
              Área autenticada
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-scriptorium-gold md:text-3xl">
              Itinerário da Alma
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Início</Link>
            </Button>
            {!terapeutaLoading && isTerapeuta && (
              <Button
                variant="outline"
                size="sm"
                className="border-scriptorium-gold/50 text-scriptorium-gold"
                asChild
              >
                <Link to="/app/terapeuta">Painel terapeuta</Link>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-scriptorium-gold/40"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>

        <ItinerarioUploadDiagnostico
          onProcessComplete={() => void refetchItinerario()}
        />

        <ItinerarioDashboard
          userEmail={user.email}
          percurso={percurso}
          semanas={semanas}
          loading={itinerarioLoading}
          fetchError={itinerarioError}
        />
      </div>
    </div>
  );
}
