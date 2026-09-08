import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Board from "../components/Board";
import type { Team } from "../interfaces";
import { clampPosition, LAST_POSITION, parseStoredTeams, TEAM_STORAGE_KEY } from "../utils";

type TimerState = "ready" | "running" | "paused" | "done";

const BoardPageContent = () => {
  const [teams, setTeams] = useState<Team[]>(() =>
    parseStoredTeams(localStorage.getItem(TEAM_STORAGE_KEY)),
  );
  const [seconds, setSeconds] = useState(30);
  const [timerState, setTimerState] = useState<TimerState>("ready");
  const router = useRouter();

  useEffect(() => {
    if (teams.length < 2) void router.replace("/");
  }, [router, teams.length]);

  useEffect(() => {
    if (timerState !== "running") return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setTimerState("done");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [timerState]);

  useEffect(() => {
    if (teams.length >= 2) localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  const winner = useMemo(
    () => teams.find((team) => team.boardPosition === LAST_POSITION),
    [teams],
  );

  const moveTeam = (teamId: string, amount: number) => {
    setTeams((current) =>
      current.map((team) =>
        team.id === teamId
          ? { ...team, boardPosition: clampPosition(team.boardPosition + amount) }
          : team,
      ),
    );
  };

  const toggleTimer = () => {
    if (timerState === "running") {
      setTimerState("paused");
      return;
    }
    if (seconds === 0) setSeconds(30);
    setTimerState("running");
  };

  const resetTimer = () => {
    setSeconds(30);
    setTimerState("ready");
  };

  const newGame = () => {
    localStorage.removeItem(TEAM_STORAGE_KEY);
    void router.push("/");
  };

  if (teams.length < 2) return <main className="loading-state"><p>Loading the board…</p></main>;

  return (
    <main className="board-page">
      <header className="game-header">
        <div className="game-title">
          <p className="eyebrow">30 Seconds scorekeeper</p>
          <h1>Game board</h1>
        </div>
        <section className={`timer timer-${timerState}`} aria-label="Round timer" aria-live="polite">
          <span className="timer-value">{seconds}</span>
          <div>
            <strong>{timerState === "done" ? "Time’s up" : timerState === "running" ? "Round running" : "Round timer"}</strong>
            <div className="timer-actions">
              <button type="button" onClick={toggleTimer}>{timerState === "running" ? "Pause" : seconds < 30 && seconds > 0 ? "Resume" : "Start"}</button>
              <button type="button" onClick={resetTimer}>Reset</button>
            </div>
          </div>
        </section>
        <button className="new-game" type="button" onClick={newGame}>New game</button>
      </header>

      {winner && <p className="winner-banner" role="status">🏁 {winner.name} reached the finish!</p>}
      <Board teams={teams} onMove={moveTeam} />
      <p className="board-note">Use the scoreboard controls after each turn. Progress is saved locally on this device.</p>
    </main>
  );
};

export default dynamic(() => Promise.resolve(BoardPageContent), {
  ssr: false,
  loading: () => <main className="loading-state"><p>Loading the board…</p></main>,
});
