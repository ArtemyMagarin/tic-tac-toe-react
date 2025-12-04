import { useCallback, useState } from "react";
import "./App.css";
import { Playground } from "./components/Playground";
import type { PlaygroundState, Turn } from "./types";

function mapLogToState(log: Turn[]): PlaygroundState {
  const state: PlaygroundState = {};
  for (const item of log) {
    state[item.y] = state[item.y] || {};
    state[item.y][item.x] = item.player;
  }

  return state;
}

function App() {
  const [log, setLog] = useState<Turn[]>([]);

  const addTurn = useCallback((turn: Turn) => {
    setLog((log) => [...log, turn]);
  }, []);

  return (
    <>
      <Playground
        height={3}
        width={3}
        state={mapLogToState(log)}
        addTurn={addTurn}
        log={log}
      />
      <button onClick={() => setLog([])}>Рестарт</button>
      {/* <button onClick={() => setLog((log) => log.slice(0, -1))}>
        Отменить ход
      </button> */}

      <details>
        <summary>Ход игры</summary>
        {log?.map((item, i) => (
          <p key={i}>
            {item.player} сходил на клетку ({item.x + 1}, {item.y + 1})
          </p>
        ))}
      </details>
    </>
  );
}

export default App;
