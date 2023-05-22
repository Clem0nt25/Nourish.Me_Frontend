import axios from "axios";

// Get food from API for search results
export const getFood = async (foodName, cancelToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
      { foodName },
      { cancelToken }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    } else {
      throw error;
    }
  }
};
