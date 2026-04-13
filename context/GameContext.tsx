import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TokenType = {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'player' | 'enemy';
};

type GameContextType = {
  campaignName: string;
  currentTurn: string;
  tokens: TokenType[];
  selectedTokenId: string;
  changeLog: string[];
  resultText: string;
  selectToken: (id: string) => void;
  moveToken: (id: string, x: number, y: number) => void;
  setResultText: (text: string) => void;
  addLogEntry: (entry: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [campaignName] = useState('Shadow Keep');
  const [currentTurn] = useState('Aric');
  const [selectedTokenId, setSelectedTokenId] = useState('aric');
  const [resultText, setResultText] = useState(
    'You strike the goblin and force it backward.'
  );

  const [tokens, setTokens] = useState<TokenType[]>([
    { id: 'aric', label: 'A', x: 60, y: 60, type: 'player' },
    { id: 'lira', label: 'L', x: 150, y: 160, type: 'player' },
    { id: 'goblin', label: 'G', x: 250, y: 90, type: 'enemy' },
  ]);

  const [changeLog, setChangeLog] = useState<string[]>([
    'Aric entered the room',
    'Goblin revealed near pillar',
    'Lira moved behind cover',
    'Turn changed to Aric',
  ]);

  const selectToken = (id: string) => {
    setSelectedTokenId(id);
  };

  const moveToken = (id: string, x: number, y: number) => {
    setTokens((prev) =>
      prev.map((token) => (token.id === id ? { ...token, x, y } : token))
    );

    const movedToken = tokens.find((token) => token.id === id);
    if (movedToken) {
      setChangeLog((prev) => [
        `${movedToken.label} moved on the map`,
        ...prev,
      ]);
    }
  };

  const addLogEntry = (entry: string) => {
    setChangeLog((prev) => [entry, ...prev]);
  };

  return (
    <GameContext.Provider
      value={{
        campaignName,
        currentTurn,
        tokens,
        selectedTokenId,
        changeLog,
        resultText,
        selectToken,
        moveToken,
        setResultText,
        addLogEntry,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside a GameProvider');
  }
  return context;
}