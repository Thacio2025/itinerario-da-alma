function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type CertificadoPrimeiraEtapaPayload = {
  nomeLogismoi: string;
  tituloEtapa: string;
  dataConclusao: Date;
  /** E-mail da sessão, se existir (identificação discreta). */
  emailParticipante?: string | null;
};

/**
 * Abre impressão / guardar como PDF — certificado formal da 1ª etapa.
 */
export function printCertificadoPrimeiraEtapa(
  payload: CertificadoPrimeiraEtapaPayload,
): void {
  const { nomeLogismoi, tituloEtapa, dataConclusao, emailParticipante } =
    payload;

  const dataFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dataConclusao);

  const emailLinha =
    emailParticipante?.trim() ?
      `<p class="email">Registo associado à conta: ${escapeHtml(emailParticipante.trim())}</p>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>Certificado — 1ª etapa · Itinerário da Alma</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Georgia", "Times New Roman", serif;
    color: #1c1914;
    line-height: 1.5;
    font-size: 11pt;
    margin: 0;
    padding: 8mm;
    background: #faf8f3;
  }
  .frame {
    border: 3px double #a68b4a;
    padding: 22mm 16mm;
    min-height: 240mm;
    background: #fffef9;
    position: relative;
  }
  .corner {
    position: absolute;
    width: 28px;
    height: 28px;
    border: 2px solid #c4a962;
    opacity: 0.55;
  }
  .c-tl { top: 10mm; left: 10mm; border-right: none; border-bottom: none; }
  .c-tr { top: 10mm; right: 10mm; border-left: none; border-bottom: none; }
  .c-bl { bottom: 10mm; left: 10mm; border-right: none; border-top: none; }
  .c-br { bottom: 10mm; right: 10mm; border-left: none; border-top: none; }
  .brand {
    text-align: center;
    font-size: 9pt;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6b5e4a;
    margin-bottom: 8mm;
  }
  h1 {
    text-align: center;
    font-size: 22pt;
    font-weight: normal;
    letter-spacing: 0.06em;
    color: #14110d;
    margin: 0 0 14mm 0;
    border-bottom: 1px solid #d4c4a0;
    padding-bottom: 8mm;
  }
  .lead {
    text-align: center;
    font-size: 11.5pt;
    color: #3d382f;
    margin: 0 0 10mm 0;
  }
  .body {
    font-size: 12pt;
    text-align: justify;
    color: #2a2620;
    margin: 10mm 0 12mm 0;
    line-height: 1.65;
  }
  .highlight {
    font-style: italic;
    color: #1c1914;
  }
  .date {
    text-align: center;
    margin-top: 14mm;
    font-size: 10.5pt;
    color: #5c5346;
  }
  .email {
    text-align: center;
    font-size: 8.5pt;
    color: #7a7266;
    margin-top: 10mm;
  }
  .footer {
    margin-top: 18mm;
    padding-top: 8mm;
    border-top: 1px solid #e0d8c8;
    text-align: center;
    font-size: 8pt;
    color: #8a8276;
    line-height: 1.45;
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="corner c-tl" aria-hidden="true"></div>
    <div class="corner c-tr" aria-hidden="true"></div>
    <div class="corner c-bl" aria-hidden="true"></div>
    <div class="corner c-br" aria-hidden="true"></div>
    <p class="brand">Itinerário da Alma · Método patrístico</p>
    <h1>Certificado de conclusão</h1>
    <p class="lead">Primeira etapa do percurso espiritual</p>
    <p class="body">
      Certifica-se que foi concluída a <strong>primeira etapa</strong> do itinerário no eixo
      <span class="highlight">${escapeHtml(nomeLogismoi)}</span>, intitulada
      <span class="highlight">${escapeHtml(tituloEtapa)}</span>, no âmbito do acompanhamento
      interior segundo a tradição dos Padres do deserto e a espiritualidade ascética cristã.
    </p>
    <p class="date">${escapeHtml(dataFmt)}</p>
    ${emailLinha}
    <div class="footer">
      Documento simbólico de progresso no caminho interior, gerado pela aplicação Itinerário da Alma.<br />
      Não substitui acompanhamento pastoral nem direção espiritual presencial.
    </div>
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
