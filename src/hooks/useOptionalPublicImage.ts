import { useEffect, useState } from "react";

/**
 * Verifica se existe um ficheiro em /public (ex.: hero-bg.jpg).
 * Coloque a imagem em `public/` com o mesmo nome para ativar o fundo fotográfico.
 */
export function useOptionalPublicImage(filename: string) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/${filename}`;
    img.onload = () => setReady(true);
    img.onerror = () => setReady(false);
  }, [filename]);

  return ready;
}
