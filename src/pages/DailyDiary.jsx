import { useState, useEffect, useRef } from "react";
import {
  VStack,
  Box,
  Text,
  HStack,
  Input,
  IconButton,
  Center,
  Stack,
  Badge,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import MainContainer from "../components/MainContainer";
import barcodeIcon from "../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DailyDiary() {
  const [foodName, setFoodName] = useState("");
  const [results, setResults] = useState([]);
  const [diary, setDiary] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(axios.CancelToken.source());

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Delay function to limit API calls
  const delay = (func, delay) => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(func, delay);
  };

  const searchFoods = async () => {
    try {
      setIsLoading(true);

      if (!foodName.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      if (source) {
        source.cancel("Operation canceled due to new request.");
      }

      const newSource = axios.CancelToken.source();
      setSource(newSource);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/getFood`,
        { foodName },
        { cancelToken: newSource.token }
      );

      setResults(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFoodName(e.target.value);
    delay(searchFoods, 200);
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

  useEffect(() => {
    return () => {
      clearTimeout(searchRef.current);
    };
  }, []);

  const handleScanBarcode = () => {
    // TODO: Implement barcode scanning
    console.log("Barcode scanning not implemented yet");
  };

  const handleFoodSelect = (food) => {
    navigate(`/food-details/${food.barcode}`, { state: { food } });
  };

  const stackDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <MainContainer>
      <VStack align="stretch" spacing={4}>
        {/* Display daily macros */}
        <Box>
          <Stack direction={stackDirection} justify="space-between" spacing={4}>
            <Badge>Calories: 2000/2000 kcal</Badge>
            <Badge>Protein: 50g</Badge>
            <Badge>Carbs: 250g</Badge>
            <Badge>Fat: 50g</Badge>
          </Stack>
        </Box>

        {/* Search bar */}
        <HStack>
          <Input
            placeholder="Enter food name"
            value={foodName}
            onChange={handleInputChange}
          />
        </HStack>

        {/* Display loading state  TOD0 - add a spinner*/}
        {isLoading && <Text>Loading...</Text>}

        {/* Display search results */}
        {results.length > 0 && (
          <VStack align="start">
            {results.map((food) => (
              <Box key={food.barcode} onClick={() => handleFoodSelect(food)}>
                <Text>{food.foodName}</Text>
                <Image boxSize="100px" src={food.image} alt={food.foodName} />
              </Box>
            ))}
          </VStack>
        )}

        {/* Display diary entries */}
        {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
          <Box key={mealType}>
            <Text fontWeight="bold">{mealType}</Text>
            <VStack align="start">
              {diary[mealType].map((food) => (
                <Text key={food.barcode}>{food.foodName}</Text>
              ))}
            </VStack>
          </Box>
        ))}

        <Center>
          <IconButton
            variant="button-icon"
            aria-label="Scan a barcode"
            icon={<Box as="img" src={barcodeIcon} boxSize="20" p="3" />}
            boxSize="80px"
            isRound
            onClick={handleScanBarcode}
          />
        </Center>
      </VStack>
    </MainContainer>
  );
}

export default DailyDiary;
