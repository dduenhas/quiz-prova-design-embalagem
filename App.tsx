
import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { QuizState, UserAnswer } from './types';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultsScreen from './components/ResultsScreen';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.Start);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleStartQuiz = useCallback(() => {
    setUserAnswers([]);
    setQuizState(QuizState.InProgress);
  }, []);

  const handleFinishQuiz = useCallback((finalAnswers: UserAnswer[]) => {
    setUserAnswers(finalAnswers);
    setQuizState(QuizState.Finished);
  }, []);
  
  const handleRestartQuiz = useCallback(() => {
    setUserAnswers([]);
    setQuizState(QuizState.Start);
  }, []);

  const renderContent = () => {
    switch (quizState) {
      case QuizState.InProgress:
        return <Quiz questions={QUIZ_QUESTIONS} onFinishQuiz={handleFinishQuiz} />;
      case QuizState.Finished:
        return <ResultsScreen questions={QUIZ_QUESTIONS} userAnswers={userAnswers} onRestart={handleRestartQuiz} />;
      case QuizState.Start:
      default:
        return <StartScreen onStart={handleStartQuiz} totalQuestions={QUIZ_QUESTIONS.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
