import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AstroChatProvider } from "./context/AstroChatContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AstroChatProvider>
        <App />
      </AstroChatProvider>
    </AuthProvider>
  </BrowserRouter>
);
