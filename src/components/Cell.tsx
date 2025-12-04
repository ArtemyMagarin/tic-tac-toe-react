import type { Player } from "../types";
import styles from "./Cell.module.css";

type CellProps = {
  player: Player | undefined;
  onClick: () => void;
  isHighlighted: boolean;
  canPlaceTurn: boolean;
};

function cn(names: Array<string | boolean>) {
  return names.filter(Boolean).join(" ");
}

export function Cell({
  player,
  onClick,
  isHighlighted,
  canPlaceTurn,
}: CellProps) {
  return (
    <button
      aria-disabled={!canPlaceTurn}
      className={cn([
        styles.cell,
        isHighlighted && styles.highlighted,
        !canPlaceTurn && styles.disabled,
      ])}
      onClick={canPlaceTurn ? onClick : undefined}
    >
      {player}
    </button>
  );
}
