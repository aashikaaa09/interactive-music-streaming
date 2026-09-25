import React from 'react';
import { User, Heart, ListMusic, History, ArrowRight } from 'lucide-react';
import { UserStatsWidget } from '../components/dashboard/UserStatsWidget';
import { RecentlyPlayedSection } from '../components/dashboard/RecentlyPlayedSection';
import { PlaylistCard } from '../components/playlist/PlaylistCard';
import { SongCard } from '../components/library/SongCard';
import { useDashboardData } from '../hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { playlists, favoriteSongs } = useDashboardData();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-emerald-400" />
          User Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Frontend guest metrics, genre preferences, saved playlists, and recent history.
        </p>
      </div>

      {/* Main Stats Widget */}
      <UserStatsWidget />

      {/* Recent Playlists Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-emerald-400" />
            Your Playlists ({playlists.length})
          </h3>
          <button
            onClick={() => navigate('/playlists')}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Manage Playlists
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {playlists.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No playlists created yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {playlists.slice(0, 4).map((playlist) => (
              <div key={playlist.id} onClick={() => navigate(`/playlists/${playlist.id}`)}>
                <PlaylistCard playlist={playlist} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favorites Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            Saved Favorite Tracks ({favoriteSongs.length})
          </h3>
          <button
            onClick={() => navigate('/favorites')}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View All Favorites
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {favoriteSongs.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No favorite tracks saved yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {favoriteSongs.slice(0, 5).map((song) => (
              <SongCard key={song.id} song={song} layout="grid" />
            ))}
          </div>
        )}
      </div>

      {/* Recently Played Section */}
      <RecentlyPlayedSection />
    </div>
  );
};
