import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      {alertMessage && <div>{alertMessage}</div>}
      <label htmlFor="playerOne">Player 1</label> <br />
      <input id="playerOne" type="text" ref={playerOneRef} /> <br />
      <br />
      <label htmlFor="playerTwo">Player 2</label> <br />
      <input id="playerTwo" type="text" ref={playerTwoRef} /> <br />
      <br /> <br />
      <button className="button" onClick={startGame}>Start</button>
      <Link to="/scoreboard">
        <button className="button">Scoreboard</button>
      </Link>
    </div>
  );
}

export default RegistrationForm;
