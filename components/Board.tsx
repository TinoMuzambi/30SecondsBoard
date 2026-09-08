import type { CSSProperties } from "react";

import { TRACK_POSITIONS } from "../data/board";
import type { BoardProps } from "../interfaces";
import { getInitials, LAST_POSITION } from "../utils";

const tokenStyle = (colour: string) => ({ "--team-colour": colour } as CSSProperties);

const Board = ({ teams, onMove }: BoardProps) => (
  <div className="game-layout">
    <section className="track" aria-label="Game track from start to finish">
      {TRACK_POSITIONS.map((position) => {
        const occupants = teams.filter((team) => team.boardPosition === position);
        return (
          <div
            className={`track-cell ${position === 0 ? "start-cell" : ""} ${
              position === LAST_POSITION ? "finish-cell" : ""
            }`}
            key={position}
          >
            <span className="cell-number">
              {position === 0 ? "Start" : position === LAST_POSITION ? "Finish" : position}
            </span>
            <div className="cell-tokens">
              {occupants.map((team) => (
                <span
                  className="team-token"
                  style={tokenStyle(team.colour)}
                  title={team.name}
                  aria-label={`${team.name} is on space ${position}`}
                  key={team.id}
                >
                  {getInitials(team.name)}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </section>

    <aside className="scoreboard" aria-labelledby="scoreboard-title">
      <div className="scoreboard-heading">
        <p className="section-tag">Live standings</p>
        <h2 id="scoreboard-title">Scoreboard</h2>
      </div>
      <ol>
        {[...teams]
          .sort((left, right) => right.boardPosition - left.boardPosition)
          .map((team) => (
            <li key={team.id}>
              <span className="score-token" style={tokenStyle(team.colour)}>
                {getInitials(team.name)}
              </span>
              <div className="team-score-copy">
                <strong>{team.name}</strong>
                <span>{team.boardPosition} / {LAST_POSITION}</span>
              </div>
              <div className="score-actions">
                <button
                  type="button"
                  onClick={() => onMove(team.id, -1)}
                  disabled={team.boardPosition === 0}
                  aria-label={`Move ${team.name} back one space`}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => onMove(team.id, 1)}
                  disabled={team.boardPosition === LAST_POSITION}
                  aria-label={`Move ${team.name} forward one space`}
                >
                  +
                </button>
              </div>
            </li>
          ))}
      </ol>
    </aside>
  </div>
);

export default Board;
