import { useState, useEffect, useRef, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useLocation } from "react-router-dom";

import {
	VStack,
	Box,
	IconButton,
	Center,
	Stack,
	Badge,
	useBreakpointValue,
} from "@chakra-ui/react";
import MainContainer from "../components/MainContainer";
import { FoodSearchBar } from "../components/DailyDiary/FoodSearchBar";
import { FoodSearchResults } from "../components/DailyDiary/FoodSearchResults";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FoodDiary } from "../components/DailyDiary/FoodDiary";
import barcodeIcon from "../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import { getFood, fetchDiary } from "../services/foodService.js";
import { delay } from "../utils/delay";

function DailyDiary() {
	const { currUserSt } = useContext(SessionContext);
	const [userSpecsSt, setUserSpecsSt] = useState();
	const [foodName, setFoodName] = useState("");
	const [results, setResults] = useState([]);
	const [diary, setDiary] = useState({
		breakfast: [],
		lunch: [],
		dinner: [],
		snack: [],
	});
	const [isLoading, setIsLoading] = useState(false);

	const searchRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchInitialDiary = async () => {
			const diary =
				location.state?.newDiary || (await fetchDiary(currUserSt._id));
			console.log("Diary data fetched in DailyDiary:", diary);
			setDiary(diary);
		};

		fetchInitialDiary();
	}, []);

	const findUserSpecs = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/api/checkUserSpecs/${
				currUserSt._id
			}`
		);
		if (response.status === 200) {
			const { data: userSpecs } = await response.json();
			setUserSpecsSt(userSpecs);
		} else if (response.status === 404) {
			//not found means we do not have any the user specs current doc in database
			//means this is a new user
			navigate("/progress-questionnaire");
		}
	};

	useEffect(() => {
		if (currUserSt) {
			findUserSpecs();
		}
	}, [currUserSt]);

	const searchFoods = async (isRetry = false) => {
		setIsLoading(true);

		if (!foodName.trim()) {
			setResults([]);
			setIsLoading(false);
			return;
		}

		try {
			const response = await getFood(foodName);
			setResults(response);
		} catch (error) {
			console.log(error);
			if (!isRetry) {
				console.log("Error occurred. Trying again in 1 second...");
				setTimeout(() => searchFoods(true), 1000);
			} else {
				console.log("Error occurred again. Aborting.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleFoodSelect = (food) => {
		navigate(`/food-details/${food.barcode}`, {
			state: { selectedFood: food },
		});
	};
	useEffect(() => {
		return () => {
			clearTimeout(searchRef.current);
		};
	}, []);
	const handleInputChange = (e) => {
		setFoodName(e.target.value);
		if (searchRef.current) clearTimeout(searchRef.current);
		searchRef.current = delay(searchFoods, 300);
	};

	const handleScanBarcode = () => {
		console.log("Barcode scanning not implemented yet");
	};

	useEffect(() => {
		return () => {
			clearTimeout(searchRef.current);
		};
	}, []);

	const stackDirection = useBreakpointValue({ base: "column", md: "row" });

	return (
		<MainContainer>
			<VStack align="stretch" spacing={4}>
				{/* Display daily macros */}
				<Box>
					<Stack direction={stackDirection} justify="space-between" spacing={4}>
						<Badge>Calories: 2000/2000 kcal</Badge>
						<Badge>Protein: 50g</Badge>
						<Badge>Carbs: 250g</Badge>
						<Badge>Fat: 50g</Badge>
					</Stack>
				</Box>

				{/* Search bar */}
				<FoodSearchBar
					foodName={foodName}
					handleInputChange={handleInputChange}
				/>

				{/* Display loading state */}
				<LoadingIndicator isLoading={isLoading} />

				{/* Display search results */}
				<FoodSearchResults
					results={results}
					handleFoodSelect={handleFoodSelect}
				/>

				{/* Display diary entries */}
				<FoodDiary diary={diary} />

				<Center>
					<IconButton
						variant="button-primary"
						aria-label="Scan a barcode"
						icon={<Box as="img" src={barcodeIcon} boxSize="20" p="3" />}
						boxSize="80px"
						isRound
						onClick={handleScanBarcode}
						boxShadow="lg"
						_hover={{ boxShadow: "xl" }}
					/>
				</Center>
			</VStack>
		</MainContainer>
	);
}
export default DailyDiary;
