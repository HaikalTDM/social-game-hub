import React, { useRef } from 'react';
import { X, Fingerprint, Timer, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';

const MLTGameScreen = ({
    mltQuestion,
    mltTimer,
    setMltTimer,
    nextMLTQuestion,
    goHome
}) => {
    const timerRef = useRef(null);

    const triggerMLTTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        let count = 3;
        setMltTimer(count);
        timerRef.current = setInterval(() => {
            count--;
            if (count < 0) {
                clearInterval(timerRef.current);
                setMltTimer('POINT!');
            } else {
                setMltTimer(count);
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full relative">
            <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20"><button onClick={goHome} className="p-2 bg-slate-900/50 rounded-full text-slate-400 hover:text-white backdrop-blur-sm"><X size={24} /></button><Badge variant="mlt">Most Likely To</Badge><div className="w-10" /></div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10"><div className="w-full aspect-[3/4] max-h-[500px] relative perspective-1000"><div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-purple-800 rounded-3xl shadow-2xl shadow-fuchsia-900/50 flex flex-col items-center justify-center p-8 border-4 border-fuchsia-400/20"><div className="mb-8 opacity-50"><Fingerprint size={64} className="text-white mix-blend-overlay" /></div><h2 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-md">{mltQuestion}</h2><div className="mt-8 text-fuchsia-200/60 font-medium text-sm uppercase tracking-widest">Read Aloud</div></div></div><div className="mt-8 w-full max-w-xs space-y-4">{!mltTimer ? (<Button onClick={triggerMLTTimer} variant="secondary" className="bg-slate-900 border-slate-800" icon={Timer}>Start Countdown</Button>) : (<div className="h-14 flex items-center justify-center text-4xl font-black text-white animate-pulse">{mltTimer}</div>)}<Button onClick={nextMLTQuestion} variant="mlt" icon={ArrowRight}>Next Question</Button></div></div>
            <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" /><div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default MLTGameScreen;
