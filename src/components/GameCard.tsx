import React from 'react';
import { Card, StatKey } from '../types';
import { Shield, Zap, Brain, Timer } from 'lucide-react';

interface GameCardProps {
  card: Card;
  isFlipped: boolean;
  onStatClick?: (stat: StatKey) => void;
  highlightStat?: StatKey;
  isWinner?: boolean;
}

const StatIcon = ({ stat }: { stat: StatKey }) => {
  switch (stat) {
    case 'power':
      return <Zap className="w-5 h-5" />;
    case 'speed':
      return <Timer className="w-5 h-5" />;
    case 'intelligence':
      return <Brain className="w-5 h-5" />;
    case 'durability':
      return <Shield className="w-5 h-5" />;
    default:
      return null;
  }
};

export const GameCard: React.FC<GameCardProps> = ({
  card,
  isFlipped,
  onStatClick,
  highlightStat,
  isWinner,
}) => {
  return (
    <div
      className={`relative w-72 h-96 transition-transform duration-700 transform-gpu ${
        isFlipped ? 'rotate-y-180' : ''
      } ${isWinner ? 'scale-105' : ''}`}
    >
      <div className="absolute w-full h-full backface-hidden">
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
          <span className="text-4xl font-bold text-white">TC</span>
        </div>
      </div>
      
      <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${
        isFlipped ? 'visible' : 'invisible'
      }`}>
        <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{card.name}</h3>
            
            <div className="space-y-2">
              {(Object.keys(card.stats) as StatKey[]).map((stat) => (
                <button
                  key={stat}
                  onClick={() => onStatClick?.(stat)}
                  className={`w-full flex items-center justify-between p-2 rounded ${
                    highlightStat === stat
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <StatIcon stat={stat} />
                    <span className="capitalize">{stat}</span>
                  </div>
                  <span className="font-bold">{card.stats[stat]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};