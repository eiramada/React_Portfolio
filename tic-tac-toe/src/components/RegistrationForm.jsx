import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameHistoryContext } from "../context/GameHistoryContext";
import "../css/RegistrationForm.css";

function RegistrationForm() {
  const playerOneRef = useRef();
  const playerTwoRef = useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { history } = useContext(GameHistoryContext);

  function startGame() {
    if (validatedPlayers()) {
      const players = assignPlayersBasedOnHistory();
      saveGameData({
        players,
        turn: players.player1,
        game: Array(9).fill(null),
      });
      navigate("/game");
    }
  }

  function assignPlayersBasedOnHistory() {
    const playerOne = playerOneRef.current.value.trim();
    const playerTwo = playerTwoRef.current.value.trim();

    const relevantGames = history.filter(
      (game) =>
        (game.players.player1 === playerOne &&
          game.players.player2 === playerTwo) ||
        (game.players.player1 === playerTwo &&
          game.players.player2 === playerOne)
    );

    if (relevantGames.length > 0) {
      relevantGames.sort((a, b) => new Date(b.date) - new Date(a.date));
      const mostRecentGame = relevantGames[0];
      return {
        player1: mostRecentGame.winner,
        player2: mostRecentGame.winner === playerOne ? playerTwo : playerOne,
      };
    }

    return { player1: playerOne, player2: playerTwo };
  }

  function saveGameData(data) {
    localStorage.setItem("gameData", JSON.stringify(data));
  }

  function validatedPlayers() {
    const playerOne = playerOneRef.current.value.trim();
    const playerTwo = playerTwoRef.current.value.trim();

    if (!playerOne || !playerTwo) {
      setAlertMessage("Insert names for both players");
      return false;
    }

    if (playerOne.toLowerCase() === playerTwo.toLowerCase()) {
      setAlertMessage("Player names must be unique");
      return false;
    }

    setAlertMessage("");
    return true;
  }

  return (
    <div className="registration-form">
      {alertMessage && (
        <div className="alert" role="alert">
          {alertMessage}
        </div>
      )}
      <label htmlFor="playerOne">Player 1</label>
      <input
        id="playerOne"
        type="text"
        ref={playerOneRef}
        aria-labelledby="playerOne"
      />
      <label htmlFor="playerTwo">Player 2</label>
      <input
        id="playerTwo"
        type="text"
        ref={playerTwoRef}
        aria-labelledby="playerTwo"
      />
      <div className="button-container">
        <button className="button" onClick={startGame} aria-label="Start game">
          Start
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

export default RegistrationForm;
