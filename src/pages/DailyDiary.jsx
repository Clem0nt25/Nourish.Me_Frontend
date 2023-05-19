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
} from "@chakra-ui/react";

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

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(func, delay);
  };

  const searchFoods = useCallback(async () => {
    try {
      const response = await axios.post("/getFood", { foodName });
      setResults(response.data.data); // Assuming the API returns an array of food objects
    } catch (error) {
      console.log(error);
    }
  }, [foodName]);

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

  return (
    <VStack align="stretch" spacing={4}>
      {/* Placeholder for Calorie Tracker info - could be a pie chart or something */}
      <Stack direction="row" justify="space-between">
        <Badge>Calories: 2000/2000 kcal</Badge>
        <Badge>Protein: 50g</Badge>
        <Badge>Carbs: 250g</Badge>
        <Badge>Fat: 50g</Badge>
      </Stack>

      <HStack>
        <Input
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
      </HStack>

      {/* Display search results */}
      {results.length > 0 && (
        <VStack>
          {results.map((food) => (
            <Text key={food.barcode} onClick={() => handleFoodSelect(food)}>
              {food.name}
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

      <Center position="fixed" bottom="8" width="100%">
        <IconButton
          bg="#98FB98"
          aria-label="Scan a barcode"
          icon={<Box as="img" src={barcodeIcon} boxSize="20" p="3" />}
          size="xl"
          isRound
          onClick={handleScanBarcode}
        />
      </Center>
    </VStack>
  );
}

export default DailyDiary;
