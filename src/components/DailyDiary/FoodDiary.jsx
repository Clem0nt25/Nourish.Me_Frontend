import { Box, Text, VStack } from "@chakra-ui/react";

export const FoodDiary = ({ diary }) => {
  return (
    <>
      {[
        { displayName: "Breakfast", logicName: "breakfast" },
        { displayName: "Lunch", logicName: "lunch" },
        { displayName: "Dinner", logicName: "dinner" },
        { displayName: "Snacks", logicName: "snack" },
      ].map((mealTypeObj) => (
        <Box
          key={mealTypeObj.logicName}
          textAlign="center"
          bg="white"
          py={2}
          border="1px solid lightgrey"
          borderRadius="md"
          boxShadow="md"
          mb={4}
        >
          <Text fontWeight="bold" fontSize="lg">
            {mealTypeObj.displayName}
          </Text>
          <VStack align="start" mt={2}>
            {/* {diary[mealTypeObj.logicName].map((food) => (
              <Text key={food.id} textAlign="center" fontWeight="500">
                {food.foodName} {food.amount}g
              </Text>
            ))} */}
          </VStack>
        </Box>
      ))}
    </>
  );
};
