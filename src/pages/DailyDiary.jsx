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
		if (response.status === 200) {
			const userSpec = await response.json();
			setUserSpecSt(userSpec);
			// } else if (response.status === 404) {
		} else {
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
			DailyDiary
			<div>Display "userSpecSt"</div>
		</div>
	);
}

export default DailyDiary;
