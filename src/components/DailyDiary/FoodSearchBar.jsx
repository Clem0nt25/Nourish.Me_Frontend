import { Input, HStack } from "@chakra-ui/react";

export const FoodSearchBar = ({ foodName, handleInputChange }) => {
  return (
    <HStack>
      <Input
        placeholder="Enter food name"
        fontWeight={500}
        value={foodName}
        onChange={handleInputChange}
        border="2px solid lightgray"
      />
    </HStack>
  );
};
