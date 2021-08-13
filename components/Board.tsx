import { CSSProperties, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";
import { Team } from "../interfaces";

const Board: React.FC = (): JSX.Element => {
	const { teams, setTeams } = useContext(AppContext);

	useEffect(() => {
		const teamsObj = JSON.parse(
			localStorage.getItem("30-seconds-game") as string
		);
		if (teamsObj) {
			const lsTeams: Team[] = teamsObj;
			if (setTeams) setTeams(lsTeams);
		}
	}, []);

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

		if (setTeams) setTeams(newTeams);
		localStorage.setItem("30-seconds-game", JSON.stringify(newTeams));
	};

	return (
		<section className="board">
			{board.map((el, key) => (
				<div key={key} className={`item ${el?.target ? "xl" : ""}`}>
					{el?.target}
					{el.shown && <img src={el.image} alt="Random" className="item" />}
					<div className="tokens">
						{teams.map((team) => {
							if (team.boardPosition === el.boardPosition)
								<div
									className="token"
									key={key}
									style={`--team-colour: ${team.colour}` as CSSProperties}
								>
									{team.name[0] + team.name[Math.floor(team.name.length / 2)]}
								</div>;
						})}
					</div>
				</div>
			))}

			<div className="leaderboard">
				<h2 className="subtitle">Leaderboard</h2>
				{teams.map((team, key) => (
					<div className="row" key={key}>
						<p className="name">{team.name}</p>
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
