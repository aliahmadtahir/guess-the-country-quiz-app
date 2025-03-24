'use client';

import React, { useState, useEffect } from 'react';
import Start from '@/app/components/start';
import Result from '@/app/components/result';
import question from '@/app/data/question.json';

const Page = () => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswerClick = (choice: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(choice);
      if (choice === question[currentQuestion].rightAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < question.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen p-4">
      {!quizStarted ? (
        <Start setQuizStarted={setQuizStarted} />
      ) : !showResults ? (
        <div className="w-full sm:w-[700px] bg-blue-100 pb-4 border-black rounded-lg text-center shadow-2xl border-1">
          <div className="w-full flex justify-between items-center bg-white border border-black rounded-lg p-4 shadow-xl m-0 mb-4">
            <h1 className="text-lg font-bold text-black">
              Guess the Country by Its Neighbors Quiz
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-black font-medium">
                {currentQuestion + 1} of {question.length}
              </span>
              <span className="text-sm text-black font-medium">
                Score: {score * 500} points
              </span>
            </div>
          </div>
          <h2 className="mb-4 text-lg font-semibold text-black">
            {question[currentQuestion].question}
          </h2>
          <div className="ml-2 mr-2 grid grid-cols-2 sm:grid-cols-2 gap-4 text-black">
            {question[currentQuestion].choice.map((choice, index) => (
              <div
                key={index}
                className={`relative px-6 py-3 border rounded-lg ${
                  selectedAnswer
                    ? choice === question[currentQuestion].rightAnswer
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
                {selectedAnswer && choice === question[currentQuestion].rightAnswer && (
                  <span className="absolute top-1 right-1 text-green-600 font-bold">✔</span>
                )}
                {selectedAnswer && choice === selectedAnswer && choice !== question[currentQuestion].rightAnswer && (
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
              {currentQuestion < question.length - 1 ? 'Next →' : 'See Results'}
            </button>
          )}
        </div>
      ) : (
        <Result score={score} totalQuestions={question
          .length} setQuizStarted={setQuizStarted} />
      )}
    </main>
  );
};

export default Page;
