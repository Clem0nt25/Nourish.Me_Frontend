import { useEffect, useState } from "react";

export default function WeightForm({ inputSt, handleInput, setWeightPlan }) {
	const [ifNeedPlanSt, setIfNeedPlanSt] = useState(false);

	useEffect(() => {
		if (inputSt.mainGoal === "recompose" || inputSt.mainGoal === "keep-shape") {
			setWeightPlan && setWeightPlan(false);
			setIfNeedPlanSt(false);
		} else {
			setWeightPlan && setWeightPlan(true);
			setIfNeedPlanSt(true);
		}
	}, []);

	return (
		<>
			<h2>How much do you weigh now?</h2>
			<p>Be honest! And you can update this later.</p>
			<div>
				<input
					type="number"
					name="currentWeight"
					placeholder="Your Currrent Weight"
					min={0}
					max={500}
					step={0.1}
					value={inputSt.currentWeight}
					onChange={handleInput}
				/>
				<span>kg</span>
			</div>

			{/* conditional, only for user who wants to change their weright */}
			{ifNeedPlanSt && (
				<>
					<h2>
						How much weight would you like to{" "}
						{inputSt.mainGoal === "get-lean" ? " lose" : " gain"}?
					</h2>
					<p>
						Don't worry. You can be bold for now! You can always change it
						later.
					</p>
					<div>
						<span>
							Your goal weight will be {inputSt.currentWeight}
							{inputSt.mainGoal === "get-lean" ? " - " : " + "}
						</span>
						<input
							type="number"
							name="goalWeightChange"
							placeholder="Weight Change"
							min={0}
							max={50}
							step={0.1}
							value={inputSt.goalWeightChange}
							onChange={handleInput}
						/>
						<span>
							{" = "}
							{Number(inputSt.currentWeight) +
								(inputSt.mainGoal === "get-lean"
									? -Number(inputSt.goalWeightChange)
									: Number(inputSt.goalWeightChange))}
							kg
						</span>
					</div>

					<h2>
						How quickly do you plan to
						{inputSt.mainGoal === "get-lean" ? " lose fat" : " gain muscle"} ?
					</h2>
					<p>
						Choose how much weight you want to{" "}
						{inputSt.mainGoal === "get-lean" ? " lose" : "gain"} each week.
					</p>
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
			)}
		</>
	);
}
