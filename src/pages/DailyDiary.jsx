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
import { FoodSearchBar } from "../components/FoodSearchBar";
import { FoodSearchResults } from "../components/FoodSearchResults";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FoodDiary } from "../components/FoodDiary";
import barcodeIcon from "../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [source, setSource] = useState(axios.CancelToken.source());

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Delay function to limit API calls
  const delay = (func, delay) => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(func, delay);
  };

  const searchFoods = async () => {
    try {
      setIsLoading(true);

      if (!foodName.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Cancel previous request
      if (source) {
        source.cancel("Operation canceled due to new request.");
      }

      // Create a new CancelToken
      const newSource = axios.CancelToken.source();
      setSource(newSource);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
        { foodName },
        { cancelToken: newSource.token }
      );

      setResults(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFoodName(e.target.value);
    delay(searchFoods, 200);
  };

  const handleScanBarcode = () => {
    console.log("Barcode scanning not implemented yet");
  };

  const handleFoodSelect = (food) => {
    navigate(`/food-details/${food.barcode}`, { state: { food } });
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

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
          />
        </Center>
      </VStack>
    </MainContainer>
  );
}

export default DailyDiary;
