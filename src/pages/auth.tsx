import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: err } = await signUp(email, password);
        if (err) throw err;
      } else {
        const { error: err } = await signIn(email, password);
        if (err) throw err;
      }
      navigate("/app/itinerario");
    } catch (err: any) {
      setError(err.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao entrar com Google";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#1A1610", minHeight: "100vh" }}
      className="flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-0" style={{ backgroundColor: "#2A2A2A" }}>
        <CardHeader className="text-center">
          <div style={{ color: "#A8956E" }} className="text-3xl mb-4">
            ✨ Itinerário da Alma
          </div>
          <CardTitle style={{ color: "#A8956E" }}>
            {isSignUp ? "Criar Conta" : "Entrar"}
          </CardTitle>
          <CardDescription>Use o e-mail cadastrado no Supabase Auth.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div
              style={{ backgroundColor: "#C1121F", color: "#fff" }}
              className="p-3 rounded text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <Label style={{ color: "#A8956E" }} htmlFor="email">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border-gray-700 text-gray-100 mt-1"
                required
              />
            </div>

            <div>
              <Label style={{ color: "#A8956E" }} htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-gray-700 text-gray-100 mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 font-semibold"
              style={{ backgroundColor: "#A8956E", color: "#1A1610" }}
            >
              {loading ? "Processando..." : isSignUp ? "Criar Conta" : "Entrar"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span style={{ color: "#666", backgroundColor: "#2A2A2A" }} className="px-2">
                ou
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-10 font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#fff",
              color: "#1A1A1A",
            }}
          >
            <Chrome size={18} />
            Entrar com Google
          </Button>

          <div className="text-center">
            <span style={{ color: "#999" }}>
              {isSignUp ? "Já tem conta? " : "Não tem conta? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ color: "#A8956E" }}
                className="font-semibold hover:underline"
              >
                {isSignUp ? "Entrar" : "Registrar"}
              </button>
            </span>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/")}
            variant="ghost"
            className="w-full"
            style={{ color: "#A8956E" }}
          >
            ← Voltar ao início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}