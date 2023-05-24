export default function ActivityLevelForm({
	inputSt,
	handleInput,
	inEdit = false,
}) {
	return (
		<>
			<h2>What is your daily activity level?</h2>
			{!inEdit && (
				<p>
					Including your daily jobs and workouts. No worries, you can modify it
					any time you want.
				</p>
			)}
			<div className="progress-form-radio-div">
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
							Active (moderate exercise 6 to 7 days/week or intense exercise 3
							to 4 times/week)
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
							Very active (intense exercise 6 to 7 times/week, sports training,
							or physical job)
						</label>
					</button>
				</div>
			</div>
		</>
	);
}
