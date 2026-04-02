import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function HomePage() {
  const { user, loading } = useAuth();
  const ctaTo = !loading && user ? "/app/itinerario" : "/auth";
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #A8956E, transparent)",
        }}
      />
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2 text-scriptorium-gold">
          <Sparkles className="h-7 w-7" aria-hidden />
          <span className="text-xl font-semibold tracking-wide md:text-2xl">
            Itinerário da Alma
          </span>
        </div>
        <Button variant="ghost" asChild className="text-scriptorium-cream/90">
          <Link to={user ? "/app/itinerario" : "/auth"}>
            {user ? "Meu itinerário" : "Entrar"}
          </Link>
        </Button>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-8 text-center md:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-scriptorium-gold-muted">
          Scriptorium
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-scriptorium-cream md:text-6xl md:leading-[1.1]">
          O caminho interior merece{" "}
          <span className="text-scriptorium-gold">atenção sagrada</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-scriptorium-cream/75 md:text-xl">
          Acompanhe etapas, envie seu diagnóstico e construa um itinerário
          personalizado — com segurança e presença.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="min-w-[220px] bg-scriptorium-gold text-lg text-scriptorium-bg hover:bg-scriptorium-gold/90"
            asChild
          >
            <Link to={ctaTo}>
              Começar Itinerário
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px]" asChild>
            <a href="#como-funciona">Como funciona</a>
          </Button>
        </div>

        <section
          id="como-funciona"
          className="mt-28 w-full max-w-3xl scroll-mt-24 border-t border-scriptorium-border/60 pt-16"
        >
          <h2 className="text-2xl font-semibold text-scriptorium-gold md:text-3xl">
            Três passos
          </h2>
          <ol className="mt-8 space-y-6 text-left text-scriptorium-cream/80">
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-scriptorium-gold/50 text-scriptorium-gold">
                1
              </span>
              <span>
                <strong className="text-scriptorium-cream">Crie sua conta</strong>{" "}
                com e-mail e senha (Supabase Auth).
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-scriptorium-gold/50 text-scriptorium-gold">
                2
              </span>
              <span>
                <strong className="text-scriptorium-cream">Envie o diagnóstico</strong>{" "}
                em PDF ou imagem para iniciar o mapeamento.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-scriptorium-gold/50 text-scriptorium-gold">
                3
              </span>
              <span>
                <strong className="text-scriptorium-cream">Acompanhe o painel</strong>{" "}
                com as fases do seu itinerário espiritual.
              </span>
            </li>
          </ol>
        </section>
      </main>

      <footer className="relative z-10 border-t border-scriptorium-border/40 px-6 py-8 text-center text-sm text-scriptorium-cream/50 md:px-12">
        © {new Date().getFullYear()} Itinerário da Alma
      </footer>
    </div>
  );
}
