import { useState } from "react";

const Home = () => {
	const [noTeams, setNoTeams] = useState(0);
	const [teamName, setTeamName] = useState("");
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
						<h2 className="name">Team #{key + 1} details:</h2>
						<div className="input-group">
							<label htmlFor="name" className="label">
								Team Name
							</label>
							<input
								type="text"
								className="input"
								id="name"
								value={teamName}
								onChange={(e) => setTeamName(e.target.value)}
								onBlur={(e) => {
									if (e.target.value)
										setTeams([...teams, { name: e.target.value }]);
								}}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="" className="label"></label>
							<input type="text" className="input" />
						</div>
					</div>
				))}
				<input type="submit" value="Start Game" />
			</form>
		</main>
	);
};

export default Home;
// 33
