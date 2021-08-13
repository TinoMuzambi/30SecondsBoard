import { State, Actions } from "../interfaces";

const Reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case "UPDATE_SIGNED_IN":
			return {
				...state,
				signedIn: action.signedIn,
			};
		case "SET_USER": {
			return {
				...state,
				user: action.user,
			};
		}
		case "SET_PROGRAMMES":
			return {
				...state,
				programmes: action.programmes,
			};
		case "SET_MAJORS":
			return {
				...state,
				majors: action.majors,
			};
		case "SET_COURSES":
			return {
				...state,
				courses: action.courses,
			};
	}
};

export default Reducer;
