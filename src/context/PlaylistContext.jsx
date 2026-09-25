import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PlaylistContext = createContext(null);

const DEFAULT_PLAYLISTS = [
  {
    id: 'playlist-1',
    name: 'Synthwave & Cyber Night',
    description: 'Neon atmospheric tracks for late night sessions',
    createdAt: new Date().toISOString(),
    songIds: ['song-1', 'song-2', 'song-11', 'song-16'],
  },
  {
    id: 'playlist-2',
    name: 'Coffee & Focus',
    description: 'Calm lo-fi beats and acoustic vibes',
    createdAt: new Date().toISOString(),
    songIds: ['song-3', 'song-4', 'song-12'],
  },
];

const DEFAULT_FAVORITES = ['song-1', 'song-3', 'song-7', 'song-9'];

const DEFAULT_RECENTLY_PLAYED = [
  { songId: 'song-1', playedAt: new Date(Date.now() - 3600000).toISOString() },
  { songId: 'song-3', playedAt: new Date(Date.now() - 7200000).toISOString() },
  { songId: 'song-5', playedAt: new Date(Date.now() - 10800000).toISOString() },
];

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useLocalStorage('user_playlists', DEFAULT_PLAYLISTS);
  const [favorites, setFavorites] = useLocalStorage('favorite_songs', DEFAULT_FAVORITES);
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage('recently_played', DEFAULT_RECENTLY_PLAYED);

  // --- Playlist Actions ---
  const createPlaylist = (name, description = '') => {
    if (!name.trim()) return null;

    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      songIds: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  };

  const addSongToPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          if (playlist.songIds.includes(songId)) return playlist;
          return {
            ...playlist,
            songIds: [...playlist.songIds, songId],
          };
        }
        return playlist;
      })
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songIds: playlist.songIds.filter((id) => id !== songId),
          };
        }
        return playlist;
      })
    );
  };

  const updatePlaylistDetails = (playlistId, { name, description }) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            ...(name !== undefined && { name: name.trim() }),
            ...(description !== undefined && { description: description.trim() }),
          };
        }
        return playlist;
      })
    );
  };

  // --- Favorite Actions ---
  const toggleFavorite = (songId) => {
    setFavorites((prev) => {
      if (prev.includes(songId)) {
        return prev.filter((id) => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const isFavorite = (songId) => {
    return favorites.includes(songId);
  };

  // --- Recently Played Actions ---
  const addRecentlyPlayed = (songId) => {
    setRecentlyPlayed((prev) => {
      // Remove previous entry if exists
      const filtered = prev.filter((item) => item.songId !== songId);
      const updated = [{ songId, playedAt: new Date().toISOString() }, ...filtered];
      // Keep maximum 25 recent tracks
      return updated.slice(0, 25);
    });
  };

  const value = {
    playlists,
    favorites,
    recentlyPlayed,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylistDetails,
    toggleFavorite,
    isFavorite,
    addRecentlyPlayed,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylistContext must be used within a PlaylistProvider');
  }
  return context;
};
