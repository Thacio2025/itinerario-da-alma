import type { LucideIcon } from "lucide-react";
import {
  CloudRain,
  Coins,
  Crown,
  Eye,
  Flame,
  Moon,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

/** Ícones discretos (Lucide) por id do logismoi — alinhados à ordem da base. */
export const LOGISMOI_LUCIDE: Record<number, LucideIcon> = {
  1: UtensilsCrossed,
  2: Flame,
  3: Coins,
  4: CloudRain,
  5: Zap,
  6: Moon,
  7: Eye,
  8: Crown,
};

export function LogismoiGlyph({
  logismoiId,
  className,
  "aria-hidden": ariaHidden = true,
}: {
  logismoiId: number;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const Icon = LOGISMOI_LUCIDE[logismoiId] ?? UtensilsCrossed;
  return <Icon className={className} aria-hidden={ariaHidden} />;
}
