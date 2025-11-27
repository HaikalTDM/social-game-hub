import React from 'react';
import { Gamepad2, Menu, Play } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const HubScreen = ({
    startImpostorSetup,
    startMLT,
    startTickTock,
    startForbidden,
    startWerewolf,
    openSettings
}) => {
    return (
        <div className="flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-rose-600/10 rounded-full blur-[80px]" />

            <header className="pt-8 pb-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                            <Gamepad2 className="text-white" size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">GameHub</h1>
                    </div>
                    <button onClick={openSettings} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                        <Menu size={20} />
                    </button>
                </div>
                <h2 className="text-3xl font-light text-slate-200">
                    What are we <br />
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                        playing today?
                    </span>
                </h2>
            </header>

            <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-4">

                <div onClick={startImpostorSetup} className="group relative h-64 w-full bg-slate-800 rounded-3xl overflow-hidden cursor-pointer border border-slate-700 active:scale-[0.98] transition-all shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-40"><div className="absolute top-4 right-4 text-[8rem]">🕵️</div></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="accent">Logic</Badge><Badge>3+ Players</Badge></div>
                        <h3 className="text-3xl font-bold text-white mb-1">Impostor</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">Find the liar before they figure out the secret word.</p>
                        <Button variant="primary" icon={Play}>Play Now</Button>
                    </div>
                </div>

                <div onClick={startMLT} className="group relative h-64 w-full bg-slate-800 rounded-3xl overflow-hidden cursor-pointer border border-slate-700 active:scale-[0.98] transition-all shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-950 via-slate-900/60 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-30"><div className="absolute top-8 right-2 text-[7rem] rotate-12">👉</div></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="mlt">Party</Badge><Badge>2+ Players</Badge></div>
                        <h3 className="text-3xl font-bold text-white mb-1">Most Likely To</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">The game of judging your friends.</p>
                        <Button variant="mlt" icon={Play}>Play Now</Button>
                    </div>
                </div>

                <div onClick={startTickTock} className="group relative h-64 w-full bg-slate-800 rounded-3xl overflow-hidden cursor-pointer border border-slate-700 active:scale-[0.98] transition-all shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-slate-900/60 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-30"><div className="absolute top-8 right-2 text-[7rem] -rotate-12">💣</div></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="bomb">Speed</Badge><Badge>2+ Players</Badge></div>
                        <h3 className="text-3xl font-bold text-white mb-1">Tick Tock</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">Pass the bomb before it explodes!</p>
                        <Button variant="bomb" icon={Play}>Play Now</Button>
                    </div>
                </div>

                <div onClick={startForbidden} className="group relative h-64 w-full bg-slate-800 rounded-3xl overflow-hidden cursor-pointer border border-slate-700 active:scale-[0.98] transition-all shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-slate-900/60 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-30"><div className="absolute top-8 right-2 text-[7rem] rotate-6">🚫</div></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="forbidden">Verbal</Badge><Badge>4+ Players</Badge></div>
                        <h3 className="text-3xl font-bold text-white mb-1">Forbidden Words</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">Describe the word without saying the forbidden clues!</p>
                        <Button variant="forbidden" icon={Play}>Play Now</Button>
                    </div>
                </div>

                {/* GAME 5: POCKET WEREWOLF */}
                <div onClick={startWerewolf} className="group relative h-64 w-full bg-slate-800 rounded-3xl overflow-hidden cursor-pointer border border-slate-700 active:scale-[0.98] transition-all shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-slate-900/60 to-transparent z-10" />
                    <div className="absolute inset-0 opacity-30"><div className="absolute top-4 right-4 text-[8rem]">🐺</div></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="wolf">Strategy</Badge><Badge>4+ Players</Badge></div>
                        <h3 className="text-3xl font-bold text-white mb-1">Werewolf</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">Pass the phone. Survive the night. Find the beast.</p>
                        <Button variant="wolf" icon={Play}>Play Now</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HubScreen;
