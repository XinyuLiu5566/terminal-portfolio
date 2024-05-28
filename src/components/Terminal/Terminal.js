// src/Terminal.js
import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";
import { commandFiles } from "../Commands/Commands";
import { socialLinks } from "../Commands/Socials";

function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = `

  Type 'help' to see list of available commands.

  `;

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      const command = input.trim();
      const newHistory = [
        ...history,
        <span className="command-input">guest@ChrisLiu.com:~$ {command}</span>,
      ];

      let newCommandHistory = [...commandHistory, command];
      let commandOutput = "";

      if (commandFiles[command] !== undefined) {
        if (command === "clear") {
          setHistory([]);
          setInput("");
          setCommandHistory(newCommandHistory);
          setHistoryIndex(-1);
          return;
        } else {
          try {
            if (command === "history") {
              const HistoryComponent = (
                await import(`../Commands/${commandFiles[command]}`)
              ).default;
              commandOutput = (
                <HistoryComponent
                  key={newHistory.length}
                  commandHistory={newCommandHistory} // Pass the updated history
                />
              );
            } else {
              const Content = (
                await import(`../Commands/${commandFiles[command]}`)
              ).default;
              commandOutput = <Content key={newHistory.length} />;
            }
          } catch (error) {
            commandOutput = "Error loading command content.";
          }
        }
      } else if (command.startsWith("socials go ")) {
        const socialId = parseInt(command.split(" ")[2], 10);
        const socialLink = socialLinks.find((link) => link.id === socialId);
        if (socialLink) {
          window.open(socialLink.url, "_blank");
          commandOutput = `Navigating to ${socialLink.name}...`;
        } else {
          commandOutput =
            "Invalid social number. Use 'socials' to see the list of available social links.";
        }
      } else {
        commandOutput =
          "Command not found. For a list of commands, type 'help'.";
      }

      // Ensure there's a space before and after the command output
      newHistory.push(
        <div key={newHistory.length} className="command-output">
          <div>{commandOutput}</div>
        </div>
      );

      if (command !== "clear") {
        setHistory(newHistory);
      }

      // Update the command history state
      setCommandHistory(newCommandHistory);
      setInput("");
      setHistoryIndex(-1);
    } else if (event.key === "ArrowUp") {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(
              inputRef.current.value.length,
              inputRef.current.value.length
            );
          }
        }, 0);
      }
    } else if (event.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(
              inputRef.current.value.length,
              inputRef.current.value.length
            );
          }
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Move cursor to the end of the input field whenever the input value changes
  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [input]);

  // Focus the input field when historyIndex changes
  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      setTimeout(() => {
        inputRef.current.setSelectionRange(length, length);
      }, 0);
    }
  }, [historyIndex]);

  // Add event listener to focus the input field when clicking anywhere in the window
  useEffect(() => {
    const handleWindowClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="welcome">
        {welcomeMessage.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="output">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="inputLine">
        <span className="command-input">guest@ChrisLiu.com</span>
        <div className="command-input">:~$ </div>
        <input
          type="text"
          className="command-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
          autoFocus
          ref={inputRef}
        />
      </div>
    </div>
  );
}

export default Terminal;
