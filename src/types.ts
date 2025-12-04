export type Player = "X" | "O";
export type Turn = { player: Player; x: number; y: number };
export type PlaygroundState = {
  [row: number]: { [col: number]: Player | undefined };
};
