import React, { useState } from 'react';
import { SearchFilterBar } from '../components/library/SearchFilterBar';
import { SongCard } from '../components/library/SongCard';
import { ArtistCard } from '../components/library/ArtistCard';
import { AlbumCard } from '../components/library/AlbumCard';
import { useMusicSearch } from '../hooks/useMusicSearch';
import { Search } from 'lucide-react';

export const SearchPage = () => {
  const { filteredSongs, allArtists, allAlbums, searchQuery, selectedGenre } = useMusicSearch();
  const [activeSearchTab, setActiveSearchTab] = useState('all'); // 'all' | 'songs' | 'artists' | 'albums'

  // Filter artists and albums by query as well
  const query = searchQuery.trim().toLowerCase();
  
  const filteredArtists = allArtists.filter((a) => {
    const matchesQuery = !query || a.name.toLowerCase().includes(query) || a.genre.toLowerCase().includes(query);
    const matchesGenre = selectedGenre === 'All' || a.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesQuery && matchesGenre;
  });

  const filteredAlbums = allAlbums.filter((al) => {
    const matchesQuery = !query || al.title.toLowerCase().includes(query) || al.artist.toLowerCase().includes(query) || al.genre.toLowerCase().includes(query);
    const matchesGenre = selectedGenre === 'All' || al.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesQuery && matchesGenre;
  });

  const totalResults = filteredSongs.length + filteredArtists.length + filteredAlbums.length;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-emerald-400" />
          Search & Discover
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore music tracks, artists, albums, and genres across the static library.
        </p>
      </div>

      <SearchFilterBar />

      {/* Result Type Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'all', label: `All (${totalResults})` },
          { id: 'songs', label: `Songs (${filteredSongs.length})` },
          { id: 'artists', label: `Artists (${filteredArtists.length})` },
          { id: 'albums', label: `Albums (${filteredAlbums.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSearchTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeSearchTab === tab.id
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Zero State */}
      {totalResults === 0 && (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2">
          <p className="text-slate-300 font-semibold text-sm">No matches found</p>
          <p className="text-xs text-slate-500">Try searching for a different keyword or selecting another genre filter.</p>
        </div>
      )}

      {/* Songs Section */}
      {(activeSearchTab === 'all' || activeSearchTab === 'songs') && filteredSongs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white">Songs ({filteredSongs.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} layout="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Artists Section */}
      {(activeSearchTab === 'all' || activeSearchTab === 'artists') && filteredArtists.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-base font-bold text-white">Artists ({filteredArtists.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      )}

      {/* Albums Section */}
      {(activeSearchTab === 'all' || activeSearchTab === 'albums') && filteredAlbums.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-base font-bold text-white">Albums ({filteredAlbums.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {filteredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
