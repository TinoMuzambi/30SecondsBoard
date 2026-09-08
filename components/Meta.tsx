import Head from "next/head";

import { MetaProps } from "../interfaces";
import { BASE_URL } from "../utils";

const Meta = ({
	title = "30 Seconds",
	description = "A local-first team scorekeeper and round timer for playing the 30 Seconds party game.",
	url = BASE_URL,
}: MetaProps) => (
	<Head>
		<meta name="theme-color" content="#11182a" />
		<meta name="description" content={description} />
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<link rel="icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/logo192.png" />
		<link rel="manifest" href="/manifest.json" />
		<title>{title}</title>
	</Head>
);

export default Meta;
