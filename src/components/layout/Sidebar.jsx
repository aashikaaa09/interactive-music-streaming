import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Library, Heart, History, ListMusic, User, PlusCircle } from 'lucide-react';
import { usePlaylistContext } from '../../context/PlaylistContext';

export const Sidebar = ({ onCreatePlaylist }) => {
  const { playlists, favorites } = usePlaylistContext();
  const navigate = useNavigate();

  const mainNav = [
    { path: '/', label: 'Home Library', icon: Home },
    { path: '/search', label: 'Search & Explore', icon: Library },
    { path: '/playlists', label: 'Playlists', icon: ListMusic, badge: playlists.length },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { path: '/recently-played', label: 'Recently Played', icon: History },
    { path: '/dashboard', label: 'User Dashboard', icon: User },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-900/40 p-4 hidden lg:flex flex-col gap-6 select-none flex-shrink-0">
      {/* Navigation Links */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Menu
        </p>
        {mainNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Quick Playlists Section */}
      <div className="flex-1 flex flex-col min-h-0 border-t border-slate-800/80 pt-4">
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Your Playlists
          </p>
          <button
            type="button"
            onClick={onCreatePlaylist}
            title="Create Playlist"
            className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
          {playlists.length === 0 ? (
            <p className="px-3 py-2 text-xs text-slate-500 italic">No playlists yet</p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => navigate(`/playlists/${playlist.id}`)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 truncate transition-colors block"
              >
                {playlist.name}
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
