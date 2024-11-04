import { Card, Suit, Rank } from '../types';

export const CARD_VALUES: Record<Rank, number> = {
  'A': 10, 'K': 10, 'Q': 10, 'J': 10, '10': 10,
  '9': 0, '8': 0, '7': 0, '6': 0, '5': 5,
  '4': 0, '3': 0, '2': 0
};

export const SPECIAL_CARDS = {
  'spades': { '3': 30 }
};

export const CARD_HIERARCHY: Record<Rank, number> = {
  'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
  '9': 9, '8': 8, '7': 7, '6': 6, '5': 5,
  '4': 4, '3': 3, '2': 2
};

export function calculateRoundWinner(
  cards: Card[],
  trumpSuit: Suit | null,
  leadSuit: Suit
): number {
  let highestValue = -1;
  let winnerIndex = 0;

  cards.forEach((card, index) => {
    let cardValue = CARD_HIERARCHY[card.rank];
    
    if (card.suit === trumpSuit) {
      cardValue += 100; // Ensure trump cards always win over non-trump
    } else if (card.suit !== leadSuit) {
      cardValue = -1; // Cards of different suits (non-trump) can't win
    }

    if (cardValue > highestValue) {
      highestValue = cardValue;
      winnerIndex = index;
    }
  });

  return winnerIndex;
}

export function calculatePoints(cards: Card[]): number {
  return cards.reduce((total, card) => {
    let points = CARD_VALUES[card.rank];
    if (card.suit === 'spades' && card.rank === '3') {
      points = SPECIAL_CARDS.spades['3'];
    }
    return total + points;
  }, 0);
}

export function createDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = [
    'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'
  ];
  
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getPlayedCardsBySuit(playedCards: Card[]): Record<Suit, number> {
  return playedCards.reduce((acc, card) => {
    acc[card.suit]++;
    return acc;
  }, { hearts: 0, diamonds: 0, clubs: 0, spades: 0 });
}