import React from 'react';
import { Search, Music, Menu, X } from 'lucide-react';
import { useMusicSearch } from '../../hooks/useMusicSearch';
import { useNavigate, Link } from 'react-router-dom';

export const Header = ({ onToggleMobileNav, isMobileNavOpen }) => {
  const { searchQuery, setSearchQuery } = useMusicSearch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/search') {
      navigate('/search');
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
      {/* Brand & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileNav}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-xl text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <Music className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg md:text-xl text-white tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            SoundPulse
          </span>
        </Link>
      </div>

      {/* Global Interactive Search Input */}
      <div className="relative max-w-md w-full mx-4 hidden sm:block">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search songs, artists, albums..."
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500/50 rounded-full py-2 pl-10 pr-9 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* User / Badge Indicator */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium">User Dashboard</span>
        </Link>
      </div>
    </header>
  );
};
