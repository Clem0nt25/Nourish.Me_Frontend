import { createContext, useState } from "react";

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodAmounts, setFoodAmounts] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);

  return (
    <FoodContext.Provider
      value={{
        selectedFoods,
        setSelectedFoods,
        foodAmounts,
        setFoodAmounts,
        selectedMealTypes,
        setSelectedMealTypes,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
