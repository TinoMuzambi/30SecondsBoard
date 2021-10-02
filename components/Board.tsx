import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";

const Board: React.FC = (): JSX.Element => {
	const { teams, setTeams } = useContext(AppContext);

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
		</section>
	);
};

export default Board;
