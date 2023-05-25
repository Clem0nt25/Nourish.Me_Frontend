import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";

// Get food from API for search results
export const useGetFood = () => {
  const { tokenSt } = useContext(SessionContext);

  const getFood = async (foodName) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
        { foodName: `${foodName} ` },
        {
          headers: {
            Authorization: `Bearer ${tokenSt}`,
          },
        }
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

  return getFood;
};

// Get food info from Barcode
export async function useGetFoodInfoByBarcode(barcode) {
  const response = await fetch("/api/getFoodInfoByBarcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ barcode }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch food.");
  }

  return data;
}
// Update food details in server
export const useUpdateFoodDetails = () => {
  const { tokenSt } = useContext(SessionContext);
  const currentDate = new Date().toISOString().slice(0, 10);

  const updateFoodDetails = async (barcode, amount, mealType, userId) => {
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
      foodDetails,
      {
        headers: {
          Authorization: `Bearer ${tokenSt}`,
        },
      }
    );

    console.log("Response from server:", response.data);
  };

  return updateFoodDetails;
};

// Fetch Diary from server
export const useFetchDiary = () => {
  const { tokenSt } = useContext(SessionContext);
  const currentDate = new Date().toISOString().slice(0, 10);

  const fetchDiary = async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/getUserDiary`,
      {
        params: { userId, date: currentDate },
        headers: {
          Authorization: `Bearer ${tokenSt}`,
        },
      }
    );

    return response.data;
  };
  return fetchDiary;
};

export const useUpdateAndFetchDiary = () => {
  const updateFoodDetails = useUpdateFoodDetails();
  const fetchDiary = useFetchDiary();

  const updateAndFetchDiary = async (barcode, amount, mealType, userId) => {
    await updateFoodDetails(barcode, amount, mealType, userId);
    const diary = await fetchDiary(userId);
    return diary;
  };

  return updateAndFetchDiary;
};

// Fetch latest history user specs from server
export const useFetchUserSpecs = () => {
  const { tokenSt } = useContext(SessionContext);

  const fetchUserSpecs = async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/userSpecsHistory/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenSt}`,
        },
      }
    );
    return response.data;
  };

  return fetchUserSpecs;
};

// Fetch the current user specs from server. If not found, means this is a new user, and navigate to ques
export const useFetchUserSpecsCurr = () => {
  const { tokenSt } = useContext(SessionContext);

  const fetchUserSpecsCurr = async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/api/checkUserSpecs/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenSt}`,
        },
      }
    );
    return response;
  };
  return fetchUserSpecsCurr;
};

// delete food from diary
export const useDeleteFood = () => {
  const { tokenSt } = useContext(SessionContext);
  const deleteFood = async (userId, barcode, mealId, currentDate) => {
    const foodDetails = {
      userId,
      barcode,
      mealId,
      currentDate,
    };
    console.log("Sending food details to server:", foodDetails);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/api/deleteFood`,
      foodDetails,
      {
        headers: {
          Authorization: `Bearer ${tokenSt}`,
        },
      }
    );
    console.log("Response from server:", response.data);
  };
  return deleteFood;
};
