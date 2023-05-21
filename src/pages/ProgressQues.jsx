import { useState, useEffect } from "react";

const date = new Date();
const currYear = date.getFullYear();

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
		goalWeight: "",
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
		if (inputSt.currWeight && inputSt.goalWeight && inputSt.weightChangePerWeek)
			ifFilled[4] = true;

		setIfFilledSt(ifFilled);
	}, [inputSt]);

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
				display = <WeightForm inputSt={inputSt} handleInput={handleInput} />;
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

	return (
		<div>
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

//needed data in the database: username, mainGoal, caloriesGoal, activityLevel, gender, yearOfBirth, height, currentWeight, goalWeight, weightChangePerWeek, caloriesGoal,

const NameForm = ({ inputSt, handleInput }) => {
	return (
		<>
			<h2>What should we call you?</h2>
			<p>We're happy you're here. Let's get to know a little about you.</p>
			<input
				name="username"
				placeholder="Your Name"
				required
				value={inputSt.username}
				onChange={handleInput}
			/>
		</>
	);
};

const GoalForm = ({ inputSt, handleInput }) => {
	return (
		<>
			<h2>Thanks {inputSt.username}! Now for your goals.</h2>
			<p>Select your main diet goal below.</p>

			<div>
				<input
					type="radio"
					id="bulk-up"
					value="bulk-up"
					name="mainGoal"
					readOnly
					checked={"bulk-up" === inputSt.mainGoal}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="bulk-up">
						Bulk Up - Gain muscle with as little fat as possible.
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="get-strong"
					value="get-strong"
					name="mainGoal"
					readOnly
					checked={"get-strong" === inputSt.mainGoal}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="get-strong">
						Get Strong - Gain maximum muscle and concern less about fat.
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="recompose"
					value="recompose"
					name="mainGoal"
					readOnly
					checked={"recompose" === inputSt.mainGoal}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="recompose">
						Recomposition - Gain muscle and lose fat at the same time.
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="get-lean"
					value="get-lean"
					name="mainGoal"
					readOnly
					checked={"get-lean" === inputSt.mainGoal}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="get-lean">
						Get Lean - Lose weight while maintaining muscle as much as possible.
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="keep-shape"
					value="keep-shape"
					name="mainGoal"
					readOnly
					checked={"keep-shape" === inputSt.mainGoal}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="keep-shape">
						Keep Shape - Keep your current body shape and track a healthy diet.
					</label>
				</button>
			</div>
		</>
	);
};

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

const ActivityLevelForm = ({ inputSt, handleInput }) => {
	return (
		<>
			<h2>What is your daily activity level?</h2>
			<p>Including your daily jobs and workouts.</p>

			<div>
				<input
					type="radio"
					id="sedentary"
					value="sedentary"
					name="activityLevel"
					readOnly
					checked={"sedentary" === inputSt.activityLevel}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="sedentary">Sedentary (little or no exercise)</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="light"
					value="light"
					name="activityLevel"
					readOnly
					checked={"light" === inputSt.activityLevel}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="light">
						Lightly active (light exercise 1 to 3 days/week)
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="moderate"
					value="moderate"
					name="activityLevel"
					readOnly
					checked={"moderate" === inputSt.activityLevel}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="moderate">
						Moderately active (light to moderate exercise 4 to 5 days/week)
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="active"
					value="active"
					name="activityLevel"
					readOnly
					checked={"active" === inputSt.activityLevel}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="active">
						Active (moderate exercise 6 to 7 days/week or intense exercise 3 to
						4 times/week)
					</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="intense"
					value="intense"
					name="activityLevel"
					readOnly
					checked={"intense" === inputSt.activityLevel}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="intense">
						Very active (intense exercise 6 to 7 times/week, sports training, or
						physical job)
					</label>
				</button>
			</div>
		</>
	);
};

// const ExerciseLevelForm = ({ inputSt, handleInput }) => {
// 	return (
// 		<>
// 			<h2>Complete this statement: “I feel better after I ________.</h2>
// 			<p>Select all that apply.</p>
// 			<input />
// 		</>
// 	);
// };

const BaseInfoForm = ({ inputSt, handleInput }) => {
	return (
		<>
			<h2>
				Please select which sex we should use to calculate your calorie needs.
			</h2>
			<div>
				<input
					type="radio"
					id="female"
					value="female"
					name="gender"
					readOnly
					checked={"female" === inputSt.gender}
					onClick={handleInput}
				/>
				<label htmlFor="female">Female</label>
			</div>
			<div>
				<input
					type="radio"
					id="male"
					value="male"
					name="gender"
					readOnly
					checked={"male" === inputSt.gender}
					onClick={handleInput}
				/>
				<label htmlFor="male">Male</label>
			</div>
			<h2>What is your year of birth?</h2>
			<input
				type="number"
				name="yearOfBirth"
				min="1900"
				placeholder="Year of Birth"
				max={currYear}
				step="1"
				value={inputSt.yearOfBirth}
				onChange={handleInput}
			/>
			<h2>How tall are you?</h2>
			<div>
				<input
					type="number"
					name="height"
					placeholder="Height"
					min="0"
					max="250"
					step="1"
					value={inputSt.height}
					onChange={handleInput}
				/>
				<span>cm</span>
			</div>
		</>
	);
};

const WeightForm = ({ inputSt, handleInput }) => {
	return (
		<>
			<h2>How much do you weigh now?</h2>
			<p>Be honest! And you can update this later.</p>
			<div>
				<input
					type="number"
					name="currWeight"
					placeholder="Your Currrent Weight"
					min="0"
					max="500"
					step="0.5"
					value={inputSt.currWeight}
					onChange={handleInput}
				/>
				<span>kg</span>
			</div>

			{/* conditional, only for user who wants to change their weright */}
			<h2>What's your goal weight?</h2>
			<p>
				Don't worry. You can be bold for now! You can always change it later.
			</p>
			<div>
				<input
					type="number"
					name="goalWeight"
					placeholder="Your Goal Weight"
					min="0"
					max="350"
					step="0.5"
					value={inputSt.goalWeight}
					onChange={handleInput}
				/>
				<span>kg</span>
			</div>

			<h2>How quickly do you plan to move toward your goal?</h2>
			<p>Choose how much weight you want to gain/lose each week</p>
			<div>
				<input
					type="radio"
					id="0.25kg"
					value="0.25kg"
					name="weightChangePerWeek"
					readOnly
					checked={"0.25kg" === inputSt.weightChangePerWeek}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="0.25kg">0.25kg per week</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="0.5kg"
					value="0.5kg"
					name="weightChangePerWeek"
					readOnly
					checked={"0.5kg" === inputSt.weightChangePerWeek}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="0.5kg">0.5kg per week</label>
				</button>
			</div>
			<div>
				<input
					type="radio"
					id="0.75kg"
					value="0.75kg"
					name="weightChangePerWeek"
					readOnly
					checked={"0.75kg" === inputSt.weightChangePerWeek}
					onClick={handleInput}
				/>
				<button type="button">
					<label htmlFor="0.75kg">0.75kg per week</label>
				</button>
			</div>
		</>
	);
};

const FinalText = ({ inputSt }) => {
	return (
		<>
			<h2>
				Great {inputSt.username}! You've just taken a big step. Now start your
				journey!
			</h2>
		</>
	);
};
