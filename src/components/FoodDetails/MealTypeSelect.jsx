import { Select } from "@chakra-ui/react";

function MealTypeSelect({ mealType, setMealType }) {
  return (
    <Select
      value={mealType}
      onChange={(e) => setMealType(e.target.value)}
      bg="#fff"
    >
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="snack">Snacks</option>
    </Select>
  );
}

export default MealTypeSelect;
