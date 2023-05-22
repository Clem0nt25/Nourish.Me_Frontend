import { VStack, Box, Text, Image } from "@chakra-ui/react";

export const FoodSearchResults = ({ results, handleFoodSelect }) => {
  return (
    results.length > 0 && (
      <VStack align="start">
        {results.map((food) => (
          <Box key={food.barcode} onClick={() => handleFoodSelect(food)}>
            <Text>{food.foodName}</Text>
            <Image boxSize="100px" src={food.image} alt={food.foodName} />
          </Box>
        ))}
      </VStack>
    )
  );
};
