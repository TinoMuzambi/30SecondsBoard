import { Dispatch, SetStateAction } from "react";

export interface WrapperProps {
	children: JSX.Element | JSX.Element[];
}

export interface MetaProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

export interface TeamProps {
	num: number;
	teams: any[];
	setTeams: Dispatch<SetStateAction<any[]>>;
}

export interface ContextProps {
	teams: Team[];
	setTeams?: Function;
}

export interface AppProviderProps {
	children: JSX.Element[] | JSX.Element;
}

export interface BoardItem {
	image: string;
	shown: boolean;
	target?: "start" | "finish";
}

export interface Question {
	id: number;
	text: string;
}

export interface Team {
	name: string;
}

export type State = {
	teams: Team[];
};

export type Actions = {
	type: "SET_TEAMS";
	teams: Team[];
};
