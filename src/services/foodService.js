import axios from "axios";

// Get food from API for search results
export const getFood = async (foodName, cancelToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
      { foodName: `${foodName} ` },
      { cancelToken }
    );

    const foods = response.data.data.map((food) => ({
      foodName: food.foodName,
      image: food.image,
      barcode: food.barcode,
      calories: food.calories,
      protein: food.protein,
      fiber: food.fiber,
      carbs: food.carbs,
      fat: food.fat,
    }));

    return foods;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    } else {
      throw error;
    }
  }
};

// Update food details in server
export const updateFoodDetails = async (barcode, amount, mealType, userId) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const foodDetails = {
    barcode,
    currentDate,
    amount,
    mealType,
    userId,
  };

  console.log("Sending food details to server:", foodDetails);

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_API_URL}/api/getFoodByBarcode`,
    foodDetails
  );

  // Log the response from the backend
  console.log("Response from server:", response.data);

  // console.log("Full response:", response);
};

// Fetch Diary from server
export const fetchDiary = async (userId) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const response = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/api/getUserDiary`,
    { params: { userId, date: currentDate } }
  );

  return response.data;
};

export async function updateAndFetchDiary(barcode, amount, mealType, userId) {
  await updateFoodDetails(barcode, amount, mealType, userId);
  const diary = await fetchDiary(userId);
  return diary;
}

// Fetch current user specs from server
export const fetchUserSpecs = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/userSpecsHistory/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user specs:", error);
    throw error;
  }
};
