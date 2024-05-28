// src/components/Commands/Email.js
function Email() {
  return (
    <div>
      <p>Do not email me, I'm just kidding 😅</p>
      <p>You can email me at: xinyus0117@gmail.com</p>
      <div className="email">
        <span>Or Email me by clicking the button:</span>
        <a
          href="mailto:xinyus0117@gmail.com"
          style={{ textDecoration: "none" }}
        >
          <button className="email-button">Email Me</button>
        </a>
      </div>
    </div>
  );
}

export default Email;