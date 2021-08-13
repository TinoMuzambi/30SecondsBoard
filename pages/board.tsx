import Board from "../components/Board";

const BoardPage: React.FC = (): JSX.Element => {
	return (
		<main className="main board">
			<header className="header">
				<img src="/logo.png" alt="logo" className="logo" />
				<h1 className="title">30 Seconds Game</h1>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
