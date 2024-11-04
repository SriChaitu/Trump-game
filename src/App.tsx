import React, { useEffect, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameModeSelection } from './components/GameModeSelection';
import { GameState, Player, Card, GameMode } from './types';
import { io, Socket } from 'socket.io-client';
import { createDeck, shuffleDeck } from './utils/gameLogic';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const handleModeSelection = (mode: GameMode) => {
    setGameMode(mode);

    if (mode === 'multiplayer') {
      const newSocket = io('http://localhost:3001');

      newSocket.on('gameState', (state: GameState) => {
        setGameState(state);
      });

      newSocket.on('playerAssigned', (assignedPlayer: Player) => {
        setPlayer(assignedPlayer);
      });

      setSocket(newSocket);
    } else {
      // Initialize single player game with bots
      const deck = createDeck();
      const shuffledDeck = shuffleDeck(deck);

      const botPlayers: Player[] = [
        {
          id: 'bot1',
          name: 'Bot 1',
          cards: shuffledDeck.slice(13, 26),
          bet: 140,
          isBot: true,
          hasViewedCards: true,
        },
        {
          id: 'bot2',
          name: 'Bot 2',
          cards: shuffledDeck.slice(26, 39),
          bet: 140,
          isBot: true,
          hasViewedCards: true,
        },
        {
          id: 'bot3',
          name: 'Bot 3',
          cards: shuffledDeck.slice(39),
          bet: 140,
          isBot: true,
          hasViewedCards: true,
        },
      ];

      const humanPlayer: Player = {
        id: 'player1',
        name: 'Player 1',
        cards: shuffledDeck.slice(0, 13),
        bet: 0,
        hasViewedCards: true,
      };

      const initialGameState: GameState = {
        players: [humanPlayer, ...botPlayers],
        currentTurn: 'player1',
        trumpSuit: null,
        trumpHolder: null,
        currentRound: [],
        playedCards: [],
        scores: {},
        winningBid: 140,
        currentBid: 140,
        lastBidder: 'bot3',
        passedPlayers: ['bot1', 'bot2'],
        winner: null,
        phase: 'viewing',
        messages: [],
        gameMode: 'singleplayer',
      };

      setGameState(initialGameState);
      setPlayer(humanPlayer);
    }
  };

  const handleViewCards = () => {
    if (!gameState || !player) return;

    const updatedPlayer = { ...player, hasViewedCards: true };
    const updatedPlayers = gameState.players.map((p) =>
      p.id === player.id ? updatedPlayer : p
    );

    setPlayer(updatedPlayer);
    setGameState((prevState) => {
      if (!prevState) return null;
      const newState = {
        ...prevState,
        players: updatedPlayers,
        phase: updatedPlayers.every((p) => p.isBot || p.hasViewedCards)
          ? 'betting'
          : prevState.phase,
      };
      return newState;
    });
  };

  const handlePlaceBet = (amount: number) => {
    if (!gameState || !player) return;

    if (gameMode === 'multiplayer') {
      socket?.emit('placeBet', amount);
    } else {
      setGameState((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          currentBid: amount,
          winningBid: amount,
          lastBidder: player.id,
          players: prevState.players.map((p) =>
            p.id === player.id ? { ...p, bet: amount } : p
          ),
          phase: 'trumpSelection',
        };
      });
    }
  };

  const handlePass = () => {
    if (!gameState || !player) return;

    if (gameMode === 'multiplayer') {
      socket?.emit('pass');
    } else {
      setGameState((prevState) => {
        if (!prevState) return null;
        const updatedPassedPlayers = [...prevState.passedPlayers, player.id];

        // If all players except one have passed, move to trump selection
        const phase =
          updatedPassedPlayers.length === 3 ? 'trumpSelection' : 'betting';

        return {
          ...prevState,
          passedPlayers: updatedPassedPlayers,
          phase,
        };
      });
    }
  };

  useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  if (!gameMode) {
    return <GameModeSelection onSelectMode={handleModeSelection} />;
  }

  if (!gameState || !player) {
    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            {gameMode === 'multiplayer'
              ? 'Waiting for players...'
              : 'Initializing game...'}
          </h1>
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <GameBoard
      gameState={gameState}
      currentPlayer={player}
      onPlayCard={() => {}}
      onPlaceBet={handlePlaceBet}
      onPass={handlePass}
      onViewCards={handleViewCards}
      onSelectTrump={() => {}}
      onSendMessage={() => {}}
    />
  );
}

export default App;
