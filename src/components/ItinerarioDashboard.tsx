import { BookOpen, Compass, Heart, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Phase = {
  title: string;
  note: string;
  icon: typeof Compass;
};

const phases: Phase[] = [
  {
    title: "Despertar",
    note: "Reconhecer o chamado interior e a necessidade de caminho.",
    icon: Moon,
  },
  {
    title: "Purificação",
    note: "Soltar o que não serve mais à alma.",
    icon: Heart,
  },
  {
    title: "Iluminação",
    note: "Integrar luz e sombra no mesmo itinerário.",
    icon: Compass,
  },
  {
    title: "União",
    note: "Viver o sagrado no cotidiano.",
    icon: BookOpen,
  },
];

type ItinerarioDashboardProps = {
  userEmail?: string | null;
  className?: string;
};

export function ItinerarioDashboard({
  userEmail,
  className,
}: ItinerarioDashboardProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-scriptorium-gold md:text-4xl">
          Seu itinerário
        </h1>
        <p className="max-w-2xl text-scriptorium-cream/75">
          Um espaço para acompanhar as etapas do caminho interior. Os dados abaixo
          são ilustrativos até você conectar tabelas no Supabase.
        </p>
        {userEmail && (
          <p className="text-sm text-scriptorium-gold-muted">
            Conectado como {userEmail}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((p, i) => (
          <Card
            key={p.title}
            className="border-scriptorium-border/80 transition-colors hover:border-scriptorium-gold/40"
          >
            <CardHeader className="pb-2">
              <p.icon
                className="mb-2 h-8 w-8 text-scriptorium-gold"
                aria-hidden
              />
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <CardDescription className="text-scriptorium-cream/70">
                {p.note}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-scriptorium-border">
                <div
                  className="h-full rounded-full bg-scriptorium-gold/70"
                  style={{
                    width: `${[45, 62, 38, 71][i]}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-scriptorium-gold/20 bg-scriptorium-surface/60">
        <CardHeader>
          <CardTitle className="text-lg">Próximo passo</CardTitle>
          <CardDescription>
            Complete o upload do diagnóstico e registre reflexões semanais. Em
            produção, isto pode vir de uma tabela{" "}
            <code className="rounded bg-scriptorium-bg px-1 text-scriptorium-gold">
              reflexoes
            </code>{" "}
            no Supabase.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
