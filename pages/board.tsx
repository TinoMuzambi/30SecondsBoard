import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import Board from "../components/Board";
import { AppContext } from "../context/AppContext";

const BoardPage: React.FC = (): JSX.Element => {
	const [time, setTime] = useState(30);
	const [start, setStart] = useState(false);

	const router = useRouter();
	const { setTeams } = useContext(AppContext);
	const boardRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (time > 0 && start) {
				setTime(time - 1);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [start, time]);

	useEffect(() => {
		(boardRef?.current as any).scrollIntoView();
	}, []);

	return (
		<main className="main board">
			<header className="header" ref={boardRef}>
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
				<div className="wrapper">
					<h1 className="title">30 Seconds Game</h1>
					<button
						className="start"
						onClick={() => {
							localStorage.removeItem("30-seconds-game");
							if (setTeams) setTeams([]);
							router.push("/");
						}}
					>
						New Game
					</button>
				</div>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
