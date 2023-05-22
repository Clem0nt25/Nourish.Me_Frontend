import { Spinner } from "@chakra-ui/react";

export const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#98FB98"
      size="xl"
    />
  ) : null;
};
