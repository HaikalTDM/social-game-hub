import React, { useState, useEffect } from 'react';
import { X, Zap, Star, Shield } from 'lucide-react';
import Button from './Button';

const AdModal = ({ isOpen, onClose }) => {
    const [canClose, setCanClose] = useState(false);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        if (isOpen) {
            setCanClose(false);
            setTimer(5);
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setCanClose(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border border-slate-800">

                {/* Header */}
                <div className="bg-slate-900 p-4 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-700 px-2 py-0.5 rounded">Sponsored</span>
                    {canClose ? (
                        <button onClick={onClose} className="p-1 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    ) : (
                        <span className="text-xs font-bold text-slate-500">Skip in {timer}s</span>
                    )}
                </div>

                {/* Ad Content */}
                <div className="p-6 pt-0 flex flex-col items-center text-center relative">

                    {/* Visual */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl mb-6 flex items-center justify-center shadow-lg shadow-orange-500/20 rotate-3">
                        <Zap size={40} className="text-white" fill="currentColor" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">Unlock Pro Mode</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Get the ultimate party experience. No ads, exclusive games, and custom themes.
                    </p>

                    {/* Features */}
                    <div className="w-full space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                            <Shield size={16} className="text-emerald-400" />
                            <span>Ad-free experience</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                            <Star size={16} className="text-amber-400" />
                            <span>Exclusive "Spicy" packs</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        Get Pro for $4.99
                    </button>
                    <p className="text-[10px] text-slate-600 mt-3">One-time purchase. Restore anytime.</p>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-950 border-t border-slate-900">
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        className={`w-full ${!canClose ? 'opacity-50 cursor-not-allowed' : 'text-slate-400 hover:text-white'}`}
                        disabled={!canClose}
                    >
                        {canClose ? 'No thanks, continue to game' : `Reward in ${timer}...`}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AdModal;
