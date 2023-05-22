import { Box } from "@chakra-ui/react";

function MainContainer({ children }) {
  return (
    <Box
      width={["100%", "100%", "80%", "60%"]}
      maxWidth="1200px"
      padding="2rem"
      margin="auto"
    >
      {children}
    </Box>
  );
}

export default MainContainer;
