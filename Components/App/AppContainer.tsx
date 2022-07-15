import { AuthContainer } from "../Login/Login";

export const AppContainer = ({ children }) => {
	return (
		<>
			<AuthContainer>{children}</AuthContainer>
		</>
	);
};
export default AppContainer;
