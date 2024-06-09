import React, { createContext, useEffect, useState } from "react";

const GameHistoryContext = createContext();

const GameHistoryContextProvider = ({ children, initialHistory = [] }) => {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : initialHistory;
  });

  const storeGame = (newGame) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newGame];
      localStorage.setItem("history", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <GameHistoryContext.Provider value={{ history, storeGame }}>
      {children}
    </GameHistoryContext.Provider>
  );
};

export { GameHistoryContext, GameHistoryContextProvider };
