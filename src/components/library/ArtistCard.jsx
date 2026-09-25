import React from 'react';
import { Users, Music } from 'lucide-react';
import { useMusicSearch } from '../../hooks/useMusicSearch';

export const ArtistCard = ({ artist }) => {
  const { setSelectedArtist, selectedArtist } = useMusicSearch();
  const isSelected = selectedArtist === artist.id;

  const handleArtistSelect = () => {
    if (isSelected) {
      setSelectedArtist(null);
    } else {
      setSelectedArtist(artist.id);
    }
  };

  return (
    <div
      onClick={handleArtistSelect}
      className={`group relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
          : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700/80'
      }`}
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700/60 group-hover:border-emerald-500/50 mb-3 transition-colors">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>

      <h4 className={`text-sm font-bold truncate max-w-full ${isSelected ? 'text-emerald-400' : 'text-slate-100'}`}>
        {artist.name}
      </h4>

      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 mt-1 mb-2">
        {artist.genre}
      </span>

      <div className="flex items-center gap-1 text-[11px] text-slate-500">
        <Users className="w-3 h-3 text-slate-400" />
        <span>{(artist.monthlyListeners / 1000).toFixed(0)}k listeners</span>
      </div>
    </div>
  );
};
