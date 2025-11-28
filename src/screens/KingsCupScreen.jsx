import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, RefreshCw } from 'lucide-react';

import Button from '../components/Button';
import { KINGS_CUP_RULES, SUITS, VALUES } from '../data/kingsCup';

const KingsCupScreen = ({ goHome }) => {
    const [deck, setDeck] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [kingsCount, setKingsCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Animation State
    const [animatingCard, setAnimatingCard] = useState(null); // { card, x, y, angle }
    const [animationPhase, setAnimationPhase] = useState('idle'); // idle, moving, flipping, revealed

    // Initialize Deck
    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newDeck = [];
        SUITS.forEach(suit => {
            VALUES.forEach(value => {
                newDeck.push({ suit, value, id: `${value}${suit}` });
            });
        });
        // Shuffle
        setDeck(newDeck.sort(() => Math.random() - 0.5));
        setDrawnCards([]);
        setKingsCount(0);
        setGameOver(false);
        setAnimatingCard(null);
        setAnimationPhase('idle');
    };

    const drawCard = (index, x, y, angle) => {
        if (gameOver || animationPhase !== 'idle') return;

        const card = deck[index];

        // 1. Start Animation: Set the card to animate
        setAnimatingCard({ ...card, index, startX: x, startY: y, startAngle: angle });
        setDrawnCards(prev => [...prev, index]);
        setAnimationPhase('moving');

        // Vibration
        if (navigator.vibrate) navigator.vibrate(50);

        // 2. Move to Center (after brief delay to ensure render)
        setTimeout(() => {
            setAnimationPhase('flipping');
        }, 100);

        // 3. Flip Card
        setTimeout(() => {
            setAnimationPhase('revealed');

            // Check for King
            if (card.value === 'K') {
                const newCount = kingsCount + 1;
                setKingsCount(newCount);
                if (newCount === 4) {
                    setTimeout(() => setGameOver(true), 1000);
                }
            }
        }, 600); // Wait for move to finish (500ms)
    };

    const closeRule = () => {
        if (!gameOver) {
            setAnimatingCard(null);
            setAnimationPhase('idle');
        }
    };

    const rule = animatingCard ? KINGS_CUP_RULES[animatingCard.value] : null;

    return (
        <div className="flex flex-col h-full relative bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />

            {/* Header */}
            <div className="relative z-10 p-4 flex justify-between items-center">
                <button
                    onClick={goHome}
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-amber-500">King's Cup</h1>
                <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
                    <Crown size={16} className="text-amber-400" />
                    <span className="text-amber-100 font-bold">{kingsCount}/4</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-0">

                {/* Card Circle */}
                <div className="relative w-[300px] h-[300px] flex items-center justify-center perspective-1000">
                    {/* Central Cup */}
                    <div className="absolute z-10 w-24 h-32 bg-gradient-to-b from-amber-300 to-amber-600 rounded-b-xl opacity-80 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <Crown size={40} className="text-amber-900 opacity-50" />
                    </div>

                    {/* Deck Cards */}
                    {deck.map((card, index) => {
                        const isDrawn = drawnCards.includes(index);
                        const isAnimating = animatingCard?.index === index;

                        // Don't render if drawn (unless it's the one currently animating, handled separately)
                        if (isDrawn && !isAnimating) return null;
                        if (isAnimating) return null; // Rendered by the animation layer

                        const angle = (index / deck.length) * 360;
                        const radius = 140;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <div
                                key={card.id}
                                onClick={() => drawCard(index, x, y, angle + 90)}
                                className="absolute w-10 h-14 bg-slate-200 rounded-md border-2 border-slate-300 cursor-pointer hover:scale-110 transition-transform shadow-md"
                                style={{
                                    transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    border: '1px solid #334155'
                                }}
                            >
                                <div className="w-full h-full flex items-center justify-center opacity-30">
                                    <div className="w-6 h-8 border-2 border-slate-600 rounded-sm" />
                                </div>
                            </div>
                        );
                    })}

                    {/* Animating Card Layer */}
                    {animatingCard && (
                        <div
                            className="absolute w-10 h-14 z-50 transition-all duration-500 ease-in-out"
                            style={{
                                transform: animationPhase === 'moving'
                                    ? `translate(${animatingCard.startX}px, ${animatingCard.startY}px) rotate(${animatingCard.startAngle}deg)`
                                    : `translate(0px, 0px) rotate(0deg) scale(5)`, // Move to center and scale up
                                width: '40px',
                                height: '56px',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {/* Card Back */}
                            <div className="absolute inset-0 backface-hidden rounded-md border-2 border-slate-300 bg-slate-800"
                                style={{
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    border: '1px solid #334155',
                                    backfaceVisibility: 'hidden',
                                    transform: animationPhase === 'flipping' || animationPhase === 'revealed' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                <div className="w-full h-full flex items-center justify-center opacity-30">
                                    <div className="w-6 h-8 border-2 border-slate-600 rounded-sm" />
                                </div>
                            </div>

                            {/* Card Front */}
                            <div className="absolute inset-0 backface-hidden rounded-md bg-white flex flex-col items-center justify-center shadow-xl"
                                style={{
                                    transform: animationPhase === 'flipping' || animationPhase === 'revealed' ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                                    backfaceVisibility: 'hidden',
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                <span className={`text-[10px] font-black ${['♥️', '♦️'].includes(animatingCard.suit) ? 'text-red-600' : 'text-slate-900'}`}>
                                    {animatingCard.value}
                                </span>
                                <span className="text-[8px]">{animatingCard.suit}</span>
                            </div>
                        </div>
                    )}

                    {/* The actual flipped card shown in the modal is separate, or we can reuse the animating card. 
                        For simplicity, let's keep the animating card as the visual during transition, 
                        and then overlay the big modal content. 
                    */}
                </div>

                {/* Rule Overlay */}
                {(animationPhase === 'revealed' || gameOver) && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                        <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">

                            {gameOver ? (
                                <>
                                    <div className="absolute inset-0 bg-amber-500/10 animate-pulse-slow" />
                                    <Crown size={64} className="text-amber-500 mb-6 animate-bounce" />
                                    <h2 className="text-4xl font-black text-white mb-2">GAME OVER</h2>
                                    <p className="text-xl text-amber-200 mb-8">The 4th King has been drawn! Drink the cup! 🍺</p>
                                    <Button onClick={initializeGame} variant="primary" icon={RefreshCw}>New Game</Button>
                                </>
                            ) : (
                                <>
                                    {/* Big Card Display */}
                                    <div className="w-32 h-48 bg-white rounded-xl mb-6 flex flex-col items-center justify-center shadow-xl transform rotate-3 relative animate-in zoom-in duration-300">
                                        <span className={`text-6xl font-black ${['♥️', '♦️'].includes(animatingCard.suit) ? 'text-red-600' : 'text-slate-900'}`}>
                                            {animatingCard.value}
                                        </span>
                                        <span className="text-4xl mt-2">{animatingCard.suit}</span>
                                        <div className="absolute top-2 left-2 text-lg font-bold text-slate-400">{animatingCard.value}</div>
                                        <div className="absolute bottom-2 right-2 text-lg font-bold text-slate-400 transform rotate-180">{animatingCard.value}</div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2">{rule.title}</h3>
                                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">{rule.description}</p>

                                    <Button onClick={closeRule} variant="primary" className="w-full">Continue</Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>

            {!animatingCard && !gameOver && (
                <div className="p-6 text-center text-slate-500 text-sm animate-pulse">
                    Tap a card to draw
                </div>
            )}

            {/* CSS for 3D Flip */}
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            `}</style>
        </div>
    );
};

export default KingsCupScreen;
