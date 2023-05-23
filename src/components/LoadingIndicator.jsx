import { Spinner, Center } from "@chakra-ui/react";

export const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#98FB98"
        size="xl"
      />
    </Center>
  ) : null;
};
