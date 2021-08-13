import { board } from "../data/board";

const Board: React.FC = (): JSX.Element => {
	return (
		<section className="board">
			{board.map((el, key) =>
				el.shown ? (
					<img key={key} src={el.image} alt="Random" className="item" />
				) : (
					<div key={key} className={`item ${el?.target ? "xl" : ""}`}>
						{el?.target}
					</div>
				)
			)}
		</section>
	);
};

export default Board;
