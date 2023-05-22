import { useState, useEffect, useRef } from "react";
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
import { getFood } from "../services/foodService";
import { delay } from "../utils/delay";

function DailyDiary() {
  const [foodName, setFoodName] = useState("");
  const [results, setResults] = useState([]);
  const [diary, setDiary] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    setFoodName(e.target.value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = delay(searchFoods, 300);
  };

  const handleScanBarcode = () => {
    console.log("Barcode scanning not implemented yet");
  };

  const handleFoodSelect = (food) => {
    navigate(`/food-details/${food.barcode}`, { state: { food } });
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
            variant="button-icon"
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
