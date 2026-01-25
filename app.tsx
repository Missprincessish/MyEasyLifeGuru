import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      {/* Glass Card */}
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
        
        {/* Kai Character (Simple SVG) */}
        <div className="absolute -top-12 -right-8 animate-bounce">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 80C20 70 50 65 50 65C50 65 80 70 80 80V90H20V80Z" fill="#818CF8"/>
            <rect x="25" y="20" width="50" height="40" rx="10" fill="#6366F1"/>
            <rect x="32" y="27" width="36" height="26" rx="5" fill="#E0E7FF"/>
            <circle cx="42" cy="40" r="3" fill="#4F46E5"/>
            <circle cx="58" cy="40" r="3" fill="#4F46E5"/>
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Adultier Adult: Path Finder</h1>
        <p className="text-lg opacity-90 leading-relaxed mb-6">
          "Hi Angela! I'm Kai. Don't worry about the big numbers today. We're going to take this one tiny step at a time."
        </p>
        
        <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold transition-all shadow-lg border border-white/20">
          Tell me the first step
        </button>
      </div>
    </div>
  );
}
