'use client';

import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  choice: string[];
  rightAnswer: string;
}

const Page = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0); // Tracks the number of correct answers
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions: Question[] = [
    {
      question: 'What country do Italy, Spain, and Belgium all touch?',
      choice: ['Germany', 'France', 'Switzerland', 'Netherlands'],
      rightAnswer: 'France',
    },
    {
      question: 'What country borders Portugal?',
      choice: ['Morocco', 'Spain', 'Italy', 'Belgium'],
      rightAnswer: 'Spain',
    },
    {
      question: 'What country do Poland and Switzerland both touch?',
      choice: ['Austria', 'Hungary', 'Italy', 'Germany'],
      rightAnswer: 'Germany',
    },
    {
      question: 'What country borders both Slovenia and France?',
      choice: ['Czech Republic', 'Italy', 'Netherlands', 'Luxembourg'],
      rightAnswer: 'Italy',
    },
    {
      question: 'What country has land borders with Finland and North Korea?',
      choice: ['Russia', 'Mongolia', 'Sweden', 'Kazakhstan'],
      rightAnswer: 'Russia',
    },
  ];

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswerClick = (choice: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(choice);
      if (choice === questions[currentQuestion].rightAnswer) {
        setScore(score + 1); // Increment score for each correct answer
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen p-4">
      {!quizStarted ? (
        <div
          className="relative w-full sm:w-[630px] h-[400px] bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/images/background.avif')" }}
        >
          <h6 className="absolute -translate-y-7/2 px-2 py-1 bg-blue-300 text-black text-xs rounded-lg border-1 border-black">
            Geography & Travel
          </h6>
          <div className="bg-white bg-opacity-80 text-black px-6 py-4 rounded-lg text-center shadow-lg">
            <h1 className="font-bold whitespace-pre-line w-max">
              Guess the Country <br /> by Its Neighbours <br /> Quiz
            </h1>
            <button
              className="mt-4 px-16 py-2 bg-blue-600 text-white rounded-lg border border-black hover:bg-blue-400 cursor-pointer"
              onClick={() => setQuizStarted(true)}
            >
              Start
            </button>
            <h6 className="text-left mt-2 text-xs">5 Questions</h6>
          </div>
        </div>
      ) : !showResults ? (
        <div className="w-full sm:w-[700px] bg-blue-100 pb-4 border-black rounded-lg text-center shadow-2xl border-1">
          <div className="w-full flex justify-between items-center bg-white border border-black rounded-lg p-4 shadow-xl m-0 mb-4">
            <h1 className="text-lg font-bold text-black">
              Guess the Country by Its Neighbors Quiz
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-black font-medium">
                {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-black font-medium">
                Score: {score * 500} points
              </span>
            </div>
          </div>
          <h2 className="mb-4 text-lg font-semibold text-black">
            {questions[currentQuestion].question}
          </h2>
          <div className="ml-2 mr-2 grid grid-cols-2 sm:grid-cols-2 gap-4 text-black">
            {questions[currentQuestion].choice.map((choice, index) => (
              <div
                key={index}
                className={`relative px-6 py-3 border rounded-lg ${
                  selectedAnswer
                    ? choice === questions[currentQuestion].rightAnswer
                      ? 'bg-green-100 border-green-900 text-black'
                      : choice === selectedAnswer
                      ? 'bg-red-100 border-red-900 text-black'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                    : 'border-black hover:bg-blue-300 hover:border-blue-900 hover:text-black cursor-pointer'
                }`}
              >
                <button
                  className="w-full h-full text-left cursor-pointer"
                  onClick={() => !selectedAnswer && handleAnswerClick(choice)}
                >
                  {choice}
                </button>
                {selectedAnswer && choice === questions[currentQuestion].rightAnswer && (
                  <span className="absolute top-1 right-1 text-green-600 font-bold">✔</span>
                )}
                {selectedAnswer && choice === selectedAnswer && choice !== questions[currentQuestion].rightAnswer && (
                  <span className="absolute top-1 right-1 text-red-600 font-bold">✖</span>
                )}
              </div>
            ))}
          </div>
          {selectedAnswer && (
            <button
              className="mt-4 px-6 py-2 bg-blue-600 border border-black text-white rounded-lg hover:bg-blue-800 cursor-pointer"
              onClick={handleNext}
            >
              {currentQuestion < questions.length - 1 ? 'Next →' : 'See Results'}
            </button>
          )}
        </div>
      ) : (
        <div className="w-full sm:w-[500px] bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-lg font-bold text-black mb-6">
            Guess the Country by Its Neighbors Quiz
          </h1>
          <div className="text-3xl font-bold text-blue-600">
            {score}/{questions.length}
          </div>
          <div className="text-sm text-gray-500 mt-2">{score * 500} points</div>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-100 hover:border-blue-800 active:bg-blue-200 cursor-pointer"
              onClick={() => {
                setQuizStarted(false);
                setCurrentQuestion(0);
                setScore(0);
                setShowResults(false);
                setSelectedAnswer(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582M20 20v-5h-.581M4 4l16 16"
                />
              </svg>
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
