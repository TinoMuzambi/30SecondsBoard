import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { RiStopCircleFill, RiRestartFill } from "react-icons/ri";

import Board from "../components/Board";
import { AppContext } from "../context/AppContext";

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

	// Remove teams from context and push to home page.
	const startNewGame = () => {
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
						<div className="buttons">
							<button className="start" onClick={() => setStart(false)}>
								<RiStopCircleFill className="icon" />
							</button>
							<button
								className="start"
								onClick={() => {
									setStart(true);
								}}
							>
								<MdPlayCircleFilled className="icon" />
							</button>
							<button
								className="start"
								onClick={() => {
									setTime(30);
									setStart(false);
								}}
							>
								<RiRestartFill className="icon" />
							</button>
						</div>
					</div>
				</div>
				<div className="wrapper">
					<h1 className="title">30 Seconds Game</h1>
					<button className="new" onClick={startNewGame}>
						New Game
					</button>
				</div>
			</header>
			<Board />
		</main>
	);
};

export default BoardPage;
