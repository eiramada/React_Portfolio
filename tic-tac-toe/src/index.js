import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GameHistoryContextProvider } from "./store/GameHistoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameHistoryContextProvider>
        <App />
      </GameHistoryContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
