import React from 'react';
import { Play, Sparkles, TrendingUp, Music, Flame } from 'lucide-react';
import { songs, artists, albums } from '../data/songs';
import { SongCard } from '../components/library/SongCard';
import { ArtistCard } from '../components/library/ArtistCard';
import { AlbumCard } from '../components/library/AlbumCard';
import { useAudioContext } from '../context/AudioContext';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { playTrack } = useAudioContext();
  const navigate = useNavigate();
  
  const heroSong = songs[0];
  const featuredSongs = songs.slice(0, 5);
  const trendingSongs = songs.slice(5, 10);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Featured Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Release</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {heroSong.title}
            </h1>
            <p className="text-sm text-slate-300">
              By <span className="text-emerald-400 font-semibold">{heroSong.artist}</span> • Album <span className="text-slate-200">{heroSong.album}</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              Experience retro-futuristic synthwave melodies with crisp sound design and deep atmospheric synth pulses.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => playTrack(heroSong, songs)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Listen Now
              </button>
              <button
                onClick={() => navigate('/search')}
                className="px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs border border-slate-700/60 transition-colors"
              >
                Explore Library
              </button>
            </div>
          </div>

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl flex-shrink-0 group">
            <img src={heroSong.coverUrl} alt={heroSong.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Featured Songs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400" />
            Featured Tracks
          </h2>
          <button
            onClick={() => navigate('/search')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredSongs.map((song) => (
            <SongCard key={song.id} song={song} layout="grid" />
          ))}
        </div>
      </div>

      {/* Featured Artists Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-400" />
            Popular Artists
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

      {/* Trending Tracks Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Trending Right Now
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} layout="grid" />
          ))}
        </div>
      </div>

      {/* Popular Albums Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Popular Albums</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
};
