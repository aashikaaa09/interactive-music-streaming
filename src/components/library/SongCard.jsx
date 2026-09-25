import React, { useState } from 'react';
import { Play, Pause, Plus, Check, MoreVertical, Disc } from 'lucide-react';
import { useAudioContext } from '../../context/AudioContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { FavoriteButton } from '../common/FavoriteButton';
import { formatTime } from '../../utils/formatTime';

export const SongCard = ({ song, layout = 'grid' }) => {
  const { currentSong, isPlaying, playTrack, togglePlay } = useAudioContext();
  const { playlists, addSongToPlaylist } = usePlaylistContext();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isCurrent = currentSong?.id === song.id;
  const isCurrentPlaying = isCurrent && isPlaying;

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(song);
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, song.id);
    setShowPlaylistMenu(false);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  if (layout === 'row') {
    return (
      <div
        onClick={handlePlayClick}
        className={`group relative flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
          isCurrent
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700/80'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-700/50">
            <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-slate-950/40 flex items-center justify-center transition-opacity ${
              isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              {isCurrentPlaying ? (
                <div className="flex items-end justify-center gap-0.5 w-4 h-4">
                  <span className="w-1 bg-emerald-400 animate-bounce h-3"></span>
                  <span className="w-1 bg-emerald-400 animate-bounce h-4 [animation-delay:0.2s]"></span>
                  <span className="w-1 bg-emerald-400 animate-bounce h-2 [animation-delay:0.4s]"></span>
                </div>
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </div>
          </div>

          <div className="truncate">
            <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-emerald-400' : 'text-slate-200'}`}>
              {song.title}
            </h4>
            <p className="text-xs text-slate-400 truncate">{song.artist} • {song.album}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 hidden sm:block">{formatTime(song.duration)}</span>
          <FavoriteButton songId={song.id} size="sm" />
          
          {/* Playlist Add Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Add to playlist"
            >
              {addedNotice ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
            </button>

            {showPlaylistMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
                <p className="text-[10px] font-semibold text-slate-500 uppercase px-2 py-1">Add to Playlist</p>
                {playlists.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2 py-1">No playlists available</p>
                ) : (
                  playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => handleAddToPlaylist(pl.id)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 truncate block"
                    >
                      {pl.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handlePlayClick}
      className={`group relative flex flex-col p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isCurrent
          ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
          : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700/80'
      }`}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-800 mb-3">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        {/* Play Overlay Button */}
        <div className={`absolute inset-0 bg-slate-950/40 flex items-center justify-center transition-opacity duration-200 ${
          isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-110 transition-transform">
            {isCurrentPlaying ? (
              <Pause className="w-6 h-6 fill-slate-950" />
            ) : (
              <Play className="w-6 h-6 fill-slate-950 ml-1" />
            )}
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <FavoriteButton songId={song.id} size="sm" />
        </div>

        {/* Bottom Left Genre Badge */}
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
          {song.genre}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="truncate flex-1">
          <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-emerald-400' : 'text-slate-100'}`}>
            {song.title}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5">{song.artist}</p>
        </div>

        {/* Playlist Add Popup Button */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title="Add to playlist"
          >
            {addedNotice ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
          </button>

          {showPlaylistMenu && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
              <p className="text-[10px] font-semibold text-slate-500 uppercase px-2 py-1">Add to Playlist</p>
              {playlists.length === 0 ? (
                <p className="text-xs text-slate-400 px-2 py-1">No playlists</p>
              ) : (
                playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => handleAddToPlaylist(pl.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 truncate block"
                  >
                    {pl.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
