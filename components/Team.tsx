import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { TeamProps } from "../interfaces";

const Team: React.FC<TeamProps> = ({ num }): JSX.Element => {
	const [teamName, setTeamName] = useState("");

	const { teams, setTeams } = useContext(AppContext);

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
						if (e.target.value)
							setTeams([...teams, { name: e.target.value, boardPosition: 0 }]);
					}}
				/>
				<div className="line"></div>
			</div>
		</>
	);
};

export default Team;
