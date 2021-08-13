import { Team } from "../interfaces";

export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://30-seconds-board.vercel.app/"
		: "http://localhost:3000";

export const isUnique = (name: string, teams: Team[]): boolean => {
	let unique = true;
	teams.forEach((team) => {
		if (team.name === name) unique = false;
	});
	return unique;
};
