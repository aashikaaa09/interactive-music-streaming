import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistContext } from '../context/PlaylistContext';
import { useAudioContext } from '../context/AudioContext';
import { songs } from '../data/songs';
import { SongCard } from '../components/library/SongCard';
import { Play, ArrowLeft, Trash2, Music } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

export const PlaylistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playlists, deletePlaylist } = usePlaylistContext();
  const { playTrack } = useAudioContext();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className="space-y-4 p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
        <h2 className="text-lg font-bold text-white">Playlist Not Found</h2>
        <p className="text-xs text-slate-400">The requested playlist may have been deleted.</p>
        <button
          onClick={() => navigate('/playlists')}
          className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold"
        >
          Back to Playlists
        </button>
      </div>
    );
  }

  const playlistSongs = playlist.songIds
    .map((songId) => songs.find((s) => s.id === songId))
    .filter(Boolean);

  const totalDuration = playlistSongs.reduce((acc, s) => acc + (s.duration || 0), 0);
  
  const coverUrl =
    playlistSongs.length > 0
      ? playlistSongs[0].coverUrl
      : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playTrack(playlistSongs[0], playlistSongs);
    }
  };

  const handleDeletePlaylist = () => {
    if (window.confirm(`Delete playlist "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
      navigate('/playlists');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/playlists')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Playlists
      </button>

      {/* Playlist Header Banner */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 flex-shrink-0 shadow-2xl">
          <img src={coverUrl} alt={playlist.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Custom Playlist</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{playlist.name}</h1>
          <p className="text-xs text-slate-400 max-w-xl">{playlist.description || 'No description provided.'}</p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-emerald-400" />
              {playlistSongs.length} Songs
            </span>
            <span>•</span>
            <span>Total Duration: {formatTime(totalDuration)}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-3">
            <button
              onClick={handlePlayAll}
              disabled={playlistSongs.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Play All
            </button>

            <button
              onClick={handleDeletePlaylist}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-colors"
              title="Delete Playlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Track List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white">Track List ({playlistSongs.length})</h3>

        {playlistSongs.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
            <p className="text-slate-400 text-sm">No songs in this playlist yet.</p>
            <button
              onClick={() => navigate('/search')}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold"
            >
              Browse Music Library
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {playlistSongs.map((song) => (
              <SongCard key={song.id} song={song} layout="row" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
