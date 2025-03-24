import React from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
  setQuizStarted: (started: boolean) => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, setQuizStarted }) => {
  return (
    <div className="w-full sm:w-[500px] bg-white p-6 rounded-lg shadow-lg text-center">
      <h1 className="text-lg font-bold text-black mb-6">
        Guess the Country by Its Neighbors Quiz
      </h1>
      <div className="text-3xl font-bold text-blue-600">
        {score}/{totalQuestions}
      </div>
      <div className="text-sm text-gray-500 mt-2">{score * 500} points</div>
      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-100 hover:border-blue-800 active:bg-blue-200 cursor-pointer"
          onClick={() => {
            setQuizStarted(false);
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
  );
};

export default Result;
