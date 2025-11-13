
import React, { useState, useCallback } from 'react';
import { Question, UserAnswer } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

interface QuizProps {
  questions: Question[];
  onFinishQuiz: (answers: UserAnswer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinishQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    questions.map(q => ({ questionId: q.id, selectedAnswerIndex: -1 }))
  );

  const handleSelectAnswer = useCallback((questionId: number, answerIndex: number) => {
    setUserAnswers(prevAnswers =>
      prevAnswers.map(ans =>
        ans.questionId === questionId ? { ...ans, selectedAnswerIndex: answerIndex } : ans
      )
    );
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onFinishQuiz(userAnswers);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(ans => ans.questionId === currentQuestion.id)?.selectedAnswerIndex ?? -1;

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700 w-full">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <div className="mt-6">
        <QuestionCard
          question={currentQuestion}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswer={currentAnswer}
        />
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Próxima
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
