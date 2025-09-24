"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  XCircle,
  Book,
  Brain,
} from "lucide-react";

import data from "./skull.json";

const SkeletalStudyApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [studyMode, setStudyMode] = useState("flashcards"); // 'flashcards' or 'quiz'
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const anatomyData = useMemo(
    () =>
      studyMode === "flashcards"
        ? shuffleArray(data.anatomyData)
        : shuffleArray(data.anatomyData).slice(0, 5),
    [studyMode]
  );

  useEffect(() => {
    // Reset state when switching modes
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswerSubmitted(false);
  }, [studyMode]);

  const nextCard = () => {
    if (currentIndex < anatomyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswerSubmitted(false);
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(anatomyData.length - 1);
    }
    setShowAnswer(false);
    setSelectedAnswer("");
    setAnswerSubmitted(false);
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
  };

  const handleQuizAnswer = (answer) => {
    if (answerSubmitted) return;

    setSelectedAnswer(answer);
    setAnswerSubmitted(true);
    const isCorrect = answer === anatomyData[currentIndex].quiz.correct;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const currentItem = anatomyData[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Skeletal System Study App
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setStudyMode("flashcards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                studyMode === "flashcards"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <Book size={20} />
              Flashcards
            </button>
            <button
              onClick={() => setStudyMode("quiz")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                studyMode === "quiz"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <Brain size={20} />
              Quiz Mode
            </button>
          </div>
          {studyMode === "quiz" && (
            <div className="flex justify-center items-center gap-4">
              <div className="text-lg font-semibold text-indigo-700">
                Score: {score.correct}/{score.total} (
                {score.total > 0
                  ? Math.round((score.correct / score.total) * 100)
                  : 0}
                %)
              </div>
              <button
                onClick={resetScore}
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Main Card */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
          style={{ minHeight: 400 }}
        >
          {studyMode === "flashcards" ? (
            <div style={{ minHeight: 500 }}>
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={currentItem.image}
                    style={{ maxHeight: 400, width: "auto", maxWidth: "100%" }}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  {currentIndex + 1} of {anatomyData.length}
                </div>
              </div>
              <div className="space-y-4">
                {!showAnswer ? (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Show Details
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                      {currentItem.name}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">
                          Description
                        </h3>
                        <p className="text-blue-800">
                          {currentItem.description}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-2">
                          Location
                        </h3>
                        <p className="text-green-800">{currentItem.location}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">
                        Function{" "}
                      </h3>
                      <p className="text-purple-800">{currentItem.function}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Quiz Mode
            <div className="space-y-6" style={{ minHeight: 400 }}>
              <div className="flex justify-center mb-4">
                <img
                  src={currentItem.image}
                  style={{ maxHeight: 400, width: "auto", maxWidth: "100%" }}
                />
              </div>
              <div className="grid gap-3">
                {currentItem.quiz.options.map((option, index) => {
                  let buttonClass =
                    "w-full p-4 text-left border-2 rounded-lg transition-colors ";

                  if (answerSubmitted) {
                    if (option === currentItem.quiz.correct) {
                      buttonClass +=
                        "bg-green-100 border-green-500 text-green-800";
                    } else if (
                      option === selectedAnswer &&
                      option !== currentItem.quiz.correct
                    ) {
                      buttonClass += "bg-red-100 border-red-500 text-red-800";
                    } else {
                      buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
                    }
                  } else {
                    buttonClass +=
                      "bg-white border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 text-gray-800";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(option)}
                      className={buttonClass}
                      disabled={answerSubmitted}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answerSubmitted &&
                          option === currentItem.quiz.correct && (
                            <CheckCircle className="text-green-600" size={20} />
                          )}
                        {answerSubmitted &&
                          option === selectedAnswer &&
                          option !== currentItem.quiz.correct && (
                            <XCircle className="text-red-600" size={20} />
                          )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletalStudyApp;
