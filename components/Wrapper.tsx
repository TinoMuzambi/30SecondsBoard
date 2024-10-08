import { AppProvider } from "../context/AppContext";
import { WrapperProps } from "../interfaces";
import Meta from "./Meta";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<AppProvider>
			<>
				<Meta />
				{children}
			</>
		</AppProvider>
	);
};

export default Wrapper;
