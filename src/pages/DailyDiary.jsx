import { useState, useEffect, useRef } from "react";
import { Button, VStack, HStack, Select, Input, Text } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DailyDiary() {
  const [mealType, setMealType] = useState("Breakfast"); // Default value is "Breakfast"
  const [foodName, setFoodName] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(func, delay);
  };

  // Search foods from the API based on user input
  useEffect(() => {
    if (foodName) {
      debounce(searchFoods, 300);
    } else {
      setResults([]);
    }
  }, [foodName]);

  const searchFoods = async () => {
    try {
      const response = await axios.post("/getFood", {
        mealType,
        foodName,
      });
      setResults(response.data.data); // Assuming the API returns an array of food objects
    } catch (error) {
      console.log(error);
      // Handle the error appropriately in your app
    }
  };

  const handleScanBarcode = () => {
    // TODO: Implement barcode scanning
    console.log("Barcode scanning not implemented yet");
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleFoodSelect = (barcode) => {
    navigate(`/food-details/${barcode}`);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Select
        placeholder="Meal type"
        value={mealType}
        onChange={handleMealTypeChange}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </Select>

      <HStack>
        <Input
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        {/* Display search results */}
        {results.length > 0 && (
          <VStack>
            {results.map((food) => (
              <Text
                key={food.barcode}
                onClick={() => handleFoodSelect(food.barcode)}
              >
                {food.name}
              </Text>
            ))}
          </VStack>
        )}
      </HStack>

      <Button leftIcon={<AddIcon />} onClick={handleScanBarcode}>
        Scan Barcode
      </Button>
    </VStack>
  );
}

export default DailyDiary;
