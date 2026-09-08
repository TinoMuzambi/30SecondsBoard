import { WrapperProps } from "../interfaces";
import Meta from "./Meta";

const Wrapper = ({ children }: WrapperProps) => (
  <>
    <Meta />
    {children}
  </>
);

export default Wrapper;
