import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        backgroundColor: "#98FB98",
        color: "#292F36",
      },
      variants: {
        "button-primary": { backgroundColor: "#98FB98" },
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
    Select: {
      variants: {
        filled: {
          field: {
            borderColor: "lightgrey",
            borderWidth: 2,
            borderRadius: "md",
            bg: "white",
            _focus: {
              borderColor: "#98FB98",
              bg: "white",
            },
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
    NumberInput: {
      parts: ["field"],
      variants: {
        filled: {
          field: {
            borderColor: "lightgrey",
            borderWidth: 2,
            borderRadius: "md",
            bg: "white",
            _focus: {
              borderColor: "#98FB98",
              bg: "white",
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
