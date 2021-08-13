export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://30-seconds-board.vercel.app/"
		: "http://localhost:3000";
