import React from 'react';
import { X, Settings, Volume2, VolumeX, Info, Github } from 'lucide-react';
import Button from './Button';

const SettingsModal = ({ isOpen, onClose, settings, setSettings }) => {
    if (!isOpen) return null;

    const toggleVibration = () => {
        setSettings(prev => ({ ...prev, vibration: !prev.vibration }));
        if (!settings.vibration && navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings size={20} className="text-indigo-400" />
                        Settings
                    </h2>
                    <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Vibration Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${settings.vibration ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/50 text-slate-500'}`}>
                                {settings.vibration ? <Volume2 size={20} /> : <VolumeX size={20} />}
                            </div>
                            <div>
                                <div className="font-medium text-slate-200">Vibration</div>
                                <div className="text-xs text-slate-500">Haptic feedback in games</div>
                            </div>
                        </div>
                        <button
                            onClick={toggleVibration}
                            className={`w-12 h-7 rounded-full transition-colors relative ${settings.vibration ? 'bg-indigo-600' : 'bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.vibration ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* About Section */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">About</h3>
                        <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
                                    <Info size={18} />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-200 text-sm">Social Game Hub</div>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                        A collection of party games designed for local multiplayer fun. No ads, no tracking, just vibes.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-800/50 flex justify-between items-center">
                                <span className="text-xs text-slate-500">v1.0.0</span>
                                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                    <Github size={12} />
                                    <span>Open Source</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={onClose} variant="secondary">Close</Button>
                </div>

            </div>
        </div>
    );
};

export default SettingsModal;
