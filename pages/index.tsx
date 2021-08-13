import { board } from "../data/board";

const Home = () => {
	return (
		<main className="main">
			<h1 className="title">30 Seconds Game</h1>
			<section className="board">
				{board.map((el, key) => (
					<div key={key}>
						<img src={el.image} alt="Random" />
					</div>
				))}
			</section>
		</main>
	);
};

export default Home;
// 33
