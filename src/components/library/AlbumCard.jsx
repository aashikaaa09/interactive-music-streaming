import React from 'react';
import { Disc, Play } from 'lucide-react';
import { useAudioContext } from '../../context/AudioContext';
import { songs } from '../../data/songs';

export const AlbumCard = ({ album }) => {
  const { playTrack } = useAudioContext();

  // Get songs belonging to this album
  const albumSongs = songs.filter((s) => s.albumId === album.id);

  const handlePlayAlbum = (e) => {
    e.stopPropagation();
    if (albumSongs.length > 0) {
      playTrack(albumSongs[0], albumSongs);
    }
  };

  return (
    <div
      onClick={handlePlayAlbum}
      className="group relative flex flex-col p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-800 mb-3">
        <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        {/* Play Album Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          <div className="w-11 h-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </div>
        </div>

        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-mono text-slate-300 border border-slate-800">
          {album.releaseYear}
        </span>
      </div>

      <div className="truncate">
        <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-emerald-400 transition-colors">
          {album.title}
        </h4>
        <p className="text-xs text-slate-400 truncate mt-0.5">{album.artist}</p>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
          <span>{albumSongs.length} tracks</span>
          <span>•</span>
          <span>{album.genre}</span>
        </div>
      </div>
    </div>
  );
};
