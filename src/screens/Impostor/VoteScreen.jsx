import React from 'react';
import { Skull } from 'lucide-react';
import Button from '../../components/Button';

const VoteScreen = ({ players, handleVote, setCurrentScreen }) => (
    <div className="flex flex-col h-full p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Who is the Impostor?</h2><p className="text-slate-400 text-center mb-8">Tap a player to cast your vote.</p>
        <div className="grid grid-cols-1 gap-3 overflow-y-auto">{players.map((p, i) => (<button key={i} onClick={() => handleVote(i)} className="group relative flex items-center p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-indigo-500 transition-all text-left"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors"><span className="font-bold text-slate-300 group-hover:text-white">{p.charAt(0)}</span></div><span className="text-lg font-medium text-slate-200">{p}</span><div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400"><Skull /></div></button>))}</div>
        <div className="mt-auto pt-4"><Button variant="ghost" onClick={() => setCurrentScreen('game')}>Back to discussion</Button></div>
    </div>
);

export default VoteScreen;
