import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import {
  VStack,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Box,
  Text,
} from "@chakra-ui/react";

import { updateFoodDetails } from "../services/foodService";
import MainContainer from "../components/MainContainer";

function FoodDetails() {
  const { barcode } = useParams();
  const { currUserSt } = useContext(SessionContext);
  const [amount, setAmount] = useState(1);
  const [inputAmount, setInputAmount] = useState(1);
  const [mealType, setMealType] = useState("Breakfast");
  const location = useLocation();
  const selectedFood = location.state.selectedFood;

  console.log(currUserSt);

  const handleSave = async () => {
    await updateFoodDetails(barcode, amount, mealType, currUserSt._id);
  };

  const min = 0;
  const max = 5000;

  const handleUnitsBlur = () => {
    const value = Number(inputAmount);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <MainContainer>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {selectedFood.foodName}
        </Text>
        <img src={selectedFood.image} alt={selectedFood.foodName} />
        <NumberInput
          min={min}
          max={max}
          value={inputAmount}
          onChange={(valueString) => setInputAmount(valueString)}
          onBlur={handleUnitsBlur}
        >
          <NumberInputField bg="#fff" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          min={0}
          max={800}
          step={10}
          value={amount}
          onChange={(value) => {
            setAmount(value);
            setInputAmount(String(value));
          }}
        >
          <SliderTrack>
            <SliderFilledTrack bg="#98FB98" />
          </SliderTrack>
          <SliderThumb boxSize={10}>
            {amount && (
              <Box color="gray.500" fontWeight="bold">
                {amount}g
              </Box>
            )}
          </SliderThumb>
        </Slider>
        <Select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          bg="#fff"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </Select>
        <Button onClick={handleSave} variant="button-primary">
          Add To Diary
        </Button>
      </VStack>
    </MainContainer>
  );
}

export default FoodDetails;
