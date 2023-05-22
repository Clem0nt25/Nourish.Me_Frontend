import { VStack, Box, Text } from "@chakra-ui/react";

export const FoodSearchResults = ({ results, handleFoodSelect }) => {
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    results.length > 0 && (
      <VStack
        align="center"
        bg="white"
        spacing={0}
        border="1px solid lightgray"
      >
        {results.map((food, index) => (
          <Box
            key={food.barcode}
            onClick={() => handleFoodSelect(food)}
            w="100%"
            textAlign="center"
            p={2}
            cursor="pointer"
            bg={index % 2 === 0 ? "#f8f8f8" : "white"}
            _hover={{ bg: "lightgray" }} // Hover effect
          >
            <Text fontWeight="bold">{capitalizeWords(food.foodName)}</Text>
          </Box>
        ))}
      </VStack>
    )
  );
};
