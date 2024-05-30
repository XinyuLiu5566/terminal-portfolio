// src/commandsContent/whois.js
import React from "react";
export const projectLinks = [
  {
    id: 1,
    name: "ScribeAR",
    url: "https://scribear.illinois.edu/v/index.html",
  },
  {
    id: 2,
    name: "Terminal-Portfolio",
    url: "https://www.google.com/",
  },
];
const Projects = () => (
  <div className="project-links-section">
    <p>Here are my projects:</p>
    <div className="project-links">
      {projectLinks.map((link) => (
        <div key={link.id} className="project-link-item">
          <span className="project-number">{link.id}.</span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {link.name}
          </a>
          <span className="project-url">- {link.url}</span>
        </div>
      ))}
    </div>
    <p>Usage: projects go &lt;project-no&gt;</p>
    <p>eg: projects go 1</p>
  </div>
);

export default Projects;
