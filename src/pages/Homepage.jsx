import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function Homepage() {
	const { isLoggedInSt } = useContext(SessionContext);

	if (isLoggedInSt) {
		return <Navigate to="/daily-diary" />;
	}
	return (
		<div className="homepage">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.{" "}
			</p>
			<Link to="/signup">
				<button>Signup</button>
			</Link>
		</div>
	);
}

export default Homepage;
