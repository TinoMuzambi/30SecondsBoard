import { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
import {
	ContextProps,
	AppProviderProps,
	UserModel,
	ProgrammeModel,
	MajorModel,
	CourseModel,
} from "../interfaces";

const initialState: ContextProps = {
	signedIn: false,
	user: null,
	programmes: null,
	majors: null,
	courses: null,
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setSignedIn: Function = (value: boolean) => {
		dispatch({
			type: "UPDATE_SIGNED_IN",
			signedIn: value,
			user: state.user,
			programmes: state.programmes,
			majors: state.majors,
			courses: state.courses,
		});
	};

	const setUser: Function = (value: UserModel | null) => {
		dispatch({
			type: "SET_USER",
			signedIn: state.signedIn,
			user: value,
			programmes: state.programmes,
			majors: state.majors,
			courses: state.courses,
		});
	};

	const setProgrammes: Function = (value: ProgrammeModel[] | null) => {
		dispatch({
			type: "SET_PROGRAMMES",
			signedIn: state.signedIn,
			user: state.user,
			programmes: value,
			majors: state.majors,
			courses: state.courses,
		});
	};

	const setMajors: Function = (value: MajorModel[] | null) => {
		dispatch({
			type: "SET_MAJORS",
			signedIn: state.signedIn,
			user: state.user,
			programmes: state.programmes,
			majors: value,
			courses: state.courses,
		});
	};

	const setCourses: Function = (value: CourseModel[] | null) => {
		dispatch({
			type: "UPDATE_SIGNED_IN",
			signedIn: state.signedIn,
			user: state.user,
			programmes: state.programmes,
			majors: state.majors,
			courses: value,
		});
	};

	return (
		<AppContext.Provider
			value={{
				signedIn: state.signedIn,
				user: state.user,
				setSignedIn,
				setUser,
				programmes: state.programmes,
				setProgrammes,
				majors: state.majors,
				setMajors,
				courses: state.courses,
				setCourses,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
