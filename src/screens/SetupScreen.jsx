import React from 'react';
import { X, Users, Shield, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { CATEGORIES } from '../data/categories';

const SetupScreen = ({
    activeGame,
    players,
    setPlayers,
    category,
    setCategory,
    wwSettings,
    setWwSettings,
    goHome,
    startImpostorGame,
    initWerewolfGame
}) => {
    const addPlayer = () => setPlayers([...players, `Player ${players.length + 1}`]);
    const removePlayer = (idx) => { if (players.length <= 3) return; setPlayers(players.filter((_, i) => i !== idx)); };
    const updateName = (idx, name) => { const newPlayers = [...players]; newPlayers[idx] = name; setPlayers(newPlayers); };

    return (
        <div className="flex flex-col h-full p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-8"><button onClick={goHome} className="p-2 -ml-2 text-slate-400 hover:text-white"><X size={24} /></button><h2 className="text-xl font-bold text-white">{activeGame === 'impostor' ? 'Impostor Setup' : 'Werewolf Setup'}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-6">
                {activeGame === 'impostor' && <section><div className="flex justify-between items-center mb-3"><label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Category</label></div><div className="grid grid-cols-2 gap-3">{CATEGORIES.map(cat => (<button key={cat.id} onClick={() => setCategory(cat.id)} className={`p-3 rounded-xl border text-left transition-all ${category === cat.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}><span className="text-xl mr-2">{cat.icon}</span><span className="font-medium text-sm">{cat.name}</span></button>))}</div></section>}

                {/* Werewolf Role Config */}
                {activeGame === 'werewolf' && (
                    <section className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                        <div className="flex justify-between items-center mb-3"><label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Special Roles</label></div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setWwSettings(p => ({ ...p, doctor: !p.doctor }))}
                                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${wwSettings.doctor ? 'bg-green-900/30 border-green-500 text-green-100' : 'bg-slate-900 border-slate-800 text-slate-500 opacity-70'} ${players.length < 4 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                disabled={players.length < 4}
                            >
                                <span className="font-bold flex items-center gap-2 mb-1"><Shield size={16} /> Doctor</span>
                                <span className="text-xs block opacity-80">Requires 4+ players</span>
                                {wwSettings.doctor && <CheckCircle2 size={16} className="absolute top-2 right-2 text-green-500" />}
                            </button>
                            <button
                                onClick={() => setWwSettings(p => ({ ...p, seer: !p.seer }))}
                                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${wwSettings.seer ? 'bg-purple-900/30 border-purple-500 text-purple-100' : 'bg-slate-900 border-slate-800 text-slate-500 opacity-70'} ${players.length < 5 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                disabled={players.length < 5}
                            >
                                <span className="font-bold flex items-center gap-2 mb-1"><Search size={16} /> Seer (Spy)</span>
                                <span className="text-xs block opacity-80">Requires 5+ players</span>
                                {wwSettings.seer && <CheckCircle2 size={16} className="absolute top-2 right-2 text-purple-500" />}
                            </button>
                        </div>
                    </section>
                )}

                <section><div className="flex justify-between items-center mb-3"><label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Players ({players.length})</label></div><div className="space-y-3">{players.map((p, i) => (<div key={i} className="flex gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300" style={{ animationDelay: `${i * 50}ms` }}><div className="flex-1 relative"><div className="absolute left-3 top-3 text-slate-500"><Users size={18} /></div><Input value={p} onChange={(e) => updateName(i, e.target.value)} className="pl-10" /></div>{players.length > 3 && (<button onClick={() => removePlayer(i)} className="w-12 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-rose-500 hover:border-rose-900 hover:bg-rose-950/30 transition-colors"><X size={18} /></button>)}</div>))}<Button variant="secondary" onClick={addPlayer} className="border-dashed">+ Add Player</Button></div></section>
            </div>
            <div className="pt-6 mt-auto">
                {activeGame === 'impostor' ? <Button onClick={startImpostorGame} icon={ArrowRight}>Start Impostor</Button> : <Button onClick={initWerewolfGame} variant="wolf" icon={ArrowRight}>Start Werewolf</Button>}
            </div>
        </div>
    );
};

export default SetupScreen;
