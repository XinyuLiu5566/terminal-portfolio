// src/commandsContent/whois.js
import React from "react";
export const projectLinks = [
  {
    id: 1,
    name: "ScribeAR",
    description:
      "An lightweight platform using automated speech recognition technologies for live transcription",
    repo: "https://github.com/scribear/ScribeAR.github.io",
    demo: "https://scribear.illinois.edu/v/index.html",
  },
  {
    id: 2,
    name: "Terminal-Portfolio",
    description: "You are viewing this",

    repo: "https://github.com/XinyuLiu5566/terminal-portfolio",
    demo: "https://xinyuliu.netlify.app",
  },
];
const Projects = () => (
  <div className="project-links-section">
    <div className="project-links">
      {projectLinks.map((link) => (
        <div key={link.id} className="project-link-item">
          <span className="project-number">{link.id}.</span>
          <a
            href={link.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {link.name}
          </a>
          <span className="project-url"> - {link.description}</span>
        </div>
      ))}
    </div>
    <p>Usage: projects go &lt;project-no&gt; to view live demo.</p>
    <p>eg: projects go 1</p>
  </div>
);

export default Projects;
