import React, { createContext, useContext, useState, useMemo } from 'react';
import { songs, artists, albums, genres } from '../data/songs';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'title' | 'artist' | 'duration' | 'year'

  // Filtered Songs calculation
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // 1. Text Search Query match (Title, Artist, Album, Genre)
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query);

      // 2. Genre filter match
      const matchesGenre =
        selectedGenre === 'All' || song.genre.toLowerCase() === selectedGenre.toLowerCase();

      // 3. Artist filter match
      const matchesArtist = !selectedArtist || song.artistId === selectedArtist;

      // 4. Album filter match
      const matchesAlbum = !selectedAlbum || song.albumId === selectedAlbum;

      return matchesQuery && matchesGenre && matchesArtist && matchesAlbum;
    }).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      if (sortBy === 'duration') return b.duration - a.duration;
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      return 0;
    });
  }, [searchQuery, selectedGenre, selectedArtist, selectedAlbum, sortBy]);

  // Filtered Artists calculation
  const filteredArtists = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return artists.filter((artist) => {
      const matchesQuery =
        !query ||
        artist.name.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === 'All' || artist.genre.toLowerCase() === selectedGenre.toLowerCase();

      return matchesQuery && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  // Filtered Albums calculation
  const filteredAlbums = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return albums.filter((album) => {
      const matchesQuery =
        !query ||
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query) ||
        album.genre.toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === 'All' || album.genre.toLowerCase() === selectedGenre.toLowerCase();

      return matchesQuery && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setSortBy('default');
  };

  const value = {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedArtist,
    setSelectedArtist,
    selectedAlbum,
    setSelectedAlbum,
    sortBy,
    setSortBy,
    resetFilters,
    filteredSongs,
    filteredArtists,
    filteredAlbums,
    allSongs: songs,
    allArtists: artists,
    allAlbums: albums,
    availableGenres: genres,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
