import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <SessionContextProvider>
          <App />
        </SessionContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
