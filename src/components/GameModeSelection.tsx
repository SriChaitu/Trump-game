import React from 'react';
import { GameMode } from '../types';
import { Users, Monitor } from 'lucide-react';

interface GameModeSelectionProps {
  onSelectMode: (mode: GameMode) => void;
}

export const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Trump Cards Game</h1>
          <p className="text-green-100 text-lg">Choose your game mode to begin</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectMode('singleplayer')}
            className="bg-white rounded-xl p-8 text-center hover:scale-105 transition-transform duration-200 group"
          >
            <div className="flex justify-center mb-4">
              <Monitor className="w-16 h-16 text-green-700 group-hover:text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Single Player</h2>
            <p className="text-gray-600">
              Play against 3 computer opponents
            </p>
          </button>

          <button
            onClick={() => onSelectMode('multiplayer')}
            className="bg-white rounded-xl p-8 text-center hover:scale-105 transition-transform duration-200 group"
          >
            <div className="flex justify-center mb-4">
              <Users className="w-16 h-16 text-green-700 group-hover:text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Multiplayer</h2>
            <p className="text-gray-600">
              Play online with other players
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};