import React from 'react';
import { Player } from '../types';

interface ScoreBoardProps {
  players: Player[];
  scores: Record<string, number>;
  currentTurn: string;
  winningBid: number;
  currentBid: number;
  passedPlayers: string[];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  scores,
  currentTurn,
  winningBid,
  currentBid,
  passedPlayers,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Score Board</h3>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-2 rounded ${
              player.id === currentTurn ? 'bg-yellow-100' : ''
            } ${passedPlayers.includes(player.id) ? 'opacity-50' : ''}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{player.name}</span>
              <span className="text-lg">{scores[player.id] || 0}</span>
            </div>
            {player.bet > 0 && (
              <div className="text-sm text-gray-600">
                Bet: {player.bet}
              </div>
            )}
            {passedPlayers.includes(player.id) && (
              <div className="text-sm text-gray-500">Passed</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="text-center space-y-2">
          <div>
            <span className="font-semibold">Current Bid: </span>
            <span className="text-lg">{currentBid}</span>
          </div>
          {winningBid > 0 && (
            <div>
              <span className="font-semibold">Winning Bid: </span>
              <span className="text-lg">{winningBid}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};