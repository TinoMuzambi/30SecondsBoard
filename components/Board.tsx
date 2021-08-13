import { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";
import { Team } from "../interfaces";

const Board: React.FC = (): JSX.Element => {
	const { teams, setTeams } = useContext(AppContext);

	useEffect(() => {
		const teamsObj = JSON.parse(localStorage.getItem("30-seconds-game"));
		if (teamsObj) {
			const lsTeams: Team[] = teamsObj;
			setTeams(lsTeams);
		}
	}, []);

	const updateTeamCount = (type: "inc" | "dec", team: Team) => {
		let newTeams: Team[] = [...teams];
		for (let i = 0; i < teams.length; i++) {
			if (teams[i].name === team.name) {
				if (type === "inc") {
					if (newTeams[i].boardPosition !== 34) newTeams[i].boardPosition++;
				} else {
					if (newTeams[i].boardPosition !== 0) newTeams[i].boardPosition--;
				}
			}
		}

		setTeams(newTeams);
		localStorage.setItem("30-seconds-game", JSON.stringify(newTeams));
	};

	return (
		<section className="board">
			{board.map((el, key) =>
				el.shown ? (
					<div className="item">
						<img key={key} src={el.image} alt="Random" className="item" />
						<div className="tokens">
							{teams.map((team) => {
								if (team.boardPosition === el.boardPosition) {
									return <div className="token">{team.name}</div>;
								}
							})}
						</div>
					</div>
				) : (
					<div key={key} className={`item ${el?.target ? "xl" : ""}`}>
						{el?.target}
						<div className="tokens">
							{teams.map((team) => {
								if (team.boardPosition === el.boardPosition)
									return <div className="token">{team.name}</div>;
							})}
						</div>
					</div>
				)
			)}

			<div className="leaderboard">
				<h2 className="subtitle">Leaderboard</h2>
				{teams.map((team) => (
					<div className="row">
						<p className="name">{team.name}</p>
						<p className="board-pos">{team.boardPosition}</p>
						<button className="up" onClick={() => updateTeamCount("inc", team)}>
							<span>👆</span>
						</button>
						<button
							className="down"
							onClick={() => updateTeamCount("dec", team)}
						>
							<span>👇</span>
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Board;
