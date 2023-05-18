import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function Navbar() {
	const location = useLocation();
	const { isLoggedInSt } = useContext(SessionContext);

	return (
		<nav>
			<Link to="/">
				<img
					className="logo"
					//temporary logo placeholder
					src="https://w7.pngwing.com/pngs/309/348/png-transparent-diane-s-365-nutrition-logo-design.png"
					alt="logo"
					width={50}
				/>
			</Link>

			{location.pathname !== "/signup" &&
				location.pathname !== "/login" &&
				(isLoggedInSt ? (
					<Link to="/profile">
						<button>Profile</button>
					</Link>
				) : (
					<Link to="/login">
						<button>Login</button>
					</Link>
				))}
		</nav>
	);
}

export default Navbar;
