export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type GameMode = 'singleplayer' | 'multiplayer';
export type GamePhase = 'dealing' | 'viewing' | 'betting' | 'trumpSelection' | 'playing' | 'finished';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Player {
  id: string;
  name: string;
  cards: Card[];
  bet: number;
  isBot?: boolean;
  hasViewedCards?: boolean;
}

export interface GameState {
  players: Player[];
  currentTurn: string;
  trumpSuit: Suit | null;
  trumpHolder: string | null;
  currentRound: Card[];
  playedCards: Card[];
  scores: Record<string, number>;
  winningBid: number;
  currentBid: number;
  lastBidder: string | null;
  passedPlayers: string[];
  winner: string | null;
  phase: GamePhase;
  messages: ChatMessage[];
  gameMode: GameMode;
}

export interface ChatMessage {
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}