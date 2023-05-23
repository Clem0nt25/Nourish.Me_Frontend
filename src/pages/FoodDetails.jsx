import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { VStack, Button, Text } from "@chakra-ui/react";

import { updateFoodDetails } from "../services/foodService";
import MainContainer from "../components/MainContainer";
import FoodImage from "../components/FoodDetails/Image";
import GramInput from "../components/FoodDetails/GramInput";
import AmountSlider from "../components/FoodDetails/AmountSlider";
import MealTypeSelect from "../components/FoodDetails/MealTypeSelect";

function FoodDetails() {
  const { barcode } = useParams();
  const { currUserSt } = useContext(SessionContext);
  const [amount, setAmount] = useState(1);
  const [inputAmount, setInputAmount] = useState(0);
  const [mealType, setMealType] = useState("breakfast");
  const location = useLocation();
  const selectedFood = location.state.selectedFood;
  const navigate = useNavigate();

  const min = 0;
  const max = 5000;

  const handleUnitsBlur = () => {
    const value = Number(inputAmount);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleSave = async () => {
    try {
      await updateFoodDetails(barcode, amount, mealType, currUserSt._id);
      navigate("/daily-diary");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainContainer>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {selectedFood.foodName}
        </Text>
        <FoodImage src={selectedFood.image} alt={selectedFood.foodName} />
        <GramInput
          min={min}
          max={max}
          value={inputAmount}
          onChange={(valueString) => setInputAmount(valueString)}
          onBlur={handleUnitsBlur}
        />
        <AmountSlider
          amount={amount}
          setAmount={setAmount}
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
          min={min}
          max={max}
        />
        <MealTypeSelect mealType={mealType} setMealType={setMealType} />
        <Button onClick={handleSave} variant="button-primary">
          Add To Diary
        </Button>
      </VStack>
    </MainContainer>
  );
}

export default FoodDetails;
