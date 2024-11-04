import React from 'react';
import { Card } from './Card';
import { PlayerHand } from './PlayerHand';
import { PlayedCards } from './PlayedCards';
import { GameState, Player, Card as CardType } from '../types';
import { ScoreBoard } from './ScoreBoard';
import { ChatBox } from './ChatBox';
import { BettingPhase } from './BettingPhase';
import { ViewCardsPhase } from './ViewCardsPhase';

interface GameBoardProps {
  gameState: GameState;
  currentPlayer: Player;
  onPlayCard: (card: CardType) => void;
  onPlaceBet: (amount: number) => void;
  onPass: () => void;
  onViewCards: () => void;
  onSelectTrump: (suit: CardType['suit']) => void;
  onSendMessage: (message: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  currentPlayer,
  onPlayCard,
  onPlaceBet,
  onPass,
  onViewCards,
  onSelectTrump,
  onSendMessage
}) => {
  const isPlayerTurn = gameState.currentTurn === currentPlayer.id;

  const renderGamePhase = () => {
    switch (gameState.phase) {
      case 'viewing':
        return (
          <ViewCardsPhase
            cards={currentPlayer.cards}
            onViewCards={onViewCards}
            hasViewedCards={currentPlayer.hasViewedCards || false}
          />
        );
      case 'betting':
        return (
          <BettingPhase
            currentBid={gameState.currentBid}
            currentPlayer={currentPlayer}
            isPlayerTurn={isPlayerTurn}
            onPlaceBet={onPlaceBet}
            onPass={onPass}
            minBid={gameState.currentBid + 5}
          />
        );
      case 'playing':
        return (
          <>
            <div className="bg-green-700 rounded-lg p-4 mb-4">
              <PlayedCards
                currentRound={gameState.currentRound}
                trumpSuit={gameState.trumpSuit}
              />
            </div>
            <div className="bg-green-700 rounded-lg p-4">
              <PlayerHand
                cards={currentPlayer.cards}
                canPlay={isPlayerTurn}
                onPlayCard={onPlayCard}
                trumpSuit={gameState.trumpSuit}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-800 p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {renderGamePhase()}
        </div>
        
        <div className="space-y-4">
          <ScoreBoard
            players={gameState.players}
            scores={gameState.scores}
            currentTurn={gameState.currentTurn}
            winningBid={gameState.winningBid}
            currentBid={gameState.currentBid}
            passedPlayers={gameState.passedPlayers}
          />
          
          <ChatBox
            messages={gameState.messages}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};