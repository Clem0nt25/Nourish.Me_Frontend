import { Input, HStack } from "@chakra-ui/react";

export const FoodSearchBar = ({ foodName, handleInputChange }) => {
  return (
    <HStack>
      <Input
        placeholder="Enter food name"
        value={foodName}
        onChange={handleInputChange}
      />
    </HStack>
  );
};
