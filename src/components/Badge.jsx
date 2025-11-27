import React from 'react';

const Badge = ({ children, variant = 'default' }) => {
    const styles = variant === 'accent'
        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
        : variant === 'mlt'
            ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'
            : variant === 'bomb'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : variant === 'forbidden'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : variant === 'wolf'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700';
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
            {children}
        </span>
    );
};

export default Badge;
