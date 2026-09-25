import React from 'react';
import { History, Play } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useAudioContext } from '../../context/AudioContext';

export const RecentlyPlayedSection = () => {
  const { recentlyPlayedSongs } = useDashboardData();
  const { playTrack } = useAudioContext();

  if (recentlyPlayedSongs.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
        <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-xs text-slate-400">No recently played songs yet. Start listening to build your history!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          Recently Played
        </h3>
        <span className="text-xs text-slate-500 font-mono">{recentlyPlayedSongs.length} Tracks</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {recentlyPlayedSongs.slice(0, 6).map((song) => (
          <div
            key={song.id}
            onClick={() => playTrack(song)}
            className="group relative p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 cursor-pointer"
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-800 mb-2">
              <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                </div>
              </div>
            </div>

            <h5 className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors">
              {song.title}
            </h5>
            <p className="text-[11px] text-slate-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
