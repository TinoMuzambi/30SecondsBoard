import { AppProps } from "next/app";

import Wrapper from "../components/Wrapper";
import "../sass/App.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Wrapper>
    <Component {...pageProps} />
  </Wrapper>
);

export default MyApp;
