import { useEffect, useState } from "react";

import Board from "../components/Board";

const BoardPage: React.FC = (): JSX.Element => {
	const [time, setTime] = useState(30);
	const [start, setStart] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (time > 0 && start) {
				setTime(time - 1);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [start, time]);

	return (
		<main className="main board">
			<header className="header">
				<div className="wrapper">
					<img src="/logo.png" alt="logo" className="logo" />
					<div className="timer">
						<h1 className="seconds">{time === 0 ? "Time's Up!" : time}</h1>
						<button
							className="start"
							onClick={() => {
								setTime(30);
								setStart(true);
							}}
						>
							Start
						</button>
					</div>
				</div>
				<h1 className="title">30 Seconds Game</h1>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
