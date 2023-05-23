export default function GoalForm({ inputSt, handleInput, inEdit = false }) {
	return (
		<>
			{!inEdit && <h2>Thanks {inputSt.username}! Now for your goals.</h2>}
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
}
