import React from 'react';
import { ListMusic, Play, Trash2, Music } from 'lucide-react';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useAudioContext } from '../../context/AudioContext';
import { songs } from '../../data/songs';

export const PlaylistCard = ({ playlist }) => {
  const { deletePlaylist } = usePlaylistContext();
  const { playTrack } = useAudioContext();

  const playlistSongs = playlist.songIds
    .map((id) => songs.find((s) => s.id === id))
    .filter(Boolean);

  const coverUrl =
    playlistSongs.length > 0
      ? playlistSongs[0].coverUrl
      : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

  const handlePlayPlaylist = (e) => {
    e.stopPropagation();
    if (playlistSongs.length > 0) {
      playTrack(playlistSongs[0], playlistSongs);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete playlist "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
    }
  };

  return (
    <div
      onClick={handlePlayPlaylist}
      className="group relative flex flex-col p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-800 mb-3">
        <img src={coverUrl} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          {playlistSongs.length > 0 ? (
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
            </div>
          ) : (
            <span className="text-xs text-slate-300 font-medium">Empty Playlist</span>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors"
          title="Delete playlist"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors truncate">
            {playlist.name}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {playlist.description || 'Custom playlist'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-3">
          <Music className="w-3.5 h-3.5" />
          <span>{playlistSongs.length} tracks</span>
        </div>
      </div>
    </div>
  );
};
