import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function GramInput({ min, max, value, onChange, onBlur }) {
  return (
    <ChakraNumberInput
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      <NumberInputField bg="#fff" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  );
}

export default GramInput;
