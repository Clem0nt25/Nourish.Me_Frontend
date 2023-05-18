import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";

function LoginPage() {
	const [inputSt, setInputSt] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [errorSt, setErrorSt] = useState("");
	const { setTokenSt, isLoggedInSt } = useContext(SessionContext);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_API_URL}/api/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(inputSt),
				}
			);
			if (response.status === 200) {
				const { token } = await response.json();
				setTokenSt(token);

				//To Do: check if it's a new user or without any body specs set up
				//If so, then to the step-by-step questionaire

				//If not
				navigate("/daily-diary");
			} else if (
				response.status === 401 ||
				response.status === 404 ||
				response.status === 500
			) {
				const { message } = await response.json();
				setErrorSt(message);
				setTimeout(() => {
					setErrorSt("");
				}, 2500);
			}
		} catch (error) {
			console.log("Error when loging in and posting to backend - ", error);
		}
	};

	if (isLoggedInSt) {
		return <Navigate to="/daily-diary" />;
	}
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Email Address:
					<input
						type="email"
						required
						name="email"
						value={inputSt.email}
						onChange={handleInput}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						required
						name="password"
						value={inputSt.password}
						onChange={handleInput}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
			<Link to="/signup">
				<button>Don't have an account yet?</button>
			</Link>
			{errorSt && <p>{errorSt}</p>}
		</div>
	);
}

export default LoginPage;
