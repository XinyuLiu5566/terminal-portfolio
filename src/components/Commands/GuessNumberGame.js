import React, { useState } from "react";

const GuessNumberGame = ({ onExit }) => {
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    const guessNumber = parseInt(guess, 10);

    if (guessNumber < randomNumber) {
      setMessage("Too low!");
    } else if (guessNumber > randomNumber) {
      setMessage("Too high!");
    } else {
      setMessage("Correct! You guessed the number!");
    }
  };

  const resetGame = () => {
    setGuess("");
    setMessage("");
  };

  return (
    <div>
      <h1>Guess the Number Game</h1>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="number"
          value={guess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
        />
        <button type="submit">Guess</button>
      </form>
      <p>{message}</p>
      {message === "Correct! You guessed the number!" && (
        <button onClick={resetGame}>Play Again</button>
      )}
      <button onClick={onExit}>Exit Game</button>
    </div>
  );
};

export default GuessNumberGame;
