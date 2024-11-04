import React from 'react';
import { Card } from './Card';
import { Card as CardType } from '../types';

interface PlayedCardsProps {
  currentRound: CardType[];
  trumpSuit: CardType['suit'] | null;
}

export const PlayedCards: React.FC<PlayedCardsProps> = ({
  currentRound,
  trumpSuit,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 min-h-[200px]">
      {currentRound.map((card, index) => (
        <div key={index} className="transform">
          <Card
            card={card}
            isTrump={card.suit === trumpSuit}
            isPlayable={false}
          />
        </div>
      ))}
    </div>
  );
};