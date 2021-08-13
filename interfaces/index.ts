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

export interface BoardItem {
	image: string;
	shown: boolean;
	target?: "start" | "finish";
}
