import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { FoodProvider } from "./contexts/FoodContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SessionContextProvider>
          <FoodProvider>
            <App />
          </FoodProvider>
        </SessionContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
