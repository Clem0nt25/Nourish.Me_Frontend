import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Select,
  Input,
  IconButton,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

function DailyDiary() {
  const [mealType, setMealType] = useState("Breakfast");
  const [foodName, setFoodName] = useState("");
  const [frequentFoods, setFrequentFoods] = useState([]);

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

  const handleFrequentFoodChange = (event) => {
    const selectedFood = event.target.value;
    const index = frequentFoods.indexOf(selectedFood);

    if (index > -1) {
      // If the food is already in the list, remove it
      setFrequentFoods(frequentFoods.filter((food) => food !== selectedFood));
    } else {
      // Otherwise, add the food to the list
      setFrequentFoods([...frequentFoods, selectedFood]);
    }
  };

  const removeFrequentFood = (removedFood) => {
    setFrequentFoods(frequentFoods.filter((food) => food !== removedFood));
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

      <HStack wrap="wrap" spacing={2}>
        {frequentFoods.map((food) => (
          <Tag
            size="lg"
            key={food}
            borderRadius="full"
            variant="solid"
            colorScheme="teal"
          >
            <TagLabel>{food}</TagLabel>
            <TagCloseButton onClick={() => removeFrequentFood(food)} />
          </Tag>
        ))}
      </HStack>

      <Box as="form" onSubmit={handleFrequentFoodChange}>
        <HStack>
          <Input placeholder="Enter frequent food name" />
          <Button type="submit">Add to frequent foods</Button>
        </HStack>
      </Box>
    </VStack>
  );
}

export default DailyDiary;
