
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="text-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        Quiz de Produção Gráfica para Embalagem
      </h1>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
        Teste seus conhecimentos com {totalQuestions} questões sobre o fascinante mundo da produção gráfica para embalagens. Preparado para o desafio?
      </p>
      <button
        onClick={onStart}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-lg"
      >
        Iniciar Quiz
      </button>
    </div>
  );
};

export default StartScreen;
