import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Team, TeamProps } from "../interfaces";

const TeamComp: React.FC<TeamProps> = ({ num }): JSX.Element => {
	const [teamName, setTeamName] = useState("");

	const { teams, setTeams } = useContext(AppContext);

	useEffect(() => {
		const teamsObj = JSON.parse(
			localStorage.getItem("30-seconds-game") as string
		);
		if (teamsObj) {
			const lsTeams: Team[] = teamsObj;
			if (setTeams) setTeams(lsTeams);
		}
	}, []);

	return (
		<>
			<h2 className="name">Team #{num + 1} details:</h2>
			<div className="input-group">
				<label htmlFor="name" className="label">
					Team Name:
				</label>
				<input
					type="text"
					className="input"
					id="name"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
					required
					onBlur={(e) => {
						if (e.target.value) {
							const newTeams = [
								...teams,
								{ name: e.target.value, boardPosition: 0 },
							];
							if (setTeams) setTeams(newTeams);
							localStorage.setItem("30-seconds-game", JSON.stringify(newTeams));
						}
					}}
				/>
				<div className="line"></div>
			</div>
		</>
	);
};

export default TeamComp;
