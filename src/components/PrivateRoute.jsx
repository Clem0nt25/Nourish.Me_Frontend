import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { isLoggedInSt, isLoadingSt } = useContext(SessionContext);

	if (!isLoggedInSt && !isLoadingSt) {
		return <Navigate to="/login" />;
	}

	return isLoadingSt ? <h1>Loading...</h1> : <>{children}</>;
};

export default PrivateRoute;
