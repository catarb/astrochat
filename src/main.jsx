import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AstroChatProvider } from "./context/AstroChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AstroChatProvider>
      <App />
    </AstroChatProvider>
  </BrowserRouter>
);