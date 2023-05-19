import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        padding: "2rem",
      },
    }),
  },
});

export default theme;
