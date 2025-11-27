import React, { useRef } from 'react';
import { X, Bomb, Zap, RefreshCcw } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const TickTockScreen = ({
    ttState,
    setTtState,
    ttPrompt,
    setTtPrompt,
    ttHeat,
    setTtHeat,
    ttPassFeedback,
    setTtPassFeedback,
    ttFeedbackKey,
    setTtFeedbackKey,
    startTickTockRound,
    nextTickTockPrompt,
    goHome
}) => {
    const getPulseClass = () => { if (ttHeat > 85) return 'animate-pulse-hyper'; if (ttHeat > 50) return 'animate-pulse-fast'; return 'animate-pulse-slow'; };

    return (
        <div className={`flex flex-col h-full relative transition-colors duration-500 overflow-hidden ${ttState === 'exploded' ? 'bg-red-600' : 'bg-slate-950'}`}>
            {ttState === 'playing' && (<div className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(15, 23, 42, 1) 80%)', opacity: (ttHeat / 120) + 0.1 }} />)}
            <div className={`absolute inset-0 bg-white/30 pointer-events-none transition-opacity duration-200 ${ttPassFeedback ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 9998 }} />
            <div className="absolute top-0 w-full p-4 flex justify-between items-center" style={{ zIndex: 10000 }}><button onClick={goHome} className="p-2 bg-black/20 rounded-full text-white/50 hover:text-white backdrop-blur-sm"><X size={24} /></button><Badge variant="bomb">Tick Tock</Badge><div className="w-10" /></div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative">
                {ttState === 'setup' && (<div className="max-w-xs space-y-6"><div className="w-32 h-32 bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/30"><Bomb size={64} className="text-amber-500" /></div><div><h2 className="text-3xl font-bold text-white mb-2">Tick Tock</h2><p className="text-slate-400">A hidden timer is set (20-45s). Answer the prompt, tap PASS, and hand the phone to the next player. Don't let it explode on you!</p></div><Button onClick={startTickTockRound} variant="bomb" icon={Zap}>Start Round</Button></div>)}
                {ttState === 'playing' && (<div className="w-full max-w-md space-y-12 animate-in zoom-in duration-300 relative">{ttPassFeedback && (<div key={ttFeedbackKey} className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-32" style={{ zIndex: 9999 }}><span className="text-6xl font-black text-emerald-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-bounce-in tracking-tighter italic transform -rotate-6">PASSED!</span></div>)}<div className={`absolute -top-16 left-0 right-0 text-amber-500/20 font-black text-6xl select-none pointer-events-none ${getPulseClass()}`}>TICK... TOCK...</div><div className="space-y-2 relative z-10"><div className="text-amber-200/80 font-mono text-sm uppercase tracking-widest">Current Category</div><h2 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-xl">{ttPrompt}</h2></div><div className="p-8"><button onClick={() => nextTickTockPrompt(true)} className={`w-48 h-48 rounded-full bg-amber-500 text-amber-950 font-black text-2xl shadow-lg shadow-amber-500/50 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center mx-auto ring-4 ring-amber-400/30 ${getPulseClass()}`}>PASS</button><p className="mt-6 text-white/50 text-sm font-medium">Tap & Hand Over!</p></div></div>)}
                {ttState === 'exploded' && (<div className="animate-in zoom-in duration-75"><div className="text-[8rem] mb-4">💥</div><h2 className="text-5xl font-black text-white mb-2 uppercase">Boom!</h2><p className="text-xl text-white/80 font-medium mb-12">Time's Up!</p><Button onClick={startTickTockRound} variant="secondary" className="bg-white !text-red-600 hover:bg-red-50" icon={RefreshCcw}>Play Again</Button></div>)}
            </div>
        </div>
    );
};

export default TickTockScreen;
