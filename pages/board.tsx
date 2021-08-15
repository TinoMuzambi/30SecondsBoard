import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import Board from "../components/Board";
import { AppContext } from "../context/AppContext";
import { Team } from "../interfaces";

const BoardPage: React.FC = (): JSX.Element => {
	const [time, setTime] = useState(30);
	const [start, setStart] = useState(false);

	const { setTeams } = useContext(AppContext);
	const boardRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		// Timer for 30 second countdown.
		const timer = setTimeout(() => {
			if (time > 0 && start) {
				setTime(time - 1);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [start, time]);

	useEffect(() => {
		// Try getting and setting teams from local storage.
		const teamsObj = JSON.parse(
			localStorage.getItem("30-seconds-game") as string
		);
		let lsTeams: Team[] = [];
		if (teamsObj) {
			lsTeams = teamsObj;
			if (setTeams) setTeams(lsTeams);
		}

		if (lsTeams?.length <= 1) return startNewGame();
		(boardRef?.current as any)?.scrollIntoView();
	}, []);

	// Remove teams from local storage, context and push to home page.
	const startNewGame = () => {
		localStorage.removeItem("30-seconds-game");
		if (setTeams) setTeams([]);
		router.push("/");
	};

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
							{time === 30 ? "Start" : "Restart"}
						</button>
					</div>
				</div>
				<div className="wrapper">
					<h1 className="title">30 Seconds Game</h1>
					<button className="start" onClick={startNewGame}>
						New Game
					</button>
				</div>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
