import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useMusicSearch } from '../../hooks/useMusicSearch';

export const SearchFilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    availableGenres,
    resetFilters,
  } = useMusicSearch();

  const isFiltered = searchQuery !== '' || selectedGenre !== 'All' || sortBy !== 'default';

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Mobile Search Bar */}
        <div className="relative flex-1 sm:hidden">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, artists..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="default" className="bg-slate-900 text-slate-300">Default</option>
              <option value="title" className="bg-slate-900 text-slate-300">Title (A-Z)</option>
              <option value="artist" className="bg-slate-900 text-slate-300">Artist (A-Z)</option>
              <option value="duration" className="bg-slate-900 text-slate-300">Duration (Longest)</option>
              <option value="year" className="bg-slate-900 text-slate-300">Year (Newest)</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Genre Pills Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {availableGenres.map((genre) => {
          const isActive = selectedGenre.toLowerCase() === genre.toLowerCase();
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};
