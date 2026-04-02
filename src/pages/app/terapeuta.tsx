import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2, Save } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { supabase } from "@/lib/supabase";

type SemanaRow = {
  id: number;
  logismoi_id: number;
  numero_semana: number;
  titulo_semana: string;
  leitura_fonte: string | null;
  leitura_texto: string | null;
  doutrina_titulo: string | null;
  doutrina_corpo: string | null;
  exercicio_titulo: string | null;
  exercicio_descricao: string | null;
  sinal_progresso_titulo: string | null;
  sinal_progresso_descricao: string | null;
  tipo_fase: string | null;
  ordem_aparicao: number | null;
};

type SemanaComLogismoi = SemanaRow & {
  logismoi: { nome_portugues: string } | null;
};

export function TerapeutaPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isTerapeuta, loading: roleLoading } = useTerapeuta();
  const [rows, setRows] = useState<SemanaComLogismoi[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SemanaComLogismoi | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoadingList(true);
    setError(null);
    const { data, error: qErr } = await supabase
      .from("itinerario_semanas")
      .select(`
        *,
        logismoi ( nome_portugues )
      `)
      .order("logismoi_id", { ascending: true })
      .order("numero_semana", { ascending: true });

    setLoadingList(false);
    if (qErr) {
      setError(qErr.message);
      return;
    }
    setRows((data as SemanaComLogismoi[]) ?? []);
  }, []);

  useEffect(() => {
    if (!user || !isTerapeuta) return;
    load();
  }, [user, isTerapeuta, load]);

  async function save() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    const { error: uErr } = await supabase
      .from("itinerario_semanas")
      .update({
        titulo_semana: selected.titulo_semana,
        leitura_fonte: selected.leitura_fonte,
        leitura_texto: selected.leitura_texto,
        doutrina_titulo: selected.doutrina_titulo,
        doutrina_corpo: selected.doutrina_corpo,
        exercicio_titulo: selected.exercicio_titulo,
        exercicio_descricao: selected.exercicio_descricao,
        sinal_progresso_titulo: selected.sinal_progresso_titulo,
        sinal_progresso_descricao: selected.sinal_progresso_descricao,
        tipo_fase: selected.tipo_fase,
        ordem_aparicao: selected.ordem_aparicao,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    setSaving(false);
    if (uErr) {
      setError(uErr.message);
      return;
    }
    await load();
  }

  if (authLoading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-scriptorium-cream/70">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isTerapeuta) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-scriptorium-cream/80">
          Esta área é só para terapeutas cadastrados. Seu usuário ainda não está
          na tabela <code className="text-scriptorium-gold">terapeutas</code> no
          Supabase.
        </p>
        <Button className="mt-6" variant="outline" asChild>
          <Link to="/app/itinerario">Voltar ao meu itinerário</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-4 border-b border-scriptorium-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-scriptorium-gold-muted">
              Terapeuta
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-scriptorium-gold md:text-3xl">
              Painel de conteúdo
            </h1>
            <p className="mt-1 text-sm text-scriptorium-cream/60">
              {user.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/app/itinerario">
                <ArrowLeft className="h-4 w-4" />
                Meu itinerário (cliente)
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Início</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-scriptorium-gold/40"
              onClick={() => signOut()}
            >
              Sair
            </Button>
          </div>
        </header>

        <Card className="border-scriptorium-border/80">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-scriptorium-gold" />
              <CardTitle>Semanas do itinerário</CardTitle>
            </div>
            <CardDescription>
              Edite cada linha (textos públicos lidos pelos participantes). Use a
              lista abaixo e o formulário ao escolher uma semana.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            {loadingList ? (
              <p className="text-scriptorium-cream/60">Carregando…</p>
            ) : (
              <div className="overflow-x-auto rounded-md border border-scriptorium-border">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-scriptorium-bg/80 text-scriptorium-gold-muted">
                    <tr>
                      <th className="p-3 font-medium">Logismoi</th>
                      <th className="p-3 font-medium">Sem.</th>
                      <th className="p-3 font-medium">Título</th>
                      <th className="p-3 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="text-scriptorium-cream/90">
                    {rows.map((r) => (
                      <tr
                        key={r.id}
                        className="border-t border-scriptorium-border/60 hover:bg-scriptorium-surface/40"
                      >
                        <td className="p-3">
                          {r.logismoi?.nome_portugues ?? r.logismoi_id}
                        </td>
                        <td className="p-3">{r.numero_semana}</td>
                        <td className="p-3">{r.titulo_semana}</td>
                        <td className="p-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-scriptorium-gold"
                            onClick={() => setSelected(r)}
                          >
                            Editar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {rows.length === 0 && !loadingList && (
              <p className="text-scriptorium-cream/60">
                Nenhuma linha em <code>itinerario_semanas</code>. Você pode
                inserir linhas pelo SQL Editor ou pedir para evoluirmos um
                formulário de &quot;nova semana&quot;.
              </p>
            )}
          </CardContent>
        </Card>

        {selected && (
          <Card className="border-scriptorium-gold/30">
            <CardHeader>
              <CardTitle className="text-lg">
                Editar semana {selected.numero_semana} —{" "}
                {selected.logismoi?.nome_portugues ?? selected.logismoi_id}
              </CardTitle>
              <CardDescription className="text-scriptorium-cream/70">
                id {selected.id} · salva alterações no Supabase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da semana</Label>
                <Input
                  id="titulo"
                  value={selected.titulo_semana}
                  onChange={(e) =>
                    setSelected({ ...selected, titulo_semana: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leitura_fonte">Leitura — fonte</Label>
                <Input
                  id="leitura_fonte"
                  value={selected.leitura_fonte ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, leitura_fonte: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leitura_texto">Leitura — texto</Label>
                <Textarea
                  id="leitura_texto"
                  value={selected.leitura_texto ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, leitura_texto: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doutrina_titulo">Doutrina — título</Label>
                <Input
                  id="doutrina_titulo"
                  value={selected.doutrina_titulo ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, doutrina_titulo: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doutrina_corpo">Doutrina — corpo</Label>
                <Textarea
                  id="doutrina_corpo"
                  value={selected.doutrina_corpo ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, doutrina_corpo: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercicio_titulo">Exercício — título</Label>
                <Input
                  id="exercicio_titulo"
                  value={selected.exercicio_titulo ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      exercicio_titulo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercicio_descricao">Exercício — descrição</Label>
                <Textarea
                  id="exercicio_descricao"
                  value={selected.exercicio_descricao ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      exercicio_descricao: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sinal_titulo">Sinal de progresso — título</Label>
                <Input
                  id="sinal_titulo"
                  value={selected.sinal_progresso_titulo ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      sinal_progresso_titulo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sinal_desc">Sinal de progresso — descrição</Label>
                <Textarea
                  id="sinal_desc"
                  value={selected.sinal_progresso_descricao ?? ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      sinal_progresso_descricao: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipo_fase">Tipo de fase</Label>
                  <Input
                    id="tipo_fase"
                    value={selected.tipo_fase ?? ""}
                    onChange={(e) =>
                      setSelected({ ...selected, tipo_fase: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ordem">Ordem</Label>
                  <Input
                    id="ordem"
                    type="number"
                    value={selected.ordem_aparicao ?? ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        ordem_aparicao: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  type="button"
                  className="bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                  disabled={saving}
                  onClick={() => save()}
                >
                  {saving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Salvar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelected(null)}
                >
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
