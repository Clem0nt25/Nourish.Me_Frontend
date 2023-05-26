import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { useRef, useEffect } from "react";

function GramInput({ min, max, value, onChange, onBlur }) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <ChakraNumberInput
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      <NumberInputField bg="#fff" ref={inputRef} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  );
}

export default GramInput;
