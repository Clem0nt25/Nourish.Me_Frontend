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

  const [amount, setAmount] = useState(100);
  const [mealType, setMealType] = useState("breakfast");
  const [foodData, setFoodData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFood() {
      try {
        const foods = await getFood(barcode);
        setFoodData({
          original: foods[0],
          adjusted: adjustFoodValues(foods[0], amount),
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (location.state?.selectedFood) {
      setFoodData({
        original: location.state.selectedFood,
        adjusted: adjustFoodValues(location.state.selectedFood, amount),
      });
    } else {
      fetchFood();
    }
  }, [barcode, location.state?.selectedFood, amount]);

  function adjustFoodValues(food, amount) {
    return {
      calories: (food.calories * amount) / 100,
      protein: (food.protein * amount) / 100,
      fiber: (food.fiber * amount) / 100,
      carbs: (food.carbs * amount) / 100,
      fat: (food.fat * amount) / 100,
    };
  }

  const handleSave = async () => {
    try {
      const newDiary = await updateAndFetchDiary(
        barcode,
        amount,
        mealType,
        currUserSt._id
      );
      navigate("/daily-diary", { state: { newDiary } });
    } catch (error) {
      console.error("Error in FoodDetails handleSave:", error);
    }
  };

  if (!foodData) return null; // or a loading indicator

  return (
    <MainContainer>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {foodData.original.foodName &&
          typeof foodData.original.foodName === "string"
            ? foodData.original.foodName.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              )
            : ""}
        </Text>
        <FoodImage
          src={foodData.original.image}
          alt={foodData.original.foodName}
        />
        <NutritionInfo adjustedFood={foodData.adjusted} />
        <GramInput
          min={0}
          max={5000}
          value={amount}
          onChange={(valueString) => setAmount(Number(valueString))}
        />
        <AmountSlider
          amount={amount}
          setAmount={setAmount}
          inputAmount={amount}
          setInputAmount={setAmount}
          min={0}
          max={300}
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
