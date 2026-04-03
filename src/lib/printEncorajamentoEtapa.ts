import type { CitacaoPatristica } from "@/lib/citacoesPadresDeserto";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type EncorajamentoPrintPayload = {
  numeroEtapa: number;
  tituloEtapa: string;
  nomeLogismoi: string;
  dataConclusao: Date;
  citacao: CitacaoPatristica;
};

/**
 * Abre o diálogo de impressão do sistema (o utilizador pode guardar como PDF).
 * Conteúdo em A4 com tipografia sóbria, adequado a impressão.
 */
export function printEncorajamentoEtapa(payload: EncorajamentoPrintPayload): void {
  const {
    numeroEtapa,
    tituloEtapa,
    nomeLogismoi,
    dataConclusao,
    citacao,
  } = payload;

  const dataFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dataConclusao);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>Itinerário da Alma — Etapa ${numeroEtapa}</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Georgia", "Times New Roman", serif;
    color: #1c1914;
    line-height: 1.55;
    font-size: 11.5pt;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
  .header {
    border-bottom: 1px solid #b8a06e;
    padding-bottom: 12px;
    margin-bottom: 22px;
  }
  .brand {
    font-size: 9pt;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5c5346;
    margin-bottom: 6px;
  }
  h1 {
    font-size: 15pt;
    font-weight: normal;
    margin: 0 0 6px 0;
    color: #14110d;
  }
  .meta {
    font-size: 9.5pt;
    color: #5c5346;
  }
  .encouragement {
    font-size: 10.5pt;
    color: #3d382f;
    margin: 20px 0 24px 0;
  }
  .quote-wrap {
    margin: 28px 0;
    padding: 18px 20px;
    border-left: 3px solid #a68b4a;
    background: #faf8f3;
  }
  .quote {
    font-size: 12pt;
    font-style: italic;
    margin: 0 0 14px 0;
    color: #1c1914;
  }
  .attrib {
    font-size: 9.5pt;
    text-align: right;
    color: #5c5346;
    font-style: normal;
  }
  .footer {
    margin-top: 36px;
    padding-top: 14px;
    border-top: 1px solid #ddd6c4;
    font-size: 8.5pt;
    color: #7a7266;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="brand">Itinerário da Alma · Método patrístico</div>
    <h1>Etapa ${numeroEtapa} concluída</h1>
    <p class="meta">${escapeHtml(nomeLogismoi)} · ${escapeHtml(tituloEtapa)} · ${escapeHtml(dataFmt)}</p>
  </div>
  <p class="encouragement">
    Deus abençoe este passo no seu caminho interior. Guarde este lembrete como sinal de perseverança:
    não é a pressa que santifica, mas a fidelidade de quem volta ao Senhor a cada dia.
  </p>
  <div class="quote-wrap">
    <p class="quote">“${escapeHtml(citacao.texto)}”</p>
    <p class="attrib">— ${escapeHtml(citacao.autor)}</p>
  </div>
  <p class="encouragement" style="margin-top: 24px;">
    Avance para a próxima etapa no tempo que a sua alma precisar. O itinerário espera por si.
  </p>
  <div class="footer">
    Itinerário da Alma — documento para uso pessoal
  </div>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden",
  );
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(html);
  doc.close();

  const cleanup = () => {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
  };

  win.focus();
  setTimeout(() => {
    win.print();
    setTimeout(cleanup, 500);
  }, 150);
}
