import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const ALL_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];

const DIFFICULTY_LEVELS = {
    Easy: { pairCount: 4, gridClass: 'easy' },
    Medium: { pairCount: 8, gridClass: 'medium' },
    Hard: { pairCount: 12, gridClass: 'hard' },
};
type Difficulty = keyof typeof DIFFICULTY_LEVELS;


interface Card {
    id: number;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const generateCards = (pairCount: number): Card[] => {
    const symbols = shuffleArray(ALL_SYMBOLS).slice(0, pairCount);
    const pairedSymbols = [...symbols, ...symbols];
    const shuffledSymbols = shuffleArray(pairedSymbols);
    return shuffledSymbols.map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
    }));
};

const App: React.FC = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [bestTime, setBestTime] = useState<number | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    
    const currentConfig = useMemo(() => DIFFICULTY_LEVELS[difficulty], [difficulty]);

    const startGame = useCallback((level: Difficulty) => {
        setDifficulty(level);
        const config = DIFFICULTY_LEVELS[level];
        setCards(generateCards(config.pairCount));
        setFlippedCards([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
        setIsChecking(false);
        setIsGameOver(false);
        const storedBestTime = localStorage.getItem(`bestTime_${level}`);
        setBestTime(storedBestTime ? parseInt(storedBestTime, 10) : null);
    }, []);
    
    useEffect(() => {
        startGame(difficulty);
    }, []); // Only run once on mount

    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;
        if (gameStarted && !isGameOver) {
            timerId = setInterval(() => {
                setTime((prevTime: number) => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [gameStarted, isGameOver]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            setMoves((prevMoves: number) => prevMoves + 1);
            const [firstCard, secondCard] = flippedCards;
            
            if (firstCard.symbol === secondCard.symbol) {
                setCards((prevCards: Card[]) =>
                    prevCards.map((card: Card) =>
                        card.id === firstCard.id || card.id === secondCard.id
                            ? { ...card, isMatched: true, isFlipped: true }
                            : card
                    )
                );
                setFlippedCards([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setCards((prevCards: Card[]) =>
                        prevCards.map((card: Card) =>
                            !card.isMatched ? { ...card, isFlipped: false } : card
                        )
                    );
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flippedCards]);

    useEffect(() => {
        if (cards.length > 0 && cards.every((card: Card) => card.isMatched)) {
            setIsGameOver(true);
            setGameStarted(false); // Stop timer
            if (bestTime === null || time < bestTime) {
                setBestTime(time);
                localStorage.setItem(`bestTime_${difficulty}`, time.toString());
            }
        }
    }, [cards, time, bestTime, difficulty]);


    const handleCardClick = (clickedCard: Card) => {
        if (isChecking || clickedCard.isFlipped || flippedCards.length === 2) {
            return;
        }
        
        if (!gameStarted) {
            setGameStarted(true);
        }

        setCards((prevCards: Card[]) =>
            prevCards.map((card: Card) =>
                card.id === clickedCard.id ? { ...card, isFlipped: true } : card
            )
        );
        setFlippedCards((prev: Card[]) => [...prev, { ...clickedCard, isFlipped: true }]);
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <>
            <h1 className="game-title">Memory Matrix</h1>
            
            <div className="controls-panel">
                <div className="difficulty-selector">
                    {(Object.keys(DIFFICULTY_LEVELS) as Difficulty[]).map(level => (
                        <button 
                            key={level} 
                            onClick={() => startGame(level)} 
                            className={`difficulty-button ${difficulty === level ? 'active' : ''}`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div className="stats-and-restart">
                    <div className="stats">
                        <div className="stat-box">
                            <div className="label">Moves</div>
                            <div className="value" aria-live="polite">{moves}</div>
                        </div>
                        <div className="stat-box">
                            <div className="label">Time</div>
                            <div className="value" aria-live="polite">{formatTime(time)}</div>
                        </div>
                        <div className="stat-box">
                            <div className="label">Best Time</div>
                            <div className="value">{bestTime !== null ? formatTime(bestTime) : '--:--'}</div>
                        </div>
                    </div>
                    <button className="restart-button" onClick={() => startGame(difficulty)}>Restart</button>
                </div>
            </div>

            <main className={`game-board ${currentConfig.gridClass}`}>
                {cards.map((card: Card) => (
                    <div
                        key={card.id}
                        className={`card ${card.isFlipped ? 'is-flipped' : ''} ${card.isMatched ? 'is-matched' : ''}`}
                        onClick={() => handleCardClick(card)}
                        role="button"
                        aria-pressed={card.isFlipped}
                        aria-label={`Card ${card.id + 1}`}
                    >
                        <div className="card-face card-back">?</div>
                        <div className="card-face card-front">{card.symbol}</div>
                    </div>
                ))}
            </main>
            
            {isGameOver && (
                <div className="game-over-modal" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
                    <div className="game-over-content">
                        <h2 id="game-over-title" className="game-over-title">Congratulations!</h2>
                        <p className="game-over-text">You won in {moves} moves and {formatTime(time)}.</p>
                        <button className="restart-button" onClick={() => startGame(difficulty)}>Play Again</button>
                    </div>
                </div>
            )}
        </>
    );
};

const container = document.getElementById('root');
if(container) {
    const root = createRoot(container);
    root.render(<App />);
}