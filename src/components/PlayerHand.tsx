import React from 'react';
import { Card } from './Card';
import { Card as CardType } from '../types';

interface PlayerHandProps {
  cards: CardType[];
  canPlay: boolean;
  onPlayCard: (card: CardType) => void;
  trumpSuit: CardType['suit'] | null;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({
  cards,
  canPlay,
  onPlayCard,
  trumpSuit
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cards.map((card, index) => (
        <Card
          key={`${card.suit}-${card.rank}`}
          card={card}
          isPlayable={canPlay}
          isTrump={card.suit === trumpSuit}
          onClick={() => onPlayCard(card)}
        />
      ))}
    </div>
  );
};