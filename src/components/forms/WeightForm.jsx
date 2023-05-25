import { useEffect, useState } from "react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

export default function WeightForm({
	inputSt,
	handleInput,
	setWeightPlan,
	inEdit = false,
}) {
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
			{!inEdit && (
				<p>
					Be honest and you'll see your progress! You can always update this
					later.
				</p>
			)}
			<NumberInput
				className="progress-num-input"
				step={0.1}
				min={10}
				max={500}
				value={inputSt.currentWeight}
				onChange={(value) => {
					const target = { value: value, name: "currentWeight" };
					handleInput({ target: target });
				}}
			>
				<NumberInputField placeholder="Your Currrent Weight" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<span>kg</span>
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>

			{/* conditional, only for user who wants to change their weright */}
			{ifNeedPlanSt && (
				<>
					<div className="progress-gap-div"></div>
					<div className="progress-gap-div"></div>
					<h2>
						How much weight would you like to{" "}
						{inputSt.mainGoal === "get-lean" ? " lose" : " gain"}?
					</h2>
					{!inEdit && <p>Don't worry. You can be bold at first!</p>}
					<div className="goal-weight-line">
						<span>Your goal weight will be</span>
						<div>
							<span>
								{inputSt.currentWeight}
								{inputSt.mainGoal === "get-lean" ? " - " : " + "}
							</span>
							<NumberInput
								className="progress-num-input short-num-input"
								display={"inline-block"}
								width={"120px"}
								step={0.1}
								min={0}
								max={50}
								value={inputSt.goalWeightChange}
								onChange={(value) => {
									const target = { value: value, name: "goalWeightChange" };
									handleInput({ target: target });
								}}
							>
								<NumberInputField placeholder="Change" />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<span>
								{" = "}
								{Number(inputSt.currentWeight) +
									(inputSt.mainGoal === "get-lean"
										? -Number(inputSt.goalWeightChange)
										: Number(inputSt.goalWeightChange))}
								kg
							</span>
						</div>
					</div>
					<div className="progress-gap-div"></div>
					<h2>
						How quickly do you plan to
						{inputSt.mainGoal === "get-lean" ? " lose fat" : " gain muscle"} ?
					</h2>
					{!inEdit && (
						<p>
							Choose how much weight you want to{" "}
							{inputSt.mainGoal === "get-lean" ? " lose" : "gain"} each week.
						</p>
					)}
					<div className="progress-form-radio-div long-btn-div">
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
					</div>
				</>
			)}
		</>
	);
}
