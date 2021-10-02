import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";
import { getTeamName } from "../utils";

import Leaderboard from "./Leaderboard";

const Board: React.FC = (): JSX.Element => {
	const { teams } = useContext(AppContext);

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
										<span className="white">{getTeamName(team.name)}</span>
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

			<Leaderboard />
		</section>
	);
};

export default Board;
