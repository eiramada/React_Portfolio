import React, { useContext } from "react";
import { GameHistoryContext } from "../store/GameHistoryContext";
import "../css/Scoreboard.css";
import { Link } from "react-router-dom";

function Scoreboard() {
  const { history } = useContext(GameHistoryContext);

  return (
    <div className="scoreboard-container">
      <h2>Game History</h2>
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Winner</th>
            <th>Status</th>
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
      <Link to="/game">
        <button className="button">Game</button>
      </Link>
    </div>
  );
}

export default Scoreboard;
