import { useState, useEffect, useRef, useCallback } from "react";
import {
  VStack,
  Box,
  Text,
  HStack,
  Input,
  IconButton,
  Center,
  Stack,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import MainContainer from "../components/MainContainer";

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
  const searchRef = useRef(null);
  const navigate = useNavigate();
  let source;

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      if (source) {
        source.cancel("Cancelling previous request");
      }
      source = axios.CancelToken.source();
      func();
    }, delay);
  };

  const searchFoods = useCallback(async () => {
    try {
      console.log("Foodname:", foodName);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
        { foodName },
        { cancelToken: source.token }
      );
      setResults(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
      } else {
        console.log(error);
      }
    }
  }, [foodName]);
  useEffect(() => {
    console.log(results);
  }, [results]);

  // Search foods from the API based on user input, using debounce to limit API calls
  useEffect(() => {
    if (foodName) {
      debounce(searchFoods, 300); // Debounce for 300ms
    } else {
      setResults([]);
    }
  }, [foodName, searchFoods]);

  const handleScanBarcode = () => {
    // TODO: Implement barcode scanning
    console.log("Barcode scanning not implemented yet");
  };

  const handleFoodSelect = (food) => {
    navigate(`/food-details/${food.barcode}`, { state: { food } });
  };

  const stackDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <MainContainer>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Stack direction={stackDirection} justify="space-between" spacing={4}>
            <Badge>Calories: 2000/2000 kcal</Badge>
            <Badge>Protein: 50g</Badge>
            <Badge>Carbs: 250g</Badge>
            <Badge>Fat: 50g</Badge>
          </Stack>
        </Box>

        <HStack>
          <Input
            placeholder="Enter food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </HStack>

        {/* Display search results */}
        {results.length > 0 && (
          <VStack align="start">
            {results.map((food) => (
              <Text key={food.barcode} onClick={() => handleFoodSelect(food)}>
                {food.foodName}
              </Text>
            ))}
          </VStack>
        )}

        {/* Display diary entries */}
        {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
          <Box key={mealType}>
            <Text fontWeight="bold">{mealType}</Text>
            <VStack align="start">
              {diary[mealType].map((food) => (
                <Text key={food.barcode}>{food.name}</Text>
              ))}
            </VStack>
          </Box>
        ))}

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
