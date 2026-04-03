/** Preferências de onboarding por utilizador (localStorage; sem migração SQL). */

const PREFIX = "itinerario:onboarding:";

function key(userId: string, suffix: string): string {
  return `${PREFIX}${userId}:${suffix}`;
}

export function getDiagnosticoConfirmado(userId: string): boolean {
  try {
    return localStorage.getItem(key(userId, "diagnostico")) === "1";
  } catch {
    return false;
  }
}

export function setDiagnosticoConfirmado(userId: string): void {
  try {
    localStorage.setItem(key(userId, "diagnostico"), "1");
  } catch {
    /* ignore */
  }
}

export function getIntro12EtapasVisto(userId: string): boolean {
  try {
    return localStorage.getItem(key(userId, "intro12")) === "1";
  } catch {
    return false;
  }
}

export function setIntro12EtapasVisto(userId: string): void {
  try {
    localStorage.setItem(key(userId, "intro12"), "1");
  } catch {
    /* ignore */
  }
}
