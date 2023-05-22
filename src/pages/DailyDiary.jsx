import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
import { useContext, useEffect, useState } from "react";

function DailyDiary() {
	const { currUserSt } = useContext(SessionContext);
	const [userSpecSt, setUserSpecSt] = useState();
	const navigate = useNavigate();

	const findUserSpec = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/api/checkUserSpecs/${
				currUserSt._id
			}`
		);
		console.log(response);
		if (response.status === 200) {
			const userSpec = await response.json();
			setUserSpecSt(userSpec);
		} else if (response.status === 404) {
			//not found means we do not have any the user specs current doc in database
			//means this is a new user
			navigate("/progress-questionnaire");
		}
	};

	useEffect(() => {
		if (currUserSt) {
			findUserSpec();
		}
	}, [currUserSt]);

	return (
		<div>
			{/* userSpecCurrent data display */}
			<div>Display "userSpecSt"</div>
		</div>
	);
}

export default DailyDiary;
