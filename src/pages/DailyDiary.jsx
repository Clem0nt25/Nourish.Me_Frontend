import { useState } from "react";
import {
  Button,
  VStack,
  HStack,
  Select,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

function DailyDiary() {
  const [mealType, setMealType] = useState("Breakfast"); // Default value is "Breakfast"
  const [foodName, setFoodName] = useState("");

  const handleScanBarcode = () => {
    // TODO: Implement barcode scanning
    console.log("Barcode scanning not implemented yet");
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
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
          onChange={handleFoodNameChange}
        />
        <IconButton aria-label="Search food" icon={<SearchIcon />} />
      </HStack>

      <Button leftIcon={<AddIcon />} onClick={handleScanBarcode}>
        Scan Barcode
      </Button>
    </VStack>
  );
}

export default DailyDiary;
