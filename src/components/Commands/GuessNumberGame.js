import React, { useState } from "react";

const GuessNumberGame = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
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
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
  };

  return (
    <div>
      <h2>Guess the Number between 1-100</h2>
      <form onSubmit={handleGuessSubmit} className="guess-number-form">
        <input
          className="guess-number-input"
          type="number"
          value={guess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
        />
        <button className="my-button" type="submit">
          Guess
        </button>
      </form>

      <p>{message}</p>
      {message === "Correct! You guessed the number!" && (
        <button className="my-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default GuessNumberGame;
