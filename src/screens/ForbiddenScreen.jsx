import React from 'react';
import { X, HelpCircle, Ban, Timer, ThumbsDown, ThumbsUp, Trophy, RefreshCcw } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const ForbiddenScreen = ({
    fbState,
    setFbState,
    fbCurrentCard,
    fbScore,
    setFbScore,
    fbTimeLeft,
    setFbTimeLeft,
    fbShowHelp,
    setFbShowHelp,
    startForbiddenRound,
    nextForbiddenCard,
    handleForbiddenAction,
    goHome
}) => {
    return (
        <div className="flex flex-col h-full relative bg-rose-950 transition-colors duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(159,18,57,0.2)_0%,rgba(15,23,42,1)_100%)] z-0 pointer-events-none" />
            {fbShowHelp && (<div className="absolute inset-0 z-[20000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setFbShowHelp(false)}><div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-white flex items-center gap-2"><HelpCircle size={20} /> How to Play</h3><button onClick={() => setFbShowHelp(false)} className="p-1 bg-slate-800 rounded-full text-slate-400 hover:text-white"><X size={20} /></button></div><div className="space-y-4 text-slate-300 text-sm"><p>1. <strong>Goal:</strong> Describe the main word to your team so they guess it.</p><div className="p-4 bg-rose-900/20 border border-rose-500/20 rounded-xl"><p className="font-bold text-white mb-1">🚫 The Catch</p><p>You CANNOT say the words in the forbidden list below!</p></div><p>2. <strong>Scoring:</strong></p><ul className="space-y-2"><li className="flex items-center gap-2"><ThumbsUp size={16} className="text-emerald-400" /> Tap Correct if they guess it.</li><li className="flex items-center gap-2"><ThumbsDown size={16} className="text-rose-400" /> Tap Skip if you say a forbidden word or pass.</li></ul><Button onClick={() => setFbShowHelp(false)} variant="primary">Got it!</Button></div></div></div>)}
            <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20" style={{ zIndex: 10000 }}><button onClick={goHome} className="p-2 bg-black/20 rounded-full text-white/50 hover:text-white backdrop-blur-sm"><X size={24} /></button><Badge variant="forbidden">Forbidden Words</Badge><button onClick={() => setFbShowHelp(true)} className="p-2 bg-rose-500/20 border border-rose-500/50 rounded-full text-rose-200 hover:bg-rose-500 hover:text-white backdrop-blur-sm transition-colors"><HelpCircle size={24} /></button></div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative">
                {fbState === 'setup' && (<div className="max-w-xs space-y-6"><div className="w-32 h-32 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-500/30"><Ban size={64} className="text-rose-500" /></div><div><h2 className="text-3xl font-bold text-white mb-2">Forbidden Words</h2><p className="text-slate-400">Describe the word to your team without using any of the forbidden words listed below!</p></div><div className="flex gap-2 justify-center items-center p-3 bg-slate-900/50 rounded-xl"><Timer size={20} className="text-slate-400" /><span className="text-white font-bold">60 Seconds</span></div><Button onClick={startForbiddenRound} variant="forbidden" icon={Zap}>Start Game</Button></div>)}
                {fbState === 'playing' && fbCurrentCard && (<div className="w-full max-w-md flex flex-col h-full pb-4"><div className="flex justify-between items-center mb-6 mt-12"><div className="text-center"><span className="block text-xs text-rose-300/60 uppercase tracking-widest font-bold">Time</span><span className={`text-3xl font-black ${fbTimeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{fbTimeLeft}</span></div><div className="text-center"><span className="block text-xs text-rose-300/60 uppercase tracking-widest font-bold">Score</span><span className="text-3xl font-black text-white">{fbScore}</span></div></div><div className="flex-1 bg-white rounded-3xl shadow-2xl shadow-rose-900/20 overflow-hidden relative border-4 border-slate-200 flex flex-col mb-6 animate-in slide-in-from-bottom-4 duration-300"><div className="bg-slate-100 p-6 border-b border-slate-200"><div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Describe this</div><h2 className="text-4xl font-black text-slate-800 leading-none">{fbCurrentCard.word}</h2></div><div className="flex-1 p-6 flex flex-col justify-center relative bg-rose-50"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" /><div className="text-xs text-rose-400 uppercase tracking-widest font-bold mb-4 flex items-center justify-center gap-2"><Ban size={14} /> Forbidden Words</div><div className="space-y-3">{fbCurrentCard.forbidden.map((word, i) => (<div key={i} className="text-xl font-bold text-rose-600 bg-white/60 py-2 rounded-lg shadow-sm border border-rose-100">{word}</div>))}</div></div></div><div className="grid grid-cols-2 gap-4 h-24"><button onClick={() => handleForbiddenAction(0)} className="bg-slate-800 hover:bg-slate-700 rounded-2xl flex flex-col items-center justify-center text-rose-400 hover:text-white transition-colors active:scale-95"><ThumbsDown size={32} className="mb-1" /><span className="font-bold text-sm">SKIP / TABOO</span></button><button onClick={() => handleForbiddenAction(1)} className="bg-emerald-600 hover:bg-emerald-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-emerald-900/30 transition-colors active:scale-95"><ThumbsUp size={32} className="mb-1" /><span className="font-bold text-sm">CORRECT</span></button></div></div>)}
                {fbState === 'finished' && (<div className="animate-in zoom-in duration-300"><div className="w-32 h-32 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-rose-500/30"><Trophy size={64} className="text-rose-400" /></div><h2 className="text-5xl font-black text-white mb-2">Time's Up!</h2><div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8 inline-block min-w-[200px]"><span className="block text-slate-400 text-sm uppercase tracking-widest mb-1">Final Score</span><span className="text-6xl font-black text-white">{fbScore}</span></div><div className="space-y-3"><Button onClick={startForbiddenRound} variant="forbidden" icon={RefreshCcw}>Play Again</Button><Button onClick={goHome} variant="ghost">Back to Hub</Button></div></div>)}
            </div>
        </div>
    );
};

export default ForbiddenScreen;
