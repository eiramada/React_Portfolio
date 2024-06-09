import React, { useEffect, useState } from "react";
import "../css/Gameboard.css";

function Gameboard() {
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

  const [turn, setTurn] = useState(null);

  useEffect(() => {
    setTurn(localStorage.getItem("turn") || data.player1);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    localStorage.setItem("turn", turn);
  }, [turn, data]);

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
        {value}
      </button>
    ));
  }

  function selectSquare(index) {
    if (winner || draw) return;

    const newPlay = [...game];
    newPlay[index] = turn === data.player1 ? "X" : "O";
    setGame(newPlay);

    if (calculateWinner(newPlay) || !newPlay.includes(null)) {
      return;
    }

    const newTurn = turn === data.player1 ? data.player2 : data.player1;
    setTurn(newTurn);
  }

  function newGame() {
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
    : `Next player: ${turn === data.player1 ? data.player2 : data.player1}`;

  return (
    <div>
      <div className="board" role="grid" aria-label="Tic-Tac-Toe Board">
        {renderSquares()}
      </div>

      <div className="game-data">
        <div>X: {data.player1}</div>
        <div>O: {data.player2}</div>
        <div>{status}</div>
      </div>

      <button className="new-game-button" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default Gameboard;
