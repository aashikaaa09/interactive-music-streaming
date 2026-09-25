import React from 'react';
import { Heart } from 'lucide-react';
import { usePlaylistContext } from '../../context/PlaylistContext';

export const FavoriteButton = ({ songId, size = 'md', className = '' }) => {
  const { isFavorite, toggleFavorite } = usePlaylistContext();
  const active = isFavorite(songId);

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(songId);
      }}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`rounded-full transition-all duration-200 focus:outline-none ${
        active
          ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 scale-105'
          : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50'
      } ${sizeClasses[size]} ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-200 ${
          active ? 'fill-rose-500 stroke-rose-500' : 'stroke-current'
        }`}
      />
    </button>
  );
};
