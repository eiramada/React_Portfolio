import React, { useEffect, useState } from "react";
import "../css/Gameboard.css";

function Gameboard() {
  const initialData = {
    player1: "Player 1",
    player2: "Player 2",
  };
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("playSet")) || initialData
  );
  const [play, setPlay] = useState(
    () => JSON.parse(localStorage.getItem("play")) || Array(9).fill(null)
  );
  const [turn, setTurn] = useState(
    () => localStorage.getItem("turn") || data.player1
  );

  useEffect(() => {
    localStorage.setItem("play", JSON.stringify(play));
  }, [play]);

  useEffect(() => {
    localStorage.setItem("turn", turn);
  }, [turn]);

  function renderSquares() {
    return play.map((value, index) => (
      <button
        key={index}
        className={`square ${value ? `filled ${value}` : ""}`}
        onClick={() => selectSquare(index)}
        aria-label={value ? `Square filled with ${value}` : "Empty square"}
      >
        {value}
      </button>
    ));
  }

  function selectSquare(index) {
    if (play[index]) return;
    if (!play.includes(null)) return;

    const newPlay = [...play];
    newPlay[index] = turn === data.player1 ? "X" : "O";
    setPlay(newPlay);

    const newTurn = turn === data.player1 ? data.player2 : data.player1;
    setTurn(newTurn);
  }

  function newGame() {
    localStorage.removeItem("turn");
    localStorage.removeItem("play");
    setPlay(Array(9).fill(null));
    setTurn(data.player1);
  }

  return (
    <div>
      <div className="board" role="grid" aria-label="Tic Tac Toe Board">
        {renderSquares()}
      </div>

      <div className="game-data">
        <div>X: {data.player1}</div>
        <div>O: {data.player2}</div>
        {play.includes(null) && <div>Turn: {turn}</div>}
      </div>
      {!play.includes(null) && (
        <button className="new-game-button" onClick={newGame}>
          New Game
        </button>
      )}
    </div>
  );
}

export default Gameboard;
