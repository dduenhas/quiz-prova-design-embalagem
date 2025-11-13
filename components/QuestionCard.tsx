
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number;
  onSelectAnswer: (questionId: number, answerIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onSelectAnswer }) => {
  return (
    <div key={question.id} className="animate-fade-in">
      <p className="text-gray-400 text-sm mb-2">Capítulo {question.chapter}</p>
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100">{question.id}. {question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 text-base";
          const selectedClasses = "bg-purple-900 border-purple-500 text-white font-semibold shadow-lg";
          const unselectedClasses = "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500";
          
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(question.id, index)}
              className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
            >
              <span className={`inline-block mr-3 w-6 h-6 rounded-full border-2 ${isSelected ? 'border-purple-400 bg-purple-500' : 'border-gray-500'} flex items-center justify-center text-sm font-bold`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
