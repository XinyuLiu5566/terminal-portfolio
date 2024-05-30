// src/commandsContent/Socials.js
import React from "react";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/XinyuLiu5566",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/xinyu-liu-843038193/",
  },
];

const Socials = () => (
  <div className="social-links-section">
    <div className="social-links">
      {socialLinks.map((link) => (
        <div key={link.id} className="social-link-item">
          <span className="social-number">{link.id}.</span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {link.name}
          </a>
          <span className="social-url">- {link.url}</span>
        </div>
      ))}
    </div>
    <p>Usage: socials go &lt;social-no&gt;</p>
    <p>eg: socials go 1</p>
  </div>
);

export default Socials;
