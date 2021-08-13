import { useRouter } from "next/dist/client/router";
import { FormEventHandler, useState } from "react";
import Team from "../components/Team";

const Home = () => {
	const [noTeams, setNoTeams] = useState(0);
	const [teams, setTeams] = useState([]);

	const router = useRouter();

	const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		router.push("/board");
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
					<input
						type="number"
						className="input"
						id="teams"
						min={0}
						max={10}
						value={noTeams}
						onChange={(e) => setNoTeams(Number.parseInt(e.target.value))}
						onWheel={(e) => e.currentTarget.blur()}
					/>
				</div>
				{[...Array(noTeams)].map((item, key) => (
					<div className="team" key={key}>
						<Team num={key} teams={teams} setTeams={setTeams} />
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
// 33
