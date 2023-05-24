import {
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

const date = new Date();
const currYear = date.getFullYear();
const years = new Array(currYear - 1900 + 1).fill(1900);

export default function BaseInfoForm({ inputSt, handleInput }) {
	return (
		<>
			<h2>
				Please select a gender that suits you.
				<p>We need a sex to calculate the calorie needs of your body.</p>
			</h2>
			<div className="progress-form-radio-div gender-radio">
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
					<button type="button">
						<label htmlFor="female">Female</label>
					</button>
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
					<button type="button">
						<label htmlFor="male">Male</label>
					</button>
				</div>
			</div>
			<div className="progress-gap-div"></div>
			<h2>What is your year of birth?</h2>
			<Select
				className="my-select"
				name="yearOfBirth"
				value={inputSt.yearOfBirth}
				onChange={handleInput}
				required
			>
				<option value="">Year of Birth</option>
				{years.map((_, i) => {
					return (
						<option className="my-option" value={currYear - i} key={i}>
							{currYear - i}
						</option>
					);
				})}
			</Select>
			<div className="progress-gap-div"></div>
			<h2>How tall are you? (cm)</h2>
			<NumberInput
				className="progress-num-input"
				step={1}
				min={10}
				max={250}
				value={inputSt.height}
				onChange={(value) => {
					const target = { value: value, name: "height" };
					handleInput({ target: target });
				}}
			>
				<NumberInputField placeholder="Height" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<span>cm</span>
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</>
	);
}
