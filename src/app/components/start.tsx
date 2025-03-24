import React from 'react';

interface StartProps {
  setQuizStarted: (started: boolean) => void;
}

const Start: React.FC<StartProps> = ({ setQuizStarted }) => {
  return (
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
  );
};

export default Start;
