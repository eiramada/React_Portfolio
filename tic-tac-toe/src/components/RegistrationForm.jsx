import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegistrationForm.css";

function RegistrationForm() {
  const playerOneRef = useRef();
  const playerTwoRef = useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  function startGame() {
    if (validatedPlayers()) {
      savePlayers();
      navigate("/game");
    }
  }

  function savePlayers() {
    const newSetOfPlayers = {
      player1: playerOneRef.current.value.trim(),
      player2: playerTwoRef.current.value.trim(),
    };

    localStorage.setItem("playerData", JSON.stringify(newSetOfPlayers));
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
