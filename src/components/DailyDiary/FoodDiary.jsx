import { useState, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Collapse,
  Spacer,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import foodLogo from "../../assets/food-logo.png";
import { SessionContext } from "../../contexts/SessionContext";

export const FoodDiary = ({ diary, onDeleteFood }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({});
  const { currUserSt } = useContext(SessionContext);
  const userId = currUserSt._id;

  const handleToggle = (mealType) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [mealType]: !prevState[mealType],
    }));
  };

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
          p={3}
          border="1px solid lightgrey"
          borderRadius="md"
          boxShadow="md"
          mb={4}
          cursor="pointer"
        >
          <Flex align="center">
            <Text fontWeight="bold" fontSize="lg">
              {mealTypeObj.displayName}
            </Text>
            <Spacer />
            <IconButton
              icon={
                isOpen[mealTypeObj.logicName] ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronDownIcon transform="rotate(-180deg)" />
                )
              }
              variant="ghost"
              onClick={() => handleToggle(mealTypeObj.logicName)}
            />
          </Flex>

          <Collapse in={isOpen[mealTypeObj.logicName]}>
            <VStack align="stretch" mt={2}>
              {diary[mealTypeObj.logicName] &&
                diary[mealTypeObj.logicName].foods &&
                diary[mealTypeObj.logicName].foods.map((food) => (
                  <Box
                    key={food._id}
                    p={2}
                    border="1px solid lightgrey"
                    borderRadius="md"
                    boxShadow="md"
                    mt={2}
                    bg="white"
                    onClick={() => {
                      navigate(`/food-details/${food.barcode}`, {
                        state: { selectedFood: food },
                      });
                      console.log("Clicked food in diary", food);
                    }}
                  >
                    <Flex align="center">
                      <Image src={foodLogo} alt="Food Logo" boxSize={6} />
                      <Text ml={2} fontWeight="500">
                        {food.foodName}
                      </Text>
                      <Spacer />
                      <IconButton
                        icon={<DeleteIcon />}
                        variant="ghost"
                        bg={"red.400"}
                        _hover={{ bg: "red.500", color: "white" }}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent navigate when the delete button is clicked
                          onDeleteFood(
                            userId,
                            food.barcode,
                            food.mealId,
                            food.date
                          );
                        }}
                      />
                    </Flex>
                  </Box>
                ))}
            </VStack>
          </Collapse>
        </Box>
      ))}
    </>
  );
};
