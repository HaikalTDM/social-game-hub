import React, { useState } from 'react';
import { EyeOff, Lightbulb } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Card from '../../components/Card';

const RevealScreen = ({ players, gameData, setGameData, setCurrentScreen }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const currentPlayer = players[gameData.revealIdx];
    const myWord = gameData.revealIdx === gameData.impostorIdx ? gameData.impostorWord : gameData.commonWord;
    const isImpostorRole = gameData.revealIdx === gameData.impostorIdx;

    const handleNext = () => {
        setIsRevealed(false);
        if (gameData.revealIdx + 1 >= players.length) {
            setCurrentScreen('game');
        } else {
            setGameData(prev => ({ ...prev, revealIdx: prev.revealIdx + 1 }));
        }
    };

    return (
        <div className="flex flex-col h-full p-6 items-center justify-center max-w-md mx-auto text-center">
            <div className="mb-8"><Badge variant="accent">Step {gameData.revealIdx + 1} of {players.length}</Badge></div>
            <h2 className="text-2xl font-light text-slate-300 mb-2">Pass the phone to</h2><h1 className="text-4xl font-bold text-white mb-12 animate-in zoom-in duration-300 key={currentPlayer}">{currentPlayer}</h1>
            <Card className="w-full aspect-[4/3] flex flex-col items-center justify-center mb-8 relative overflow-hidden group">
                {!isRevealed ? (<div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 z-10 transition-all"><div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-400 group-hover:scale-110 transition-transform"><EyeOff size={40} /></div><p className="text-slate-400 font-medium">Tap to reveal your secret word</p></div>) : (<div className="flex flex-col items-center animate-in zoom-in duration-300"><span className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-4">Your Secret Word</span><span className={`text-4xl font-bold ${isImpostorRole ? 'text-rose-400' : 'text-indigo-400'}`}>{myWord}</span><div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700"><Lightbulb size={14} className="text-amber-400" /><span className="text-xs text-slate-300">Hint: {gameData.hint}</span></div>{isImpostorRole ? (<div className="mt-4 px-3 py-1 bg-rose-950/50 border border-rose-900 rounded-lg text-rose-400 text-xs">You are the Impostor! Blend in.</div>) : (<div className="mt-4 px-3 py-1 bg-indigo-950/50 border border-indigo-900 rounded-lg text-indigo-400 text-xs">Find the Impostor.</div>)}</div>)}
                {!isRevealed && (<button className="absolute inset-0 w-full h-full cursor-pointer z-20" onClick={() => setIsRevealed(true)} />)}
            </Card>
            <div className="w-full mt-auto">{isRevealed ? (<Button onClick={handleNext} variant="primary">Got it, Next Player</Button>) : (<Button disabled variant="secondary" className="opacity-0">Hidden</Button>)}</div>
        </div>
    );
};

export default RevealScreen;
