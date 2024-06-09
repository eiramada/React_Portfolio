import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameHistoryContext } from "../context/GameHistoryContext";
import "../css/Scoreboard.css";

function Scoreboard() {
  const { history } = useContext(GameHistoryContext);

  return (
    <div className="scoreboard-container">
      <h2>Game History</h2>
      <table className="scoreboard-table" role="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Player 1</th>
            <th scope="col">Player 2</th>
            <th scope="col">Winner</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, index) => (
            <tr key={index}>
              <td>{h.date}</td>
              <td>{h.players.player1}</td>
              <td>{h.players.player2}</td>
              <td>{h.winner}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <Link to="/game">
          <button className="button" aria-label="Start a new game">
            Game
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Scoreboard;
