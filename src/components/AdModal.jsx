import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
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
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">

                {/* Ad Header */}
                <div className="bg-slate-100 p-3 flex justify-between items-center border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">Advertisement</span>
                    {canClose ? (
                        <button onClick={onClose} className="p-1 bg-slate-200 rounded-full text-slate-500 hover:bg-slate-300 transition-colors">
                            <X size={20} />
                        </button>
                    ) : (
                        <span className="text-xs font-bold text-slate-400">Skip in {timer}s</span>
                    )}
                </div>

                {/* Ad Content Placeholder */}
                <div className="h-64 bg-slate-50 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                    <div className="z-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 transform transition-transform group-hover:scale-105 duration-500">
                        <div className="w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30">
                            Ad
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">AdSense Active</h3>
                        <p className="text-slate-500 text-sm mb-4">
                            The global AdSense script is loaded. <br />
                            To show a specific ad here, you need to create an <strong>Ad Unit</strong> in Google AdSense and paste the <code>&lt;ins&gt;</code> code in this component.
                        </p>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
                            Visit Site <ExternalLink size={14} />
                        </button>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <Button
                        onClick={onClose}
                        variant="primary"
                        className={`w-full ${!canClose ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!canClose}
                    >
                        {canClose ? 'Continue to App' : `Wait ${timer} seconds...`}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default AdModal;
