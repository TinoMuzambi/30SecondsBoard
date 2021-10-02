import { Team } from "../interfaces";

// Base url dependent on environment.
export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://30-seconds-board.vercel.app/"
		: "http://localhost:3000";

// Determine if given name is unique in teams array.
export const isUnique = (name: string, teams: Team[]): boolean => {
	const noOccurrences = teams.filter((team) => team.name === name);

	return noOccurrences.length <= 1;
};

// Get appropriate team name based on number of words in name.
export const getTeamName = (name: string): string => {
	const splitName = name.split(" ");
	if (splitName.length > 1)
		return splitName.map((char) => char.charAt(0)).join("");
	return name[0] + name[Math.floor(name.length / 2)];
};
