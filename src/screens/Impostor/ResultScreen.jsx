import React from 'react';
import { Trophy, Skull, Crown, RefreshCcw } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const ResultScreen = ({ gameData, players, startImpostorSetup, goHome }) => {
    const isWin = gameData.winner === 'citizens';
    const impostorName = players[gameData.impostorIdx];
    const accusedName = players[gameData.accusedIdx];

    return (
        <div className="flex flex-col h-full p-6 max-w-md mx-auto text-center overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${isWin ? 'bg-emerald-500/20 text-emerald-400 shadow-emerald-900/20' : 'bg-rose-500/20 text-rose-400 shadow-rose-900/20'}`}>{isWin ? <Trophy size={48} /> : <Skull size={48} />}</div>
                <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">{isWin ? 'Citizens Win!' : 'Impostor Wins!'}</h2><p className="text-lg text-slate-400 mb-8">{isWin ? `You correctly identified ${impostorName}!` : `${accusedName} was innocent. The impostor got away.`}</p>
                <Card className="w-full space-y-4 mb-8"><div className="flex items-center justify-between border-b border-slate-800 pb-4"><div className="text-left"><div className="text-xs text-slate-500 uppercase font-bold">The Impostor</div><div className="text-xl font-bold text-white flex items-center gap-2"><Crown size={18} className="text-amber-400" />{impostorName}</div></div><div className="text-right"><div className="text-xs text-slate-500 uppercase font-bold">Secret Word</div><div className="text-xl font-bold text-rose-400">{gameData.impostorWord}</div></div></div><div className="flex items-center justify-between pt-2"><div className="text-left"><div className="text-xs text-slate-500 uppercase font-bold">Citizens</div><div className="text-base text-slate-300">Everyone else</div></div><div className="text-right"><div className="text-xs text-slate-500 uppercase font-bold">Common Word</div><div className="text-xl font-bold text-indigo-400">{gameData.commonWord}</div></div></div></Card>
            </div>
            <div className="mt-auto space-y-3 pb-6"><Button onClick={startImpostorSetup} variant="primary" icon={RefreshCcw}>Play Again</Button><Button onClick={goHome} variant="ghost">Back to Hub</Button></div>
        </div>
    );
};

export default ResultScreen;
