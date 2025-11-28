import React, { useState, useEffect } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, RefreshCcw } from 'lucide-react';
import Button from '../components/Button';
import { NEVER_HAVE_I_EVER } from '../data/neverHaveIEver';

const NeverHaveIEverScreen = ({ goHome }) => {
    const [cards, setCards] = useState([...NEVER_HAVE_I_EVER].sort(() => Math.random() - 0.5));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null); // 'left' or 'right'
    const [animating, setAnimating] = useState(false);

    const handleSwipe = (dir) => {
        if (animating) return;
        setAnimating(true);
        setDirection(dir);

        // Vibration
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setDirection(null);
            setAnimating(false);
        }, 300); // Match animation duration
    };

    const resetGame = () => {
        setCards([...NEVER_HAVE_I_EVER].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
    };

    const currentCard = cards[currentIndex];
    const nextCard = cards[currentIndex + 1];
    const isFinished = currentIndex >= cards.length;

    return (
        <div className="flex flex-col h-full relative bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />

            {/* Header */}
            <div className="relative z-10 p-4 flex justify-between items-center">
                <button
                    onClick={goHome}
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-indigo-400">Never Have I Ever</h1>
                <div className="w-10" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">

                {!isFinished ? (
                    <div className="relative w-full max-w-sm aspect-[3/4]">
                        {/* Next Card (Behind) */}
                        {nextCard && (
                            <div className="absolute inset-0 bg-slate-800 rounded-3xl p-8 flex items-center justify-center shadow-xl transform scale-95 opacity-50 translate-y-4">
                                <p className="text-2xl font-bold text-slate-400 text-center leading-relaxed">
                                    {nextCard}
                                </p>
                            </div>
                        )}

                        {/* Current Card */}
                        <div
                            className={`absolute inset-0 bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ease-out transform ${direction === 'left' ? '-translate-x-[150%] -rotate-12' :
                                    direction === 'right' ? 'translate-x-[150%] rotate-12' :
                                        'translate-x-0 rotate-0'
                                }`}
                        >
                            <div className="mb-8 px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                Statement #{currentIndex + 1}
                            </div>
                            <p className="text-3xl font-bold text-slate-800 text-center leading-relaxed">
                                {currentCard}
                            </p>

                            {/* Overlay Indicators */}
                            {direction === 'right' && (
                                <div className="absolute top-8 right-8 border-4 border-rose-500 text-rose-500 font-black text-2xl px-4 py-2 rounded-xl transform rotate-12 opacity-80">
                                    I HAVE
                                </div>
                            )}
                            {direction === 'left' && (
                                <div className="absolute top-8 left-8 border-4 border-emerald-500 text-emerald-500 font-black text-2xl px-4 py-2 rounded-xl transform -rotate-12 opacity-80">
                                    NEVER
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RefreshCcw size={40} className="text-indigo-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">All Done!</h2>
                        <p className="text-slate-400 mb-8">You've gone through all the cards.</p>
                        <Button onClick={resetGame} variant="primary" icon={RefreshCcw}>
                            Play Again
                        </Button>
                    </div>
                )}

            </div>

            {/* Controls */}
            {!isFinished && (
                <div className="p-6 pb-10 flex gap-4 justify-center relative z-10">
                    <button
                        onClick={() => handleSwipe('left')}
                        disabled={animating}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ThumbsUp size={32} className="text-white" />
                        <span className="font-bold text-white text-sm">I Have Not</span>
                    </button>

                    <button
                        onClick={() => handleSwipe('right')}
                        disabled={animating}
                        className="flex-1 bg-rose-600 hover:bg-rose-500 active:scale-95 transition-all p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-rose-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ThumbsDown size={32} className="text-white" />
                        <span className="font-bold text-white text-sm">I Have 🍺</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default NeverHaveIEverScreen;
