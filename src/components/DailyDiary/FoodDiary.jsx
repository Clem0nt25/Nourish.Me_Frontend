import { Box, Text, VStack } from "@chakra-ui/react";

export const FoodDiary = ({ diary }) => {
  return ["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
    <Box
      key={mealType}
      textAlign="center"
      bg="white"
      py={2}
      border="1px solid lightgrey"
      borderRadius="md"
      boxShadow="md"
    >
      <Text fontWeight="bold" fontSize="lg">
        {mealType}
      </Text>
      <VStack align="start">
        {diary[mealType].map((food) => (
          <Text key={food.barcode}>{food.foodName}</Text>
        ))}
      </VStack>
    </Box>
  ));
};
