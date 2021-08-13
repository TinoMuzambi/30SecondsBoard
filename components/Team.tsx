import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Team, TeamProps } from "../interfaces";
import { isUnique } from "../utils";

const TeamComp: React.FC<TeamProps> = ({ num }): JSX.Element => {
	const [teamName, setTeamName] = useState("");
	const [teamColour, setTeamColour] = useState("#000");

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

	const updateContext = (
		name: string,
		boardPosition: number,
		colour: string
	) => {
		if (isUnique(name, teams)) {
			const newTeams = [
				...teams,
				{ name: name, boardPosition: boardPosition, colour: colour },
			];
			if (setTeams) setTeams(newTeams);
			localStorage.setItem("30-seconds-game", JSON.stringify(newTeams));
		} else {
			const newTeams = [...teams];
			for (let i = 0; i < teams.length; i++) {
				if (newTeams[i].name === name) newTeams[i].colour = colour;
			}
			if (setTeams) setTeams(newTeams);
			localStorage.setItem("30-seconds-game", JSON.stringify(newTeams));
		}
	};

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
							updateContext(e.target.value, 0, teamColour);
						}
					}}
				/>
				<div className="input-group">
					<label htmlFor="colour" className="label">
						Choose a team colour:
					</label>
					<input
						type="color"
						id="colour"
						className="input colour"
						required
						value={teamColour}
						onChange={(e) => setTeamColour(e.target.value)}
						onBlur={(e) => {
							updateContext(teamName, 0, e.target.value);
						}}
					/>
				</div>
				<div className="line"></div>
			</div>
		</>
	);
};

export default TeamComp;
