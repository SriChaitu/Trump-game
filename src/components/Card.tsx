import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isPlayable?: boolean;
  isTrump?: boolean;
}

const suitColors = {
  hearts: 'text-red-600',
  diamonds: 'text-red-600',
  clubs: 'text-gray-800',
  spades: 'text-gray-800'
};

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export const Card: React.FC<CardProps> = ({ card, onClick, isPlayable, isTrump }) => {
  return (
    <button
      onClick={onClick}
      disabled={!isPlayable}
      className={`
        relative w-24 h-36 bg-white rounded-lg shadow-md border-2
        ${isPlayable ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed opacity-75'}
        ${isTrump ? 'border-yellow-400' : 'border-gray-200'}
        transition-all duration-200
      `}
    >
      <div className={`absolute top-2 left-2 ${suitColors[card.suit]}`}>
        <div className="text-lg font-bold">{card.rank}</div>
        <div className="text-2xl">{suitSymbols[card.suit]}</div>
      </div>
      <div className={`absolute bottom-2 right-2 ${suitColors[card.suit]}`}>
        <div className="text-lg font-bold">{card.rank}</div>
        <div className="text-2xl">{suitSymbols[card.suit]}</div>
      </div>
      {isTrump && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-yellow-400 text-4xl opacity-20">★</div>
        </div>
      )}
    </button>
  );
};