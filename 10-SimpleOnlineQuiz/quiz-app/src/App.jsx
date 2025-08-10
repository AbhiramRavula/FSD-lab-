import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    questionText: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answerIndex: 2,
  },
  {
    questionText: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answerIndex: 3,
  },
  {
    questionText: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answerIndex: 1,
  },
  {
    questionText: "What year was React released?",
    options: ["2013", "2015", "2010", "2011"],
    answerIndex: 0,
  },
  {
    questionText: "What is Matrusri E&L?",
    options: ["School", "Law", "Medical", "Arts"],
    answerIndex: 0,
  },
];

function App() {
  const [currentQn, setCurrentQn] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    const correct = index === questions[currentQn].answerIndex;
    setAnswerStatus(correct ? "Correct!" : "Wrong!");
    if (correct) setScore(score + 1);
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setAnswerStatus(null);
    if (currentQn + 1 < questions.length) {
      setCurrentQn(currentQn + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQn(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswerStatus(null);
  };

  return (
    <div className="quiz-container">
      <h1>Simple Online Quiz</h1>

      {showScore ? (
        <div className="score-section">
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="quiz-section">
          <div className="question-count">
            Question {currentQn + 1} / {questions.length}
          </div>
          <div className="question-text">{questions[currentQn].questionText}</div>
          <div className="options-container">
            {questions[currentQn].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === index ? "selected" : ""
                }`}
                onClick={() => !selectedOption && handleOptionClick(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {answerStatus && <div className="answer-status">{answerStatus}</div>}

          <button
            className="next-button"
            onClick={handleNextClick}
            disabled={selectedOption === null}
          >
            {currentQn + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
