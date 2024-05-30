import React, { useState, useEffect, useRef } from "react";
import { commandFiles } from "./Commands";
import { socialLinks } from "./Commands/Socials";
import { projectLinks } from "./Commands/Projects";
import WelcomeBanner from "./Commands/WelcomeBanner";
import InputLine from "./InputLine";

function Terminal() {
  const [history, setHistory] = useState([
    <InputLine key="initial-command" history={[]} command="welcome" />,
    <WelcomeBanner key="initial-banner" />,
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // make cursor to point at end of command input when pressing up and down arrow
  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      setTimeout(() => {
        inputRef.current.setSelectionRange(length, length);
      }, 0);
    }
  }, [historyIndex]);

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      const command = input.trim();
      const newHistory = [
        ...history,
        <InputLine history={history} command={command} />,
      ];

      let newCommandHistory = [...commandHistory, command];
      let commandOutput = "";
      if (commandFiles[command] !== undefined) {
        if (command === "clear") {
          setHistory([]); // Clear the history completely
          setInput("");
          setCommandHistory(newCommandHistory);
          setHistoryIndex(-1);
          return;
        } else {
          try {
            const Content = (
              await import(`./Commands/${commandFiles[command]}`)
            ).default;
            commandOutput = (
              <Content
                key={newHistory.length}
                {...(command === "history"
                  ? { commandHistory: newCommandHistory }
                  : {})}
              />
            );
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
      } else if (command.startsWith("projects go ")) {
        const projectId = parseInt(command.split(" ")[2], 10);
        const projectLink = projectLinks.find((link) => link.id === projectId);
        if (projectLink) {
          window.open(projectLink.demo, "_blank");
          commandOutput = `Navigating to ${projectLink.name}...`;
        } else {
          commandOutput =
            "Invalid social number. Use 'socials' to see the list of available social links.";
        }
      } else {
        commandOutput =
          "Command not found. For a list of commands, type 'help'.";
      }

      newHistory.push(
        <div key={newHistory.length} className="command-output">
          <div>{commandOutput}</div>
        </div>
      );

      if (command !== "clear") {
        setHistory(newHistory);
      }

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

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="output">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="inputLine">
        <span className="command-dir">guest@chrisliu.com</span>
        <div className="command-dir">:~$ </div>
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
