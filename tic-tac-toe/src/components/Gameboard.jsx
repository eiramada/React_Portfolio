import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Gameboard.css";
import { GameHistoryContext } from "../store/GameHistoryContext";

function Gameboard() {
  const { storeGame } = useContext(GameHistoryContext);

  const initialData = {
    player1: "Player 1",
    player2: "Player 2",
  };
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("playerData")) || initialData
  );

  const [game, setGame] = useState(
    () => JSON.parse(localStorage.getItem("game")) || Array(9).fill(null)
  );

  const [turn, setTurn] = useState(
    () => localStorage.getItem("turn") || data.player1
  );

  useEffect(() => {
    localStorage.setItem("turn", turn);
  }, [turn]);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(game));
  }, [game]);

  function renderSquares() {
    return game.map((value, index) => (
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
    if (winner || draw || game[index]) return;

    const newState = [...game];
    newState[index] = turn === data.player1 ? "X" : "O";
    setGame(newState);

    if (calculateWinner(newState) || !newState.includes(null)) {
      return;
    }

    const newTurn = turn === data.player1 ? data.player2 : data.player1;
    setTurn(newTurn);
  }

  const currentDateTime = () => {
    const d = new Date();
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const gameDetails = () => ({
    players: { player1: data.player1, player2: data.player2 },
    game: game,
    winner: winner || (draw ? "Draw" : null),
    date: currentDateTime(),
    status: draw ? "Draw" : winner ? "Completed" : "Ongoing",
  });

  function newGame() {
    storeGame(gameDetails());
    localStorage.removeItem("turn");
    localStorage.removeItem("game");
    setGame(Array(9).fill(null));
    setTurn(data.player1);
  }

  const winningConditions = [
    //rows:
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns:
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals:
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (board) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === "X" ? data.player1 : data.player2;
      }
    }
    return null;
  };

  const winner = calculateWinner(game);
  const draw = !game.includes(null) && !winner;

  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? "Draw"
    : `Current player: ${turn}`;

  return (
    <div>
      <div className="board" role="grid" aria-label="Tic-Tac-Toe Board">
        {renderSquares()}
      </div>

      <div className="game-data">
        <div>X: {data.player1}</div>
        <div>O: {data.player2}</div>
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
