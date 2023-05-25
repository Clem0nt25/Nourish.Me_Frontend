import {
  CircularProgress,
  CircularProgressLabel,
  VStack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

import { If, Else, Then } from "react-if";

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

  const CircularProgressBar = ({ color, current, goal }) => (
    <CircularProgress
      value={getValue(current, goal).toFixed(1)}
      color={color}
      size={70}
    >
      <CircularProgressLabel
        color={getColor(current, goal)}
        fontSize={21}
        fontWeight={700}
      >
        {getValue(current, goal).toFixed(0)}%
      </CircularProgressLabel>
    </CircularProgress>
  );

  const ProgressBar = ({ color, title, current, goal, units }) => (
    <VStack
      w={{ base: "100%", sm: "45%", xl: "22%" }}
      m={{ base: "2", sm: "2", xl: "2" }}
    >
      <Text fontWeight="bold" color={color}>
        {title}
      </Text>
      <CircularProgressBar color={color} current={current} goal={goal} />
      <Text fontWeight="bold" color={color}>
        {current} / {goal}
        {units}
      </Text>
    </VStack>
  );

  const MobileProgressBar = ({ color, title, current, goal, units }) => (
    <Flex
      w="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb="2"
    >
      <CircularProgressBar color={color} current={current} goal={goal} />
      <VStack w="65%">
        <Text fontWeight="bold" color={color}>
          {title}
        </Text>
        <Text fontWeight="bold" color={color}>
          {current} / {goal}
          {units}
        </Text>
      </VStack>
    </Flex>
  );

  const isMobileLayout = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      flexWrap={{ base: "nowrap", sm: "wrap" }}
      justify="center"
      bg="white"
      borderRadius={8}
      border="1px solid lightgrey"
      padding={4}
    >
      <If condition={isMobileLayout}>
        <Then>
          <MobileProgressBar
            color="green.400"
            title="Calories"
            current={currentCalories}
            goal={goalCalories}
            units="kcal"
          />
          <MobileProgressBar
            color="blue.400"
            title="Protein"
            current={currentProtein}
            goal={goalProtein}
            units="g"
          />
          <MobileProgressBar
            color="orange.400"
            title="Carbs"
            current={currentCarbs}
            goal={goalCarbs}
            units="g"
          />
          <MobileProgressBar
            color="red.400"
            title="Fat"
            current={currentFat}
            goal={goalFat}
            units="g"
          />
        </Then>
        <Else>
          <ProgressBar
            color="green.400"
            title="Calories"
            current={currentCalories}
            goal={goalCalories}
            units="kcal"
          />
          <ProgressBar
            color="blue.400"
            title="Protein"
            current={currentProtein}
            goal={goalProtein}
            units="g"
          />
          <ProgressBar
            color="orange.400"
            title="Carbs"
            current={currentCarbs}
            goal={goalCarbs}
            units="g"
          />
          <ProgressBar
            color="red.400"
            title="Fat"
            current={currentFat}
            goal={goalFat}
            units="g"
          />
        </Else>
      </If>
    </Flex>
  );
};
