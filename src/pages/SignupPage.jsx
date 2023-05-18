import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function SignupPage() {
	const [inputSt, setInputSt] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [errorSt, setErrorSt] = useState("");
	const navigate = useNavigate();
	const { isLoggedInSt } = useContext(SessionContext);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (inputSt.password === inputSt.passwordConfirm) {
			const playload = { email: inputSt.email, password: inputSt.password };
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BASE_API_URL}/api/signup`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(playload),
					}
				);
				if (response.status === 201) {
					navigate("/login");
				} else if (response.status === 500) {
					setErrorSt("Somthing wrong with the server. Please try later.");
					setTimeout(() => {
						setErrorSt("");
					}, 2500);
				}
			} catch (error) {
				console.log("Error when signing up and posting to backend - ", error);
			}
		} else {
			setErrorSt("Passwords don't match!");
			setTimeout(() => {
				setErrorSt("");
			}, 2500);
		}
	};

	if (isLoggedInSt) {
		return <Navigate to="/daily-diary" />;
	}
	return (
		<div>
			<h2>Signup</h2>
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
				<label>
					Confirm Password:
					<input
						type="password"
						required
						name="passwordConfirm"
						value={inputSt.passwordConfirm}
						onChange={handleInput}
					/>
				</label>
				<button type="submit">Create your account</button>
			</form>

			<Link to="/login">
				<button>I have an account</button>
			</Link>
			{errorSt && <p>{errorSt}</p>}
		</div>
	);
}

export default SignupPage;
