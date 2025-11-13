
import React from 'react';
import { Question, UserAnswer } from '../types';

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, userAnswers, onRestart }) => {
  const score = userAnswers.reduce((total, answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.correctAnswerIndex === answer.selectedAnswerIndex) {
      return total + 1;
    }
    return total;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700 w-full animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">Quiz Finalizado!</h2>
        <p className="text-2xl text-gray-300">Sua pontuação final é:</p>
        <p className="text-6xl font-bold my-4 text-white">{score} / {questions.length}</p>
        <div className="w-full bg-gray-700 rounded-full h-4 my-4">
            <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
        <p className="text-xl text-gray-400">{percentage}% de acerto</p>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-lg"
        >
          Tentar Novamente
        </button>
      </div>
      
      <div className="mt-8 border-t border-gray-700 pt-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Gabarito</h3>
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
          {questions.map((question, index) => {
            const userAnswer = userAnswers.find(a => a.questionId === question.id);
            const selectedAnswerIndex = userAnswer?.selectedAnswerIndex ?? -1;
            const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;
            
            return (
              <div key={question.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <p className="font-bold text-gray-300 mb-2">{index + 1}. {question.question}</p>
                <p className={`p-2 rounded ${isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                  Sua resposta: <span className="font-semibold">{selectedAnswerIndex > -1 ? question.options[selectedAnswerIndex] : 'Não respondida'}</span>
                </p>
                {!isCorrect && (
                  <p className="p-2 mt-2 rounded bg-blue-900 text-blue-300">
                    Resposta correta: <span className="font-semibold">{question.options[question.correctAnswerIndex]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
