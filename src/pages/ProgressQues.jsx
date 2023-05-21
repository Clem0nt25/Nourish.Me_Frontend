import { useState, useEffect } from "react";
import NameForm from "../components/forms/NameForm";
import GoalForm from "../components/forms/GoalForm";
import ActivityLevelForm from "../components/forms/ActivityLevelForm";
import BaseInfoForm from "../components/forms/BaseInfoForm";
import WeightForm from "../components/forms/WeightForm";
import FinalText from "../components/forms/FinalText";

function ProgressQues() {
	const [stepSt, setStepSt] = useState(0);
	const [inputSt, setInputSt] = useState({
		username: "",
		mainGoal: "",
		activityLevel: "",
		gender: "",
		yearOfBirth: "",
		height: "",
		currWeight: "",
		goalWeightChange: "",
		weightChangePerWeek: "",
	});

	const [ifFilledSt, setIfFilledSt] = useState([]);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
		console.log(e.target.name, e.target.value);
	};

	//set the boolean array to check if the current form is filled, if not - disable the next button
	useEffect(() => {
		const ifFilled = [];
		if (inputSt.username) ifFilled[0] = true;
		if (inputSt.mainGoal) ifFilled[1] = true;
		if (inputSt.activityLevel) ifFilled[2] = true;
		if (inputSt.gender && inputSt.yearOfBirth && inputSt.height)
			ifFilled[3] = true;
		if (inputSt.currWeight && inputSt.weightChangePerWeek) ifFilled[4] = true;

		setIfFilledSt(ifFilled);
	}, [inputSt]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(stepSt, inputSt);
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

//needed data in the database: username, mainGoal, caloriesGoal, activityLevel, gender, yearOfBirth, height, currentWeight, goalWeightChange, goalWeight? weightChangePerWeek, caloriesGoal,

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
