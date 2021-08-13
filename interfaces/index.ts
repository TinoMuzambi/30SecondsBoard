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

export interface BoardItem {
	image: string;
	shown: boolean;
	target?: "start" | "finish";
}

export interface Question {
	id: number;
	text: string;
}
