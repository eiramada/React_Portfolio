import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Gameboard.css";
import { GameHistoryContext } from "../context/GameHistoryContext";

function Gameboard() {
  const { storeGame } = useContext(GameHistoryContext);

  const initialData = {
    players: { player1: "Player 1", player2: "Player 2" },
    turn: "Player 1",
    game: Array(9).fill(null),
    status: "Ongoing",
  };

  const [gameData, setGameData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("gameData"));
    return savedData || initialData;
  });

  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }, [gameData]);

  function renderSquares() {
    return gameData.game.map((value, index) => (
      <button
        key={index}
        className={`square ${
          value ? `filled ${value}` : winner ? `filled` : ""
        }`}
        onClick={() => selectSquare(index)}
        aria-label={value ? `Square filled with ${value}` : "Empty square"}
      >
        {value === "X" ? (
          <FontAwesomeIcon icon={faTimes} className="fa-icon" />
        ) : value === "O" ? (
          <div className="empty-circle"></div>
        ) : null}
      </button>
    ));
  }

  function selectSquare(index) {
    if (winner || draw || gameData.game[index]) return;

    const newGameState = [...gameData.game];
    newGameState[index] =
      gameData.turn === gameData.players.player1 ? "X" : "O";
    const newTurn =
      gameData.turn === gameData.players.player1
        ? gameData.players.player2
        : gameData.players.player1;

    const updatedGameData = { ...gameData, game: newGameState, turn: newTurn };

    setGameData(updatedGameData);

    const currentWinner = calculateWinner(newGameState);
    const isDraw = !newGameState.includes(null) && !currentWinner;

    if (currentWinner || isDraw) {
      const status = isDraw ? "Draw" : "Completed";
      storeGame(gameDetails(updatedGameData, currentWinner, isDraw, status));
      setGameData({ ...updatedGameData, status });
    }
  }

  const currentDateTime = () => {
    const d = new Date();
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const gameDetails = (gameData, winner, draw, status) => ({
    players: gameData.players,
    game: gameData.game,
    winner: winner || (draw ? "Draw" : null),
    date: currentDateTime(),
    status: status,
  });

  function newGame() {
    const previousWinner = winner || gameData.turn;
    const newGameData = {
      players: {
        player1: previousWinner,
        player2:
          previousWinner === gameData.players.player1
            ? gameData.players.player2
            : gameData.players.player1,
      },
      turn: previousWinner,
      game: Array(9).fill(null),
      status: "Ongoing",
    };
    setGameData(newGameData);
  }

  const winningConditions = [
    // rows:
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns:
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals:
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (board) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === "X"
          ? gameData.players.player1
          : gameData.players.player2;
      }
    }
    return null;
  };

  const winner = calculateWinner(gameData.game);
  const draw = !gameData.game.includes(null) && !winner;

  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? "Draw"
    : `Current player: ${gameData.turn}`;

  return (
    <div>
      <div className="board" role="grid" aria-label="Tic-Tac-Toe Board">
        {renderSquares()}
      </div>

      <div className="game-data">
        <div>X: {gameData.players.player1}</div>
        <div>O: {gameData.players.player2}</div>
        <div role="status" aria-live="polite">
          {status}
        </div>
      </div>

      <div className="button-container">
        <button
          className="button"
          onClick={newGame}
          aria-label="Start a new game"
        >
          New Game
        </button>
        <Link to="/">
          <button className="button" aria-label="Choose new players">
            New Players
          </button>
        </Link>
        <Link to="/scoreboard">
          <button className="button" aria-label="View scoreboard">
            Scoreboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Gameboard;
