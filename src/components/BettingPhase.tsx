import React, { useState } from 'react';
import { Player } from '../types';

interface BettingPhaseProps {
  currentBid: number;
  currentPlayer: Player;
  isPlayerTurn: boolean;
  onPlaceBet: (amount: number) => void;
  onPass: () => void;
  minBid: number;
}

export const BettingPhase: React.FC<BettingPhaseProps> = ({
  currentBid,
  currentPlayer,
  isPlayerTurn,
  onPlaceBet,
  onPass,
  minBid,
}) => {
  const [bidAmount, setBidAmount] = useState(currentBid + 5);

  const handleBid = () => {
    if (bidAmount >= minBid && bidAmount % 5 === 0) {
      onPlaceBet(bidAmount);
    }
  };

  if (!isPlayerTurn) {
    return (
      <div className="text-center text-white text-lg">
        Waiting for other players to bid...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
      <div className="flex gap-4 items-center">
        <input
          type="number"
          min={currentBid + 5}
          step={5}
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="w-24 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleBid}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Bid
        </button>
        <button
          onClick={onPass}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Pass
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Current highest bid: {currentBid}
      </p>
    </div>
  );
};