import { Box, Text, VStack } from "@chakra-ui/react";

export const FoodDiary = ({ diary }) => {
  return ["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
    <Box key={mealType}>
      <Text fontWeight="bold">{mealType}</Text>
      <VStack align="start">
        {diary[mealType].map((food) => (
          <Text key={food.barcode}>{food.foodName}</Text>
        ))}
      </VStack>
    </Box>
  ));
};
