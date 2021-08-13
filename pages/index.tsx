import { useState } from "react";
import Team from "../components/Team";

const Home = () => {
	const [noTeams, setNoTeams] = useState(0);
	const [teams, setTeams] = useState([]);

	return (
		<main className="main">
			<h1 className="title">30 Seconds Game</h1>

			<h3 className="subtitle">Game Setup</h3>
			<form className="form">
				<div className="input-group">
					<label htmlFor="teams" className="label">
						How many teams are playing
					</label>
					<input
						type="number"
						className="input"
						id="teams"
						min={0}
						max={10}
						value={noTeams}
						onChange={(e) => setNoTeams(Number.parseInt(e.target.value))}
					/>
				</div>
				{[...Array(noTeams)].map((item, key) => (
					<div className="team" key={key}>
						<Team key={key} teams={teams} setTeams={setTeams} />
					</div>
				))}
				<input type="submit" value="Start Game" />
			</form>
		</main>
	);
};

export default Home;
// 33
