import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }) => {
    const baseStyles = "relative w-full flex items-center justify-center gap-2 font-medium rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none h-12";
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white",
        outline: "bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-950",
        danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20",
        mlt: "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/20",
        bomb: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
        forbidden: "bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-900/20",
        wolf: "bg-slate-700 hover:bg-slate-600 text-white shadow-lg shadow-black/40 border border-slate-600"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} disabled={disabled}>
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

export default Button;
