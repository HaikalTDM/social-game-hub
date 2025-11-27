import React, { useState } from 'react';
import { Moon, Shield, Search, Users, Sun, Skull, Ghost, RefreshCcw, X } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const WerewolfScreen = ({
    wwGameState,
    setWwGameState,
    wwPlayers,
    setWwPlayers,
    wwTurnIdx,
    setWwTurnIdx,
    wwNightActions,
    setWwNightActions,
    wwDayMessage,
    setWwDayMessage,
    wwWinner,
    setWwWinner,
    initWerewolfGame,
    goHome
}) => {

    const handleNightAction = (actionData) => {
        if (actionData) {
            setWwNightActions(prev => ({ ...prev, ...actionData }));
        }
        const nextIdx = wwTurnIdx + 1;
        if (nextIdx >= wwPlayers.length) {
            calculateMorning();
        } else {
            setWwTurnIdx(nextIdx);
        }
    };

    const calculateMorning = () => {
        const { target, saved } = wwNightActions;
        let message = "The village woke up to a peaceful morning. No one died.";
        let deadId = null;

        if (target !== null && target !== saved) {
            const victim = wwPlayers.find(p => p.id === target);
            message = `Tragedy struck! ${victim.name} was eaten by the Werewolf!`;
            deadId = target;
            setWwPlayers(prev => prev.map(p => p.id === target ? { ...p, isAlive: false } : p));
        } else if (target !== null && target === saved) {
            message = "The Werewolf attacked, but the Doctor saved the victim!";
        }

        setWwDayMessage(message);

        const currentPlayers = wwPlayers.map(p => p.id === deadId ? { ...p, isAlive: false } : p);
        const wolves = currentPlayers.filter(p => p.role === 'werewolf' && p.isAlive).length;
        const villagers = currentPlayers.filter(p => p.role !== 'werewolf' && p.isAlive).length;

        if (wolves === 0) {
            setWwWinner('villagers');
            setWwGameState('game_over');
        } else if (wolves >= villagers) {
            setWwWinner('werewolf');
            setWwGameState('game_over');
        } else {
            setWwGameState('day_reveal');
        }
    };

    const handleDayVote = (targetId) => {
        const newPlayers = wwPlayers.map(p => p.id === targetId ? { ...p, isAlive: false } : p);
        setWwPlayers(newPlayers);

        const wolves = newPlayers.filter(p => p.role === 'werewolf' && p.isAlive).length;
        const villagers = newPlayers.filter(p => p.role !== 'werewolf' && p.isAlive).length;

        if (wolves === 0) {
            setWwWinner('villagers');
            setWwGameState('game_over');
        } else if (wolves >= villagers) {
            setWwWinner('werewolf');
            setWwGameState('game_over');
        } else {
            setWwTurnIdx(0);
            setWwNightActions({ target: null, saved: null, checked: null });
            setWwGameState('night_intro');
        }
    };

    const NightAction = () => {
        const [revealed, setRevealed] = useState(false);
        const player = wwPlayers[wwTurnIdx];

        if (!player.isAlive) {
            setTimeout(() => handleNightAction(null), 100);
            return <div className="flex-1 flex items-center justify-center text-slate-500">Skipping dead player...</div>;
        }

        const RoleIcon = { werewolf: Moon, doctor: Shield, seer: Search, villager: Users }[player.role];
        const roleColor = { werewolf: 'text-red-400', doctor: 'text-green-400', seer: 'text-purple-400', villager: 'text-blue-400' }[player.role];

        return (
            <div className="flex flex-col h-full items-center justify-center text-center p-6 relative z-10">
                {!revealed ? (
                    <>
                        <h2 className="text-2xl font-light text-slate-300 mb-8">Pass the phone to</h2>
                        <h1 className="text-5xl font-black text-white mb-12">{player.name}</h1>
                        <Button onClick={() => setRevealed(true)} variant="wolf" className="h-16 text-lg">I am {player.name}</Button>
                    </>
                ) : (
                    <div className="w-full max-w-md animate-in zoom-in duration-300">
                        <div className="mb-6 flex justify-center"><RoleIcon size={64} className={roleColor} /></div>
                        <h2 className="text-3xl font-bold text-white mb-2 capitalize">{player.role === 'seer' ? 'Seer (Spy)' : player.role}</h2>
                        <p className="text-slate-400 mb-8 h-12">
                            {player.role === 'werewolf' && "Pick a victim to eliminate."}
                            {player.role === 'doctor' && "Pick someone to save from attack."}
                            {player.role === 'seer' && "Pick someone to reveal their role."}
                            {player.role === 'villager' && "You are sleeping soundly. Keep the secret."}
                        </p>

                        {player.role === 'villager' ? (
                            <Button onClick={() => handleNightAction(null)} variant="secondary" className="mt-8 h-16">Go back to sleep</Button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                {wwPlayers.map(p => (
                                    p.isAlive && p.id !== player.id ? (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                if (player.role === 'seer') {
                                                    alert(`${p.name} is a ${p.role}`);
                                                    handleNightAction({ checked: p.id });
                                                } else if (player.role === 'doctor') {
                                                    handleNightAction({ saved: p.id });
                                                } else if (player.role === 'werewolf') {
                                                    handleNightAction({ target: p.id });
                                                }
                                            }}
                                            className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:bg-slate-700 transition-colors"
                                        >
                                            <span className="font-bold text-white">{p.name}</span>
                                        </button>
                                    ) : null
                                ))}
                                {player.role === 'doctor' && (
                                    <button onClick={() => handleNightAction({ saved: player.id })} className="p-4 bg-slate-800 border-slate-700 rounded-xl text-left"><span className="font-bold text-green-400">Save Myself</span></button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`flex flex-col h-full transition-colors duration-1000 ${wwGameState.includes('night') ? 'bg-slate-950 animate-nightfall' : 'bg-slate-900 animate-sunrise'}`}>
            <div className="p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm z-20">
                <button onClick={goHome}><X className="text-white/50 hover:text-white" /></button>
                <Badge variant="wolf">Werewolf</Badge>
                <div className="w-6" />
            </div>

            {wwGameState === 'night_intro' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative z-10">
                    <Moon size={80} className="text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <h2 className="text-4xl font-black text-white mb-4">Nightfall</h2>
                    <p className="text-slate-300 mb-8 max-w-xs">The village goes to sleep. Pass the phone around so everyone can take their secret night action.</p>
                    <Button onClick={() => setWwGameState('night_turn')} variant="wolf">Start Night</Button>
                </div>
            )}

            {wwGameState === 'night_turn' && <NightAction />}

            {wwGameState === 'day_reveal' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative z-10">
                    <Sun size={80} className="text-amber-400 mb-6 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]" />
                    <h2 className="text-4xl font-black text-white mb-4">Morning</h2>
                    <p className="text-xl text-white mb-8 font-medium max-w-sm">{wwDayMessage}</p>
                    <Button onClick={() => setWwGameState('day_vote')} variant="primary">Discuss & Vote</Button>
                </div>
            )}

            {wwGameState === 'day_vote' && (
                <div className="flex-1 flex flex-col p-6 z-10">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Town Hall</h2>
                    <p className="text-slate-300 text-center mb-6">Discuss! Who do you want to eliminate?</p>
                    <div className="grid grid-cols-1 gap-3 overflow-y-auto">
                        {wwPlayers.map(p => (
                            p.isAlive ? (
                                <button
                                    key={p.id}
                                    onClick={() => handleDayVote(p.id)}
                                    className="p-4 bg-white/10 border border-white/10 rounded-xl flex justify-between items-center hover:bg-red-900/40 hover:border-red-500/50 group backdrop-blur-md"
                                >
                                    <span className="font-bold text-white text-lg">{p.name}</span>
                                    <Skull className="text-slate-400 group-hover:text-red-400" />
                                </button>
                            ) : (
                                <div key={p.id} className="p-4 border border-white/5 rounded-xl flex justify-between items-center opacity-40">
                                    <span className="font-bold text-slate-400 line-through">{p.name}</span>
                                    <Ghost size={16} className="text-slate-500" />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {wwGameState === 'game_over' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 z-10">
                    <div className="text-[6rem] mb-4 animate-bounce">{wwWinner === 'werewolf' ? '🐺' : '🧑‍🌾'}</div>
                    <h2 className="text-4xl font-black text-white mb-2">{wwWinner === 'werewolf' ? 'Werewolves Win!' : 'Villagers Win!'}</h2>
                    <p className="text-slate-300 mb-8">Game Over</p>
                    <div className="w-full space-y-3">
                        <Button onClick={initWerewolfGame} variant="wolf" icon={RefreshCcw}>Play Again</Button>
                        <Button onClick={goHome} variant="ghost">Back to Hub</Button>
                    </div>
                </div>
            )}

            {/* Ambient Backgrounds */}
            {wwGameState.includes('night') && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.4),transparent)] pointer-events-none" />
            )}
            {!wwGameState.includes('night') && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.3),rgba(15,23,42,0))] pointer-events-none" />
            )}
        </div>
    );
};

export default WerewolfScreen;
