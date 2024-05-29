// src/commandsContent/help.js
import React from "react";

const Help = () => (
  <div className="help-command">
    <div>
      <span className="command-name">whois</span>{" "}
      <span className="command-description">Who am I?</span>
    </div>
    <div>
      <span className="command-name">socials</span>{" "}
      <span className="command-description">Display social networks</span>
    </div>
    <div>
      <span className="command-name">education</span>{" "}
      <span className="command-description">My education history</span>
    </div>
    {/* <div>
      <span className="command-name">secret</span>{" "}
      <span className="command-description">Find the password</span>
    </div> */}
    <div>
      <span className="command-name">projects</span>{" "}
      <span className="command-description">View coding projects</span>
    </div>

    <div>
      <span className="command-name">quote</span>{" "}
      <span className="command-description">
        Let me give you a beautiful quote
      </span>
    </div>
    <div>
      <span className="command-name">help</span>{" "}
      <span className="command-description">
        You obviously already know what this does
      </span>
    </div>
    <div>
      <span className="command-name">history</span>{" "}
      <span className="command-description">View your history commands</span>
    </div>
    <div>
      <span className="command-name">email</span>{" "}
      <span className="command-description">My email</span>
    </div>
    <div>
      <span className="command-name">little-mysterious-game</span>{" "}
      <span className="command-description">See what you got</span>
    </div>
    <div>
      <span className="command-name">banner</span>{" "}
      <span className="command-description">Show the welcome banner</span>
    </div>
    <div>
      <span className="command-name">clear</span>{" "}
      <span className="command-description">Clear terminal content</span>
    </div>
  </div>
);

export default Help;
