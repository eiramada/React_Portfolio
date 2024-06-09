import React, { createContext, useEffect, useState } from "react";

const GameHistoryContext = createContext();

const GameHistoryContextProvider = ({ children, initialHistory = [] }) => {
  const [history, setHistory] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("gameData"));
    return savedData?.history || initialHistory;
  });

  const storeGame = (newGame) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newGame];
      const savedData = JSON.parse(localStorage.getItem("gameData")) || {};
      localStorage.setItem(
        "gameData",
        JSON.stringify({ ...savedData, history: updatedHistory })
      );
      return updatedHistory;
    });
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("gameData")) || {};
    localStorage.setItem("gameData", JSON.stringify({ ...savedData, history }));
  }, [history]);

  return (
    <GameHistoryContext.Provider value={{ history, storeGame }}>
      {children}
    </GameHistoryContext.Provider>
  );
};

export { GameHistoryContext, GameHistoryContextProvider };

