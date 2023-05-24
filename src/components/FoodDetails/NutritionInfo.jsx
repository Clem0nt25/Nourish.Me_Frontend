import { Box, Text } from "@chakra-ui/react";

function NutritionInfo({ food }) {
  return (
    <Box w="100%" p={4} color="white" bg="white" rounded="md">
      <Text fontWeight="bold">Nutritional Information:</Text>
      <Text>Calories: {food.calories.toFixed(2)}</Text>
      <Text>Protein: {food.protein.toFixed(2)} g</Text>
      <Text>Fiber: {food.fiber.toFixed(2)} g</Text>
      <Text>Carbs: {food.carbs.toFixed(2)} g</Text>
      <Text>Fat: {food.fat.toFixed(2)} g</Text>
    </Box>
  );
}

export default NutritionInfo;
