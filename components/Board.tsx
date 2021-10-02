import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";
import { Team } from "../interfaces";

const Board: React.FC = (): JSX.Element => {
	const { teams, setTeams } = useContext(AppContext);

	// Increase/decrease relevant team score.
	const updateTeamCount = (type: "inc" | "dec", team: Team) => {
		let newTeams: Team[] = [...teams];
		for (let i = 0; i < teams.length; i++) {
			if (teams[i].name === team.name) {
				if (type === "inc") {
					if (newTeams[i].boardPosition !== 34)
						(newTeams[i].boardPosition as number)++;
				} else {
					if (newTeams[i].boardPosition !== 0)
						(newTeams[i].boardPosition as number)--;
				}
			}
		}

		// Update context and save to local storage.
		if (setTeams) setTeams(newTeams);
	};

	return (
		<section className="board">
			{board.map((el, key) => (
				<div key={key} className={`item ${el?.target ? "xl" : ""}`}>
					{el.target && <p className="special">{el?.target}</p>}
					{el.shown && (
						<img src={el.image} alt="Random" className="board-image" />
					)}
					<div className="tokens">
						{teams.map((team, key) => {
							if (team.boardPosition === el.boardPosition)
								return (
									<div className="token" key={key}>
										<span className="white">
											{team.name[0] +
												team.name[Math.floor(team.name.length / 2)]}
										</span>
										<style jsx>
											{`
												--team-colour: ${team.colour};
											`}
										</style>
									</div>
								);
						})}
					</div>
				</div>
			))}

			<div className="leaderboard">
				<h2 className="subtitle">Leaderboard</h2>
				{teams.map((team, key) => (
					<div className="row" key={key}>
						<p className="name">
							<span className="white">{team.name}</span>
							<style jsx>
								{`
									--team-colour: ${team.colour};
								`}
							</style>
						</p>
						<p className="board-pos">{team.boardPosition}</p>
						<button className="up" onClick={() => updateTeamCount("inc", team)}>
							+1
						</button>
						<button
							className="down"
							onClick={() => updateTeamCount("dec", team)}
						>
							-1
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Board;
