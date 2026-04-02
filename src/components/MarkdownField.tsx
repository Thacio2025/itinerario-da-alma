import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type MarkdownFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeightClass?: string;
};

export function MarkdownField({
  id,
  label,
  value,
  onChange,
  minHeightClass = "min-h-[140px]",
}: MarkdownFieldProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Label htmlFor={id}>
          {label}{" "}
          <span className="font-normal text-scriptorium-cream/50">(Markdown)</span>
        </Label>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant={tab === "edit" ? "default" : "outline"}
            className={
              tab === "edit"
                ? "bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                : ""
            }
            onClick={() => setTab("edit")}
          >
            Editar
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tab === "preview" ? "default" : "outline"}
            className={
              tab === "preview"
                ? "bg-scriptorium-gold text-scriptorium-bg hover:bg-scriptorium-gold/90"
                : ""
            }
            onClick={() => setTab("preview")}
          >
            Pré-visualizar
          </Button>
        </div>
      </div>
      {tab === "edit" ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(minHeightClass, "font-mono text-sm")}
          placeholder={
            "Ex.: ## Título\n\nParágrafo com **negrito** e listas:\n\n- item 1\n- item 2"
          }
        />
      ) : (
        <div
          className={cn(
            "rounded-md border border-scriptorium-border bg-scriptorium-bg/60 p-4 text-scriptorium-cream/95",
            minHeightClass,
            "max-h-[min(480px,70vh)] overflow-y-auto",
            "prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:text-scriptorium-gold prose-p:text-scriptorium-cream/90 prose-a:text-scriptorium-gold prose-strong:text-scriptorium-cream prose-li:marker:text-scriptorium-gold-muted",
          )}
        >
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="italic text-scriptorium-cream/40">Nada para pré-visualizar.</p>
          )}
        </div>
      )}
    </div>
  );
}
