import { useState, useEffect } from "react";

const useFetchQuote = () => {
  const [quote, setQuote] = useState("Fetching quote...");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(`${data.content} – ${data.author}`);
      } catch (error) {
        setQuote("Error fetching quote.");
      }
    };

    fetchQuote();
  }, []);

  return { quote };
};

export default useFetchQuote;
