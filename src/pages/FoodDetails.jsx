import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { VStack, Button, Text } from "@chakra-ui/react";

import MainContainer from "../components/MainContainer";
import FoodImage from "../components/FoodDetails/Image";
import GramInput from "../components/FoodDetails/GramInput";
import AmountSlider from "../components/FoodDetails/AmountSlider";
import MealTypeSelect from "../components/FoodDetails/MealTypeSelect";
import NutritionInfo from "../components/FoodDetails/NutritionInfo";
import { useUpdateAndFetchDiary, useGetFood } from "../services/foodService.js";

function FoodDetails() {
  const { barcode } = useParams();
  const { currUserSt } = useContext(SessionContext);
  const location = useLocation();
  const getFood = useGetFood();
  const updateAndFetchDiary = useUpdateAndFetchDiary();
  const initialFood = {
    foodName: "",
    image: "",
    barcode: "",
    calories: 0,
    protein: 0,
    fiber: 0,
    carbs: 0,
    fat: 0,
  };
  const [selectedFood, setSelectedFood] = useState(
    location.state?.selectedFood || initialFood
  );
  const [amount, setAmount] = useState(selectedFood.amount || 100);
  const [inputAmount, setInputAmount] = useState(selectedFood.amount || 100);
  const [mealType, setMealType] = useState("breakfast");
  const [adjustedFood, setAdjustedFood] = useState({});

  console.log("FoodDetails: selectedFood=", selectedFood);

  const navigate = useNavigate();

  const min = 0;
  const max = 5000;

  useEffect(() => {
    if (!selectedFood.foodName) {
      // if no food is passed, fetch it from the server
      getFood(barcode)
        .then((foods) => {
          // Set the original nutritional values to selectedFood state
          setSelectedFood(foods[0]);
          // Initialize the adjusted food to match the original values
          setAdjustedFood(foods[0]);
        })
        .catch(console.error);
    }
  }, [barcode]);

  useEffect(() => {
    // Adjust the nutritional values whenever amount changes
    setAdjustedFood({
      calories: (selectedFood.calories * amount) / 100,
      protein: (selectedFood.protein * amount) / 100,
      fiber: (selectedFood.fiber * amount) / 100,
      carbs: (selectedFood.carbs * amount) / 100,
      fat: (selectedFood.fat * amount) / 100,
    });
  }, [amount, selectedFood]);

  const handleUnitsBlur = () => {
    const value = Number(inputAmount);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };
  const handleSave = async () => {
    try {
      console.log(
        "Saving food details: barcode=",
        barcode,
        ", amount=",
        amount,
        ", mealType=",
        mealType,
        ", userId=",
        currUserSt._id
      );
      const newDiary = await updateAndFetchDiary(
        barcode,
        amount,
        mealType,
        currUserSt._id
      );
      console.log("New diary data in FoodDetails:", newDiary);
      navigate("/daily-diary", { state: { newDiary } });
    } catch (error) {
      console.error("Error in FoodDetails handleSave:", error);
    }
  };

  return (
    <MainContainer>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {selectedFood.foodName}
        </Text>
        <FoodImage src={selectedFood.image} alt={selectedFood.foodName} />
        <NutritionInfo adjustedFood={adjustedFood} />
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
