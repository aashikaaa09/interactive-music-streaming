import { useMemo } from 'react';
import { usePlaylistContext } from '../context/PlaylistContext';
import { songs } from '../data/songs';

/**
 * Custom hook to aggregate data for the User Dashboard view
 */
export const useDashboardData = () => {
  const { playlists, favorites, recentlyPlayed } = usePlaylistContext();

  // Resolved Favorite Songs
  const favoriteSongs = useMemo(() => {
    return favorites
      .map((id) => songs.find((s) => s.id === id))
      .filter(Boolean);
  }, [favorites]);

  // Resolved Recently Played Tracks with timestamp
  const recentlyPlayedSongs = useMemo(() => {
    return recentlyPlayed
      .map((item) => {
        const song = songs.find((s) => s.id === item.songId);
        if (!song) return null;
        return {
          ...song,
          playedAt: item.playedAt,
        };
      })
      .filter(Boolean);
  }, [recentlyPlayed]);

  // Resolved Playlists with song count and cover art
  const enrichedPlaylists = useMemo(() => {
    return playlists.map((playlist) => {
      const playlistSongs = playlist.songIds
        .map((id) => songs.find((s) => s.id === id))
        .filter(Boolean);
      
      const coverUrl =
        playlistSongs.length > 0
          ? playlistSongs[0].coverUrl
          : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

      const totalDuration = playlistSongs.reduce((acc, s) => acc + (s.duration || 0), 0);

      return {
        ...playlist,
        songsCount: playlistSongs.length,
        totalDuration,
        coverUrl,
        songs: playlistSongs,
      };
    });
  }, [playlists]);

  // Aggregate Dashboard Analytics & Genre breakdown
  const stats = useMemo(() => {
    const genreCounts = {};
    favoriteSongs.forEach((song) => {
      if (song.genre) {
        genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
      }
    });

    const topGenres = Object.entries(genreCounts)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);

    const totalFavoriteDuration = favoriteSongs.reduce((acc, s) => acc + (s.duration || 0), 0);

    return {
      totalPlaylists: playlists.length,
      totalFavorites: favoriteSongs.length,
      totalRecentlyPlayed: recentlyPlayed.length,
      totalFavoriteDuration,
      topGenres,
    };
  }, [playlists, favoriteSongs, recentlyPlayed]);

  return {
    playlists: enrichedPlaylists,
    favoriteSongs,
    recentlyPlayedSongs,
    stats,
  };
};
