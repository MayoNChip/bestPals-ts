import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./themes/theme";
import { AuthProvider } from "./context/AuthContext";
import { PetProvider } from "./context/PetContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PetProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          ,
        </ChakraProvider>
      </PetProvider>
    </AuthProvider>
  </React.StrictMode>
);
