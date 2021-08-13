import { State, Actions } from "../interfaces";

const Reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case "SET_TEAMS":
			return {
				...state,
				teams: action.teams,
			};
	}
};

export default Reducer;
