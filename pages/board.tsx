import Board from "../components/Board";

const BoardPage: React.FC = (): JSX.Element => {
	return (
		<main className="main board">
			<header className="header">
				<div className="wrapper">
					<img src="/logo.png" alt="logo" className="logo" />
					<div className="timer">
						<h1 className="seconds">30</h1>
						<button className="start">Start</button>
					</div>
				</div>
				<h1 className="title">30 Seconds Game</h1>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
