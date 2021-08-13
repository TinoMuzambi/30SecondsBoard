import { board } from "../data/board";

const Home = () => {
	return (
		<main className="main">
			<h1 className="title">30 Seconds Game</h1>
			<section className="board">
				{board.map((el, key) =>
					el.shown ? (
						<img key={key} src={el.image} alt="Random" className="item" />
					) : (
						<div key={key} className="item"></div>
					)
				)}
			</section>
		</main>
	);
};

export default Home;
// 33
