import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function Profile() {
	const { logout } = useContext(SessionContext);
	return (
		<div>
			Profile
			<button onClick={logout}>Log out</button>
		</div>
	);
}

export default Profile;
