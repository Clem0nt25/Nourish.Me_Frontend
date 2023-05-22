const date = new Date();
const currYear = date.getFullYear();
const years = new Array(currYear - 1900 + 1).fill(1900);

export default function BaseInfoForm({ inputSt, handleInput }) {
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
			<select
				name="yearOfBirth"
				value={inputSt.yearOfBirth}
				onChange={handleInput}
				required
			>
				<option value="">Year of Birth</option>
				{years.map((_, i) => {
					return (
						<option value={currYear - i} key={i}>
							{currYear - i}
						</option>
					);
				})}
			</select>

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
}
