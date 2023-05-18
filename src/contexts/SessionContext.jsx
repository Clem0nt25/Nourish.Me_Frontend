import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const SessionContext = createContext();

function SessionContextProvider({ children }) {
	const [tokenSt, setTokenSt] = useState();
	const [isLoggedInSt, setIsLoggedInSt] = useState(false);
	const [isLoadingSt, setIsLoadingSt] = useState(true);

	const navigate = useNavigate();

	const verifyToken = async (currentToken) => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/api/verify`,
			{
				headers: {
					Authorization: `Bearer ${currentToken}`,
				},
			}
		);
		if (response.status === 200) {
			const parsed = await response.json();
			setTokenSt(currentToken);
			setIsLoggedInSt(true);
			console.log(parsed);
		}
		setIsLoadingSt(false);
	};

	useEffect(() => {
		const localToken = localStorage.getItem("authToken");
		if (localToken) {
			verifyToken(localToken);
		}
	}, []);

	useEffect(() => {
		if (tokenSt) {
			localStorage.setItem("authToken", tokenSt);
			setIsLoggedInSt(true);
			setIsLoadingSt(false);
		} else {
			localStorage.removeItem("authToken");
		}
	}, [tokenSt]);

	const logout = () => {
		setTokenSt();
		localStorage.removeItem("authToken");
		setIsLoggedInSt(false);
		navigate("/");
	};

	return (
		<SessionContext.Provider
			value={{ tokenSt, setTokenSt, isLoggedInSt, isLoadingSt, logout }}
		>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContextProvider;
