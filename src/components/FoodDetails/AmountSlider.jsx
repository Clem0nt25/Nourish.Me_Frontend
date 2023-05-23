import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";

function AmountSlider({
  amount,
  setAmount,
  inputAmount,
  setInputAmount,
  min,
  max,
}) {
  return (
    <Slider
      min={min}
      max={max}
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
  );
}

export default AmountSlider;
