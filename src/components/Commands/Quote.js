import React from "react";
import useFetchQuote from "../../hooks/useFetchQuote"; // Import the custom hook

const Quote = () => {
  const { quote } = useFetchQuote();

  return <div>{quote}</div>;
};

export default Quote;
