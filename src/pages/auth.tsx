import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading: sessionLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fn = mode === "login" ? signIn : signUp;
    const { error: err } = await fn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate("/app/itinerario", { replace: true });
  }

  if (!sessionLoading && user) {
    return <Navigate to="/app/itinerario" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link
        to="/"
        className="mb-8 flex items-center gap-2 text-scriptorium-gold transition-opacity hover:opacity-90"
      >
        <Sparkles className="h-6 w-6" />
        <span className="text-lg font-semibold">Itinerário da Alma</span>
      </Link>

      <Card className="w-full max-w-md border-scriptorium-border/90">
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </CardTitle>
          <CardDescription>
            Use o e-mail cadastrado no Supabase Auth. Em desenvolvimento,
            confirme as variáveis{" "}
            <code className="text-scriptorium-gold">VITE_SUPABASE_*</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
              disabled={submitting || sessionLoading}
            >
              {submitting
                ? "Aguarde…"
                : mode === "login"
                  ? "Entrar"
                  : "Cadastrar"}
            </Button>

            <p className="text-center text-sm text-scriptorium-cream/60">
              {mode === "login" ? (
                <>
                  Não tem conta?{" "}
                  <button
                    type="button"
                    className="text-scriptorium-gold underline-offset-4 hover:underline"
                    onClick={() => {
                      setMode("register");
                      setError(null);
                    }}
                  >
                    Registrar
                  </button>
                </>
              ) : (
                <>
                  Já tem conta?{" "}
                  <button
                    type="button"
                    className="text-scriptorium-gold underline-offset-4 hover:underline"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                    }}
                  >
                    Entrar
                  </button>
                </>
              )}
            </p>
          </form>
        </CardContent>
      </Card>

      <Button variant="ghost" className="mt-8" asChild>
        <Link to="/">← Voltar ao início</Link>
      </Button>
    </div>
  );
}
