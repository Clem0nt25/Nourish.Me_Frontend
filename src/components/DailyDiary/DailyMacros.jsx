import {
  CircularProgress,
  CircularProgressLabel,
  VStack,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

export const DailyMacros = ({ userSpecsSt }) => {
  // Ensure values are not undefined
  const currentCalories = userSpecsSt?.data?.currentCalories || 0;
  const goalCalories = userSpecsSt?.data?.goalCalories || 0;

  const currentProtein = userSpecsSt?.data?.currentProtein || 0;
  const goalProtein = userSpecsSt?.data?.goalProtein || 0;

  const currentCarbs = userSpecsSt?.data?.currentCarbs || 0;
  const goalCarbs = userSpecsSt?.data?.goalCarbs || 0;

  const currentFat = userSpecsSt?.data?.currentFat || 0;
  const goalFat = userSpecsSt?.data?.goalFat || 0;

  const getValue = (current, goal) => {
    return goal !== 0 ? (current / goal) * 100 : 0;
  };

  const getColor = (current, goal) => {
    return current > goal ? "red" : "#6ab06a";
  };

  return (
    <Flex justify="space-around" wrap="wrap">
      <VStack>
        <Text fontWeight="bold" color="green.400">
          Calories
        </Text>
        <CircularProgress
          value={getValue(currentCalories, goalCalories).toFixed(1)}
          color="green.400"
          size={100}
        >
          <CircularProgressLabel
            color={getColor(currentCalories, goalCalories)}
            fontSize={23}
            fontWeight={700}
          >
            {getValue(currentCalories, goalCalories).toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold" color="green.400">
          {currentCalories} / {goalCalories}kcal
        </Text>
      </VStack>
      <VStack>
        <Text fontWeight="bold" color="blue.400">
          Protein
        </Text>
        <CircularProgress
          value={getValue(currentProtein, goalProtein).toFixed(1)}
          color="blue.400"
          size={100}
        >
          <CircularProgressLabel
            color={getColor(currentProtein, goalProtein)}
            fontSize={23}
            fontWeight={700}
          >
            {getValue(currentProtein, goalProtein).toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold" color="blue.400">
          {currentProtein} / {goalProtein}g
        </Text>
      </VStack>
      <VStack>
        <Text fontWeight="bold" color="orange.400">
          Carbs
        </Text>
        <CircularProgress
          value={getValue(currentCarbs, goalCarbs).toFixed(1)}
          color="orange.400"
          size={100}
        >
          <CircularProgressLabel
            color={getColor(currentCarbs, goalCarbs)}
            fontSize={23}
            fontWeight={700}
          >
            {getValue(currentCarbs, goalCarbs).toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold" color="orange.400">
          {currentCarbs} / {goalCarbs}g
        </Text>
      </VStack>
      <VStack>
        <Text fontWeight="bold" color="red.400">
          Fat
        </Text>
        <CircularProgress
          value={getValue(currentFat, goalFat).toFixed(1)}
          color="red.400"
          size={100}
          fontWeight={700}
        >
          <CircularProgressLabel
            color={getColor(currentFat, goalFat)}
            fontSize={23}
          >
            {getValue(currentFat, goalFat).toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold" color="red.400">
          {currentFat} / {goalFat}g
        </Text>
      </VStack>
    </Flex>
  );
};
