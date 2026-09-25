import React from 'react';
import { History, Play } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAudioContext } from '../context/AudioContext';
import { SongCard } from '../components/library/SongCard';
import { useNavigate } from 'react-router-dom';

export const RecentlyPlayedPage = () => {
  const { recentlyPlayedSongs } = useDashboardData();
  const { playTrack } = useAudioContext();
  const navigate = useNavigate();

  const handlePlayAllRecent = () => {
    if (recentlyPlayedSongs.length > 0) {
      playTrack(recentlyPlayedSongs[0], recentlyPlayedSongs);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" />
            Recently Played History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracks you have listened to recently (persisted in browser storage).
          </p>
        </div>

        {recentlyPlayedSongs.length > 0 && (
          <button
            onClick={handlePlayAllRecent}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Play Recent Queue
          </button>
        )}
      </div>

      {recentlyPlayedSongs.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <History className="w-10 h-10 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-200">No recently played history</h3>
            <p className="text-xs text-slate-400 mt-1">Play any song in the library to start tracking your history.</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold"
          >
            Browse Music
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {recentlyPlayedSongs.map((song) => (
            <SongCard key={`${song.id}-${song.playedAt}`} song={song} layout="row" />
          ))}
        </div>
      )}
    </div>
  );
};
