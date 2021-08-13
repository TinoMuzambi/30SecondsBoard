import { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
import { ContextProps, AppProviderProps, Team } from "../interfaces";

const initialState: ContextProps = {
	teams: [],
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setTeams: Function = (value: Team[]) => {
		dispatch({
			type: "SET_TEAMS",
			teams: value,
		});
	};

	return (
		<AppContext.Provider
			value={{
				teams: state.teams,
				setTeams,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
