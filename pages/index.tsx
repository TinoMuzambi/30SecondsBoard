import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import TeamEditor from "../components/Team";
import type { TeamDraft } from "../interfaces";
import { buildTeams, TEAM_STORAGE_KEY } from "../utils";

const TEAM_COLOURS = ["#f5d547", "#56cfe1", "#ff6b6b", "#b9f18c", "#c8a2ff", "#ff9f43"];

const createDrafts = (count: number, current: TeamDraft[] = []): TeamDraft[] =>
  Array.from({ length: count }, (_, index) =>
    current[index] ?? { name: "", colour: TEAM_COLOURS[index % TEAM_COLOURS.length] },
  );

const Home = () => {
  const [teamCount, setTeamCount] = useState(2);
  const [drafts, setDrafts] = useState<TeamDraft[]>(() => createDrafts(2));
  const [error, setError] = useState("");
  const router = useRouter();

  const changeCount = (count: number) => {
    setTeamCount(count);
    setDrafts((current) => createDrafts(count, current));
    setError("");
  };

  const updateTeam = (index: number, team: TeamDraft) => {
    setDrafts((current) => current.map((item, itemIndex) => (itemIndex === index ? team : item)));
    setError("");
  };

  const startGame = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const teams = buildTeams(drafts);
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams));
      void router.push("/board");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Check the team details and try again.");
    }
  };

  return (
    <main className="setup-page">
      <header className="setup-hero">
        <p className="eyebrow">Unofficial game companion</p>
        <h1>Keep score.<br />Keep talking.</h1>
        <p>Set up your teams, start the 30-second round timer, and move tokens around a shared board. Game state stays on this device.</p>
      </header>

      <form className="setup-panel" onSubmit={startGame}>
        <div className="panel-heading">
          <div><p className="section-tag">01 / Setup</p><h2>Build the teams</h2></div>
          <label htmlFor="team-count">
            Teams
            <select
              id="team-count"
              value={teamCount}
              onChange={(event) => changeCount(Number(event.target.value))}
            >
              {[2, 3, 4, 5, 6].map((count) => <option key={count}>{count}</option>)}
            </select>
          </label>
        </div>

        <div className="team-grid">
          {drafts.map((team, index) => (
            <TeamEditor key={index} index={index} team={team} onChange={updateTeam} />
          ))}
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-action" type="submit">Start the game <span aria-hidden="true">→</span></button>
      </form>

      <footer className="setup-footer">
        <p>Bring your own cards. This tool only handles the timer and score.</p>
        <a href="https://github.com/TinoMuzambi/30SecondsBoard" rel="noreferrer">View source ↗</a>
      </footer>
    </main>
  );
};

export default Home;
