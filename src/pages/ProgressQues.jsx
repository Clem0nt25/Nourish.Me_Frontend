import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import NameForm from "../components/forms/NameForm";
import GoalForm from "../components/forms/GoalForm";
import ActivityLevelForm from "../components/forms/ActivityLevelForm";
import BaseInfoForm from "../components/forms/BaseInfoForm";
import WeightForm from "../components/forms/WeightForm";
import FinalText from "../components/forms/FinalText";
import { useNavigate } from "react-router";

function ProgressQues() {
	const [stepSt, setStepSt] = useState(0);
	const [inputSt, setInputSt] = useState({
		username: "",
		mainGoal: "",
		activityLevel: "",
		gender: "",
		yearOfBirth: "",
		height: "",
		currentWeight: "",
		goalWeightChange: "",
		weightChangePerWeek: "",
	});

	const [ifFilledSt, setIfFilledSt] = useState([]);

	const { currUserSt } = useContext(SessionContext);

	const navigate = useNavigate();

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const checkPotential = async () => {
		try {
			const potentialRes = await fetch(
				`${import.meta.env.VITE_BASE_API_URL}/api/checkUserSpecs/${
					currUserSt._id
				}`
			);
			if (potentialRes.status === 200) {
				navigate("/daily-diary");
			}
		} catch (error) {
			console(error);
		}
	};

	useEffect(() => {
		checkPotential();
	}, []);

	//set the boolean array to check if the current form is filled, if not - disable the next button
	useEffect(() => {
		const ifFilled = [];
		if (inputSt.username) ifFilled[0] = true;
		if (inputSt.mainGoal) ifFilled[1] = true;
		if (inputSt.activityLevel) ifFilled[2] = true;
		if (inputSt.gender && inputSt.yearOfBirth && inputSt.height)
			ifFilled[3] = true;
		if (inputSt.currentWeight && inputSt.weightChangePerWeek)
			ifFilled[4] = true;

		setIfFilledSt(ifFilled);
	}, [inputSt]);

	//works with the previous function to handle the case that the user does not want weight change,
	//then fill the input feilds to pass the check to activate "next" button
	const setWeightPlan = (ifNeedPlan) => {
		if (ifNeedPlan && inputSt.weightChangePerWeek === "skip") {
			setInputSt({ ...inputSt, goalWeightChange: "", weightChangePerWeek: "" });
		} else if (!ifNeedPlan) {
			setInputSt({
				...inputSt,
				goalWeightChange: 0,
				weightChangePerWeek: "skip",
			});
		}
	};

	const displayByStep = () => {
		let display;
		switch (stepSt) {
			case 0:
				display = <NameForm inputSt={inputSt} handleInput={handleInput} />;
				break;
			case 1:
				display = <GoalForm inputSt={inputSt} handleInput={handleInput} />;
				break;
			case 2:
				display = (
					<ActivityLevelForm inputSt={inputSt} handleInput={handleInput} />
				);
				break;
			case 3:
				display = <BaseInfoForm inputSt={inputSt} handleInput={handleInput} />;
				break;
			case 4:
				display = (
					<WeightForm
						inputSt={inputSt}
						handleInput={handleInput}
						setWeightPlan={setWeightPlan}
					/>
				);
				break;
			case 5:
				display = <FinalText inputSt={inputSt} />;
				break;
			default:
				display = <h2>Error</h2>;
		}
		return display;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// ----------------------------------------------------------
		// caculate

		const currDate = new Date();
		const userAge = currDate.getFullYear() - inputSt.yearOfBirth;

		const goalWeight =
			Number(inputSt.currentWeight) +
			(inputSt.mainGoal === "get-lean"
				? -Number(inputSt.goalWeightChange)
				: Number(inputSt.goalWeightChange));

		let activityFactor = 1.2;
		switch (inputSt.activityLevel) {
			case "sedentary":
				activityFactor = 1.2;
				break;
			case "light":
				activityFactor = 1.375;
				break;
			case "moderate":
				activityFactor = 1.55;
				break;
			case "active":
				activityFactor = 1.725;
				break;
			case "intense":
				activityFactor = 1.9;
				break;
		}

		let coloriesGapDaily = 0;
		switch (inputSt.weightChangePerWeek) {
			case "0.25kg":
				coloriesGapDaily = 250;
				break;
			case "0.5kg":
				coloriesGapDaily = 500;
				break;
			case "0.75kg":
				coloriesGapDaily = 750;
				break;
			case "skip":
				coloriesGapDaily = 0;
				break;
		}

		const baseCalories =
			(10 * inputSt.currentWeight +
				6.25 * inputSt.height -
				5 * userAge +
				(inputSt.gender === "female" ? -161 : 5)) *
			activityFactor;

		const goalCalories = Math.round(
			baseCalories +
				(inputSt.mainGoal === "get-lean" ? -coloriesGapDaily : coloriesGapDaily)
		);

		const nutritionProportion = {};
		switch (inputSt.mainGoal) {
			case "bulk-up":
				nutritionProportion.protein = 0.23;
				nutritionProportion.carbs = 0.5;
				nutritionProportion.fat = 0.27;
				break;
			case "get-strong":
				nutritionProportion.protein = 0.2;
				nutritionProportion.carbs = 0.58;
				nutritionProportion.fat = 0.22;
				break;
			case "recompose":
				nutritionProportion.protein = 0.28;
				nutritionProportion.carbs = 0.5;
				nutritionProportion.fat = 0.22;
				break;
			case "get-lean":
				nutritionProportion.protein = 0.38;
				nutritionProportion.carbs = 0.4;
				nutritionProportion.fat = 0.22;
				break;
			case "keep-shape":
				nutritionProportion.protein = 0.2;
				nutritionProportion.carbs = 0.55;
				nutritionProportion.fat = 0.25;
				break;
		}

		const goalProtein = Math.round(
			(nutritionProportion.protein * goalCalories) / 4
		);
		const goalCarbs = Math.round(
			(nutritionProportion.carbs * goalCalories) / 4
		);
		const goalFat = Math.round((nutritionProportion.fat * goalCalories) / 9);

		const userSpecs = { ...inputSt };
		delete userSpecs.goalWeightChange;

		const payload = {
			...userSpecs,
			goalWeight,
			goalCalories,
			goalProtein,
			goalCarbs,
			goalFat,
			goalFiber: 30,
			data: currDate.toISOString().split("T")[0],
			userId: currUserSt._id,
		};

		// console.log(payload);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_API_URL}/api/createUserSpecsCurrent/${
					currUserSt._id
				}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			if (response.status === 201) {
				navigate("/daily-diary");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const barLengthCss =
		Math.round((1 / 6) * (stepSt + 1) * 100).toString() + "%";

	return (
		<div>
			<div className="progressbar">
				<div style={{ width: barLengthCss }}></div>
			</div>
			<form onSubmit={handleSubmit}>
				<div>{displayByStep()}</div>
				<div>
					<button
						type="button"
						hidden={stepSt === 0 ? true : false}
						onClick={() => {
							if (stepSt > 0) {
								setStepSt((preStep) => preStep - 1);
							}
						}}
					>
						Back
					</button>
					<button
						type="button"
						disabled={!ifFilledSt[stepSt]}
						hidden={stepSt < 5 ? false : true}
						onClick={() => {
							if (stepSt < 5) {
								setStepSt((preStep) => preStep + 1);
							}
						}}
					>
						Next
					</button>
					<button type="submit" hidden={stepSt === 5 ? false : true}>
						Complete
					</button>
				</div>
			</form>
		</div>
	);
}

export default ProgressQues;

//this part could be some preference food tags of the user
// const FoodTagForm = () => {
// 	return (
// 		<div>
// 			<h2>In terms of diet modification, what do you want to focus on?</h2>
// 			<p>Select all that apply.</p>
// 			<input />
// 		</div>
// 	);
// };
