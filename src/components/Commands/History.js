// src/commandsContent/History.js
import React from "react";

const History = ({ commandHistory }) => (
  <div>
    {commandHistory.map((cmd, index) => (
      <div key={index}>{cmd}</div>
    ))}
  </div>
);

export default History;
