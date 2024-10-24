import { useState, useEffect } from "react";
import "./styles.css";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const App = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [opacity, setOpacity] = useState(1);

  // Fetch quotes on component mount
  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await response.json();
      setQuotesData(data.quotes);
      getRandomQuote(data.quotes);
    };
    fetchQuotes();
  }, []);

  // Get New
  const getNewQuote = () => {
    setOpacity(0);
    setTimeout(() => {
      changeColor();
      getRandomQuote(quotesData);
      setOpacity(1);
    }, 500);

    const tweet = document.getElementById("tweet-quote");
    tweet.href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${currentQuote}" ${currentAuthor}`;
  };

    // Randomize
    const getRandomQuote = (quotes) => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote.quote);
      setCurrentAuthor(randomQuote.author);
    };

  // Change Color
  const changeColor = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("wrapper").style.background = newColor;
    document.querySelector(".quote-text").style.color = newColor;
    document.querySelector(".quote-author").style.color = newColor;
    document.getElementById("new-quote").style.background = newColor;
    document
      .querySelectorAll(".social")
      .forEach((element) => (element.style.background = newColor));
  };

  return (
    <>
      <main id="wrapper">
        <div id="quote-box">
          <div className="quote-text" style={{ opacity }}>
            <i className="fa fa-quote-left"> </i>
            <span id="text">{currentQuote}</span>
          </div>
          <div className="quote-author" style={{ opacity }}>
            <span id="author">
              {"-"} {currentAuthor}
            </span>
          </div>
          <div className="buttons">
            <div>
              <a
                className="social"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_blank"
                href="">
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="social"
                id="github-quote"
                title="Post this quote on GitHub!"
                target="_blank"
                href="https://github.com/basedhound/freeCodeCamp_frontend-libraries"
                >
                <i className="fa fa-github"></i>
              </a>
              <a
                className="social"
                id="linkedin-quote"
                title="Post this quote on LinkedIn!"
                target="_blank"
                href="https://www.linkedin.com/in/fvukelic/">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <button className="button" id="new-quote" onClick={getNewQuote}>
              New Quote
            </button>
          </div>
        </div>
        <div className="footer">
          <a href="https://github.com/basedhound">Developed by Frank</a>
        </div>
      </main>
    </>
  );
};

export default App;
