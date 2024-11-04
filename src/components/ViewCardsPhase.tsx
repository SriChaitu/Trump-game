import React from 'react';
import { Card as CardType } from '../types';
import { PlayerHand } from './PlayerHand';

interface ViewCardsPhaseProps {
  cards: CardType[];
  onViewCards: () => void;
  hasViewedCards: boolean;
}

export const ViewCardsPhase: React.FC<ViewCardsPhaseProps> = ({
  cards,
  onViewCards,
  hasViewedCards,
}) => {
  if (!hasViewedCards) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <button
          onClick={onViewCards}
          className="px-8 py-4 bg-green-600 text-white rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          View Your Cards
        </button>
        <p className="mt-4 text-white text-lg">Click to reveal your 13 cards</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Cards</h2>
        <p className="text-green-200 mb-6">You have {cards.length} cards</p>
      </div>
      <div className="bg-green-700 rounded-xl p-6 shadow-xl">
        <PlayerHand
          cards={cards}
          canPlay={false}
          onPlayCard={() => {}}
          trumpSuit={null}
        />
      </div>
    </div>
  );
};