import React from 'react';
import { User, Heart, ListMusic, History, Music2 } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

export const UserStatsWidget = () => {
  const { stats } = useDashboardData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* User Overview Profile Card */}
      <div className="md:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Music Explorer</h3>
            <p className="text-xs text-slate-400">Frontend Guest Account</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Free Listening Tier
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 text-center">
          <div>
            <span className="text-lg font-bold text-white">{stats.totalFavorites}</span>
            <p className="text-[10px] text-slate-400 uppercase">Favorites</p>
          </div>
          <div>
            <span className="text-lg font-bold text-white">{stats.totalPlaylists}</span>
            <p className="text-[10px] text-slate-400 uppercase">Playlists</p>
          </div>
          <div>
            <span className="text-lg font-bold text-white">{stats.totalRecentlyPlayed}</span>
            <p className="text-[10px] text-slate-400 uppercase">Recent</p>
          </div>
        </div>
      </div>

      {/* Favorite Genres Distribution Breakdown */}
      <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Music2 className="w-4 h-4 text-emerald-400" />
            Favorite Genre Preferences
          </h4>
          <p className="text-xs text-slate-500">Based on your saved tracks and listening history</p>
        </div>

        <div className="space-y-3">
          {stats.topGenres.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">Add favorite songs to reveal your top genre statistics!</p>
          ) : (
            stats.topGenres.slice(0, 4).map((item, idx) => {
              const percentage = Math.round((item.count / (stats.totalFavorites || 1)) * 100);
              return (
                <div key={item.genre} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-medium">{item.genre}</span>
                    <span className="text-emerald-400 font-mono">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
