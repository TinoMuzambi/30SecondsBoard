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

export const getRandomNumber = (): number => {
	return Math.random() * 1000;
};
