import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";

const Board: React.FC = (): JSX.Element => {
	const { teams } = useContext(AppContext);
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
		</section>
	);
};

export default Board;
