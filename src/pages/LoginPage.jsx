import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
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

function LoginPage() {
	const [inputSt, setInputSt] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [errorSt, setErrorSt] = useState("");
	const { setTokenSt, isLoggedInSt } = useContext(SessionContext);

	const handleInput = (e) => {
		setInputSt({ ...inputSt, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_API_URL}/api/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(inputSt),
				}
			);
			if (response.status === 200) {
				const { token } = await response.json();
				setTokenSt(token);

				navigate("/daily-diary");
			} else if (
				response.status === 401 ||
				response.status === 404 ||
				response.status === 500
			) {
				const { message } = await response.json();
				setErrorSt(message);
				setTimeout(() => {
					setErrorSt("");
				}, 2500);
			}
		} catch (error) {
			console.log("Error when logging in and posting to backend - ", error);
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
					<Text fontSize="2xl">Login</Text>
					<FormControl isRequired>
						<FormLabel>Email Address:</FormLabel>
						<Input
							type="email"
							name="email"
							bg="#E8E8E8"
							value={inputSt.email}
							onChange={handleInput}
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
					<Button colorScheme="teal" type="submit">
						Login
					</Button>
					<Link as={RouterLink} to="/signup">
						<Button variant="link">Don't have an account yet?</Button>
					</Link>
					{errorSt && <Text color="red.500">{errorSt}</Text>}
				</VStack>
			</form>
		</Center>
	);
}

export default LoginPage;
