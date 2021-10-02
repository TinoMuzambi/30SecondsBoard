import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { Team } from "../interfaces";

const Leaderboard: React.FC = (): JSX.Element => {
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
					<button className="down" onClick={() => updateTeamCount("dec", team)}>
						-1
					</button>
				</div>
			))}
		</div>
	);
};

export default Leaderboard;
