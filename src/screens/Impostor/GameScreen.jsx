import React from 'react';
import { Users, Info, Skull } from 'lucide-react';
import Button from '../../components/Button';
import Badge from '../../components/Badge';

const GameScreen = ({ setCurrentScreen }) => (
    <div className="flex flex-col h-full p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8"><Badge variant="accent">Discussion Phase</Badge></div>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6"><div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center relative"><div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-75" /><Users size={64} className="text-indigo-400 relative z-10" /></div><div><h2 className="text-3xl font-bold text-white mb-2">Discuss!</h2><p className="text-slate-400 max-w-xs mx-auto">Ask questions. Give hints. Find the liar. <br /><span className="text-sm text-slate-500 mt-2 block italic">(The impostor has a different word)</span></p></div><div className="w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-left text-sm text-slate-400"><div className="flex gap-2 items-start"><Info size={16} className="mt-0.5 shrink-0" /><p>Give a subtle hint about your word. If it's too obvious, the Impostor will guess it. If it's too vague, people will suspect you.</p></div></div></div>
        <div className="mt-auto pt-6"><Button onClick={() => setCurrentScreen('vote')} variant="danger" icon={Skull}>Accuse Someone</Button></div>
    </div>
);

export default GameScreen;
