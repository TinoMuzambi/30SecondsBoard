import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";
import { Team } from "../interfaces";

const Board: React.FC = (): JSX.Element => {
	const { teams, setTeams } = useContext(AppContext);

	const updateTeamCount = (type: "inc" | "dec", team: Team) => {
		let newTeams: Team[] = [...teams];
		for (let i = 0; i < teams.length; i++) {
			if (teams[i].name === team.name) {
				if (type === "inc") {
					newTeams[i].boardPosition++;
				} else {
					newTeams[i].boardPosition--;
				}
			}
		}

		setTeams(newTeams);
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
				{teams
					.sort((a, b) => (a.boardPosition < b.boardPosition ? 1 : -1))
					.map((team) => (
						<div className="row">
							<p className="name">{team.name}</p>
							<p className="board-pos">{team.boardPosition}</p>
							<button
								className="up"
								onClick={() => updateTeamCount("inc", team)}
							>
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
