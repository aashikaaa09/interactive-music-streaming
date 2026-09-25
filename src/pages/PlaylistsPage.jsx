import React, { useState } from 'react';
import { Plus, ListMusic } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import { PlaylistCard } from '../components/playlist/PlaylistCard';
import { CreatePlaylistModal } from '../components/playlist/CreatePlaylistModal';
import { useNavigate } from 'react-router-dom';

export const PlaylistsPage = () => {
  const { playlists } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ListMusic className="w-6 h-6 text-emerald-400" />
            Your Playlists
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, manage, and listen to custom playlists saved in browser storage.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <ListMusic className="w-10 h-10 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-200">No playlists found</h3>
            <p className="text-xs text-slate-400 mt-1">Create your first playlist to organize your favorite tracks.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 rounded-xl text-xs font-semibold transition-colors"
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >
              <PlaylistCard playlist={playlist} />
            </div>
          ))}
        </div>
      )}

      <CreatePlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
