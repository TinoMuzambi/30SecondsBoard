import { useRouter } from "next/router";
import { FormEventHandler, useContext, useEffect, useState } from "react";

import Team from "../components/Team";
import { AppContext } from "../context/AppContext";
import { isUnique } from "../utils";

const Home = () => {
	const [noTeams, setNoTeams] = useState(0);

	const { teams } = useContext(AppContext);
	const router = useRouter();

	useEffect(() => {
		// Reset local storage on load.
		localStorage.removeItem("30-seconds-game");
	}, []);

	const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		// Check that teams have unique names before starting.
		let errors = false;
		teams.forEach((team) => {
			if (!isUnique(team.name, teams)) errors = true;
		});

		if (errors) return alert("Please choose unique names");

		// If there are already teams in context, push to board page.
		if (teams?.length > 1) router.push("/board");
		else
			return alert(
				"Please create at least two uniquely named teams before starting the game."
			);
	};

	return (
		<main className="main home">
			<h1 className="title">30 Seconds Game</h1>
			<img src="/logo.png" alt="logo" className="logo" />

			<h3 className="subtitle">Game Setup</h3>
			<form className="form" onSubmit={submitHandler}>
				<div className="input-group">
					<label htmlFor="teams" className="label">
						How many teams are playing?
					</label>
					<div className="flex">
						<input
							type="range"
							className="input"
							id="teams"
							min={2}
							max={10}
							value={noTeams}
							onChange={(e) => setNoTeams(Number.parseInt(e.target.value))}
							onWheel={(e) => e.currentTarget.blur()}
						/>
						<label className="label">{noTeams}</label>
					</div>
				</div>
				{[...Array(noTeams)].map((_, key) => (
					<div className="team" key={key}>
						<Team num={key} />
					</div>
				))}
				<div className="input-group">
					<input type="submit" value="Start Game" className="submit" />
				</div>
			</form>
		</main>
	);
};

export default Home;
