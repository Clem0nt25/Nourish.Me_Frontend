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
        "button-icon": { backgroundColor: "#98FB98" },
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
            _focus: {
              bg: "white",
              borderColor: "#98FB98",
            },
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
        bg: "#FFFCF6",
      },
      p: { color: "#292F36" },
    },
  },
});

export default theme;
