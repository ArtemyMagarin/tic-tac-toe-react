import type { CSSProperties } from "react";
import type { Player, PlaygroundState, Turn } from "../types";
import { Cell } from "./Cell";

import styles from "./Playground.module.css";

type PlaygroundProps = {
  height: number;
  width: number;
  state: PlaygroundState;
  addTurn: (turn: Turn) => void;
  log: Turn[];
};

function iterator(size: number) {
  return new Array(size).fill(0).map((_, i) => i);
}

function isWinningLine(turns: Array<Turn | undefined>): turns is Turn[] {
  return turns.every(
    (turn) => turn !== undefined && turn.player === turns[0]?.player
  );
}

function getWinningPositions({
  state,
  height,
  width,
}: {
  state: PlaygroundState;
  width: number;
  height: number;
}) {
  for (let y = 0; y < height; y++) {
    const line = iterator(width).map((x) =>
      state[y]?.[x] ? { x, y, player: state[y][x]! } : undefined
    );

    if (isWinningLine(line)) {
      return line;
    }
  }

  for (let x = 0; x < width; x++) {
    const line = iterator(height).map((y) =>
      state[y]?.[x] ? { x, y, player: state[y][x]! } : undefined
    );

    if (isWinningLine(line)) {
      return line;
    }
  }

  {
    const line = iterator(width).map((i) =>
      state[i]?.[i] ? { x: i, y: i, player: state[i][i]! } : undefined
    );

    if (isWinningLine(line)) {
      return line;
    }
  }

  {
    const line = iterator(width).map((i) =>
      state[width - i - 1]?.[i]
        ? { x: i, y: width - i - 1, player: state[width - i - 1][i]! }
        : undefined
    );

    if (isWinningLine(line)) {
      return line;
    }
  }
}

function isCoordInLine(
  line: Array<{ x: number; y: number }>,
  x: number,
  y: number
) {
  return line.some((item) => item.x === x && item.y === y);
}

export function Playground({
  height,
  width,
  state,
  addTurn,
  log,
}: PlaygroundProps) {
  const lastTurn = log?.at(-1);
  const currentTurn: Player = lastTurn?.player === "X" ? "O" : "X";

  const line = getWinningPositions({ state, height, width });
  const isGameOver = log?.length === height * width || line !== undefined;
  const winner = line?.[0]?.player;

  return (
    <>
      {!isGameOver && <p>Текущий ход: {currentTurn}</p>}
      {isGameOver && !winner && <p>Конец игры: Ничья!</p>}
      {isGameOver && winner && <p>Конец игры: победил {winner}</p>}

      <div
        className={styles.playground}
        style={{ "--_playground-width": width } as CSSProperties}
      >
        {iterator(height).map((y) =>
          iterator(width).map((x) => (
            <Cell
              key={y * x + x}
              player={state[y]?.[x]}
              onClick={() => addTurn({ x, y, player: currentTurn })}
              canPlaceTurn={state[y]?.[x] === undefined && !isGameOver}
              isHighlighted={
                (lastTurn?.x === x && lastTurn?.y === y) ||
                isCoordInLine(line || [], x, y)
              }
            />
          ))
        )}
      </div>
    </>
  );
}
