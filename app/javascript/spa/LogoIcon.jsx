import React from "react";

export const LogoIcon = ({ size = "default", className = "" }) => {
  const sizes = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
    xlarge: "h-16 w-16",
    xxlarge: "h-24 w-24"
  };

  const iconSizes = {
    small: "h-3.5 w-3.5",
    default: "h-5 w-5",
    large: "h-7 w-7",
    xlarge: "h-10 w-10",
    xxlarge: "h-14 w-14"
  };

  return (
    <div className={`relative ${sizes[size]} rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-300 to-sky-400 shadow-[0_0_24px_rgba(16,185,129,0.8)] flex items-center justify-center ${className}`}>
      <svg className={`${iconSizes[size]} text-slate-950`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    </div>
  );
};
