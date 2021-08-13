import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { board } from "../data/board";

const Board: React.FC = (): JSX.Element => {
	const { teams } = useContext(AppContext);
	return (
		<section className="board">
			{board.map((el, key) =>
				el.shown ? (
					<img key={key} src={el.image} alt="Random" className="item" />
				) : (
					<div key={key} className={`item ${el?.target ? "xl" : ""}`}>
						{el?.target}
						{teams.forEach((team) => {
							console.log(el.boardPosition);
							if (team.boardPosition === el.boardPosition)
								return <div className="team">{team.name}</div>;
						})}
					</div>
				)
			)}
		</section>
	);
};

export default Board;
