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
	boardPosition?: number;
}

export interface Question {
	id: number;
	text: string;
}

export interface Team {
	name: string;
	colour: string;
	boardPosition?: number;
}

export type State = {
	teams: Team[];
};

export type Actions = {
	type: "SET_TEAMS";
	teams: Team[];
};
