import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	VStack,
	Link,
	Text,
	Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function SignupPage() {
	const [inputSt, setInputSt] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [errorSt, setErrorSt] = useState("");
	const navigate = useNavigate();
	const { isLoggedInSt } = useContext(SessionContext);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (inputSt.password === inputSt.passwordConfirm) {
			const payload = { email: inputSt.email, password: inputSt.password };
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BASE_API_URL}/api/signup`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(payload),
					}
				);
				if (response.status === 201) {
					navigate("/login");
				} else if (response.status === 500) {
					setErrorSt("Something wrong with the server. Please try later.");
					setTimeout(() => {
						setErrorSt("");
					}, 2500);
				}
			} catch (error) {
				console.log("Error when signing up and posting to backend - ", error);
			}
		} else {
			setErrorSt("Passwords don't match!");
			setTimeout(() => {
				setErrorSt("");
			}, 2500);
		}
	};

	if (isLoggedInSt) {
		return <Navigate to="/daily-diary" />;
	}

	return (
		<Center>
			<form onSubmit={handleSubmit}>
				<VStack
					spacing={5}
					p={5}
					mt={10}
					bg="white"
					boxShadow="md"
					borderRadius="lg"
				>
					<Text fontSize="2xl">Signup</Text>
					<FormControl isRequired>
						<FormLabel>Email Address:</FormLabel>
						<Input
							type="email"
							name="email"
							value={inputSt.email}
							onChange={handleInput}
							bg="#E8E8E8"
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Password:</FormLabel>
						<Input
							type="password"
							name="password"
							value={inputSt.password}
							onChange={handleInput}
							bg="#E8E8E8"
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Confirm Password:</FormLabel>
						<Input
							type="password"
							name="passwordConfirm"
							value={inputSt.passwordConfirm}
							onChange={handleInput}
							bg="#E8E8E8"
						/>
					</FormControl>
					<Button colorScheme="teal" type="submit">
						Create your account
					</Button>
					<Link as={RouterLink} to="/login">
						<Button variant="link">I have an account</Button>
					</Link>
					{errorSt && <Text color="red.500">{errorSt}</Text>}
				</VStack>
			</form>
		</Center>
	);
}

export default SignupPage;
