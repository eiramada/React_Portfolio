import React, { useRef, useState } from "react";

function RegistrationForm() {
  const playerOneRef = useRef();
  const playerTwoRef = useRef();
  const [alertMessage, setAlertMessage] = useState("");

  function startGame() {
    savePlayers();
  }

  function savePlayers() {
    if (!validatedPlayers()) return;

    const newSetOfPlayers = {
      player1: playerOneRef.current.value.trim(),
      player2: playerTwoRef.current.value.trim(),
    };

    localStorage.setItem("playSet", JSON.stringify(newSetOfPlayers));
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
      return;
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
      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default RegistrationForm;
