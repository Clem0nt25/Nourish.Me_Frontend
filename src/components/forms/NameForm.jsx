export default function NameForm({ inputSt, handleInput, inEdit = false }) {
	return (
		<>
			<h2>What should we call you?</h2>
			{!inEdit && (
				<p>We're happy you're here. Let's get to know a little about you.</p>
			)}
			<input
				name="username"
				placeholder="Your Name"
				required
				value={inputSt.username}
				onChange={handleInput}
			/>
		</>
	);
}
