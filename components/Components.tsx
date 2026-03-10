import React from 'react';

// --- Buttons ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-4 py-3 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-opacity-90 shadow-md shadow-blue-900/10",
    secondary: "bg-brand-yellow text-brand-blue hover:bg-opacity-90 shadow-md",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    danger: "bg-brand-red text-white hover:bg-opacity-90"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${width} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};

// --- Inputs ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input 
        className={`px-4 py-3 rounded-lg border-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all
          ${error ? 'border-brand-red focus:border-brand-red' : 'border-gray-200 focus:border-brand-blue'}
        `}
        {...props}
      />
      {error && <span className="text-xs text-brand-red font-medium">{error}</span>}
    </div>
  );
};

// --- Card ---

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
    {children}
  </div>
);

// --- Header ---

export const Header: React.FC<{ title: string; onBack?: () => void; showProfile?: boolean }> = ({ title, onBack, showProfile }) => (
  <div className="bg-white sticky top-0 z-10 border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      <h1 className="text-lg font-bold text-brand-blue">{title}</h1>
    </div>
    {showProfile && (
      <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow font-bold text-xs border border-brand-yellow">
        MY
      </div>
    )}
  </div>
);
