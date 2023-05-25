import { Box, Text } from "@chakra-ui/react";

function NutritionInfo({ adjustedFood }) {
  console.log(adjustedFood);
  return (
    <Box w="100%" p={4} color="white" bg="white" rounded="md">
      <Text fontWeight="bold">Nutritional Information:</Text>
      <Text>
        Calories:{" "}
        {adjustedFood.calories ? adjustedFood.calories.toFixed(2) : "N/A"}
      </Text>
      <Text>
        Protein:{" "}
        {adjustedFood.protein ? adjustedFood.protein.toFixed(2) : "N/A"} g
      </Text>
      <Text>
        Fiber: {adjustedFood.fiber ? adjustedFood.fiber.toFixed(2) : "N/A"} g
      </Text>
      <Text>
        Carbs: {adjustedFood.carbs ? adjustedFood.carbs.toFixed(2) : "N/A"} g
      </Text>
      <Text>
        Fat: {adjustedFood.fat ? adjustedFood.fat.toFixed(2) : "N/A"} g
      </Text>
    </Box>
  );
}

export default NutritionInfo;
