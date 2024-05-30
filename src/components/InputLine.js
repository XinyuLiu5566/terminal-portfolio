const InputLine = ({ command, history }) => (
  <div className="inputLine" key={history.length}>
    <span className="command-dir">guest@chrisliu.com:~$ </span>
    <span className="command-input">{command}</span>
  </div>
);

export default InputLine;
