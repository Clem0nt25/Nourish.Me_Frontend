// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        backgroundColor: "#98FB98",
        color: "#292F36",
      },
      variants: {
        "button-icon": { backgroundColor: "#98FB98", color: "#292F36" },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "white",
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "#f8f8f8",
      },
    },
  },
});

export default theme;
