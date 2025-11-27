import React from 'react';

const Input = ({ value, onChange, placeholder, className = '' }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 h-12 text-slate-100 outline-none transition-all placeholder:text-slate-600 ${className}`}
    />
);

export default Input;
