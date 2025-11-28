import React, { useState, useRef } from 'react';
import { ArrowLeft, RefreshCw, Zap } from 'lucide-react';
import Button from '../components/Button';
import { SPIN_CHALLENGES } from '../data/spinBottle';

const SpinBottleScreen = ({ goHome }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const [showChallenge, setShowChallenge] = useState(false);

    const spinBottle = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowChallenge(false);

        // Random rotation between 720 and 1440 degrees (2 to 4 full spins) + random angle
        const newRotation = rotation + 720 + Math.random() * 720;
        setRotation(newRotation);

        // Vibration effect
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

        setTimeout(() => {
            setIsSpinning(false);
            const randomChallenge = SPIN_CHALLENGES[Math.floor(Math.random() * SPIN_CHALLENGES.length)];
            setChallenge(randomChallenge);
            setShowChallenge(true);
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        }, 3000); // Match transition duration
    };

    return (
        <div className="flex flex-col h-full relative bg-slate-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />

            {/* Header */}
            <div className="relative z-10 p-4 flex justify-between items-center">
                <button
                    onClick={goHome}
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-emerald-400">Spin the Bottle</h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">

                {/* Bottle Container */}
                <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                    {/* Center Indicator */}
                    <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                    {/* The Bottle */}
                    <img
                        src="/bottle.png"
                        alt="Bottle"
                        className="w-full h-full object-contain transition-transform duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1) mix-blend-screen"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />

                    {/* Direction Arrows (Decorative) */}
                    <div className="absolute inset-0 border-4 border-slate-800/50 rounded-full pointer-events-none" />
                </div>

                {/* Controls / Challenge Display */}
                <div className="w-full max-w-md px-6 text-center h-48 flex flex-col items-center justify-center">
                    {!showChallenge ? (
                        <div className={`transition-opacity duration-500 ${isSpinning ? 'opacity-50' : 'opacity-100'}`}>
                            <p className="text-slate-400 mb-6 text-lg">
                                {isSpinning ? "Spinning..." : "Tap to spin!"}
                            </p>
                            <Button
                                onClick={spinBottle}
                                variant="primary"
                                className="w-48"
                                disabled={isSpinning}
                                icon={RefreshCw}
                            >
                                Spin
                            </Button>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in duration-300 w-full">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${challenge.type === 'truth' ? 'bg-blue-500/20 text-blue-300' : 'bg-rose-500/20 text-rose-300'
                                }`}>
                                {challenge.type}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                                {challenge.text}
                            </h3>
                            <Button
                                onClick={spinBottle}
                                variant="primary"
                                className="w-48"
                                icon={RefreshCw}
                            >
                                Spin Again
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SpinBottleScreen;
