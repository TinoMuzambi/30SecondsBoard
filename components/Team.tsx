import { useState } from "react";
import { TeamProps } from "../interfaces";

const Team: React.FC<TeamProps> = ({ num, teams, setTeams }): JSX.Element => {
	const [teamName, setTeamName] = useState("");

	return (
		<>
			<h2 className="name">Team #{num + 1} details:</h2>
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
						if (e.target.value) setTeams([...teams, { name: e.target.value }]);
					}}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="" className="label"></label>
				<input type="text" className="input" />
			</div>
		</>
	);
};

export default Team;
