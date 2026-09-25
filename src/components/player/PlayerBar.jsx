import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Disc,
} from 'lucide-react';
import { useAudioContext } from '../../context/AudioContext';
import { FavoriteButton } from '../common/FavoriteButton';
import { QueueDrawer } from './QueueDrawer';
import { formatTime } from '../../utils/formatTime';

export const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    toggleShuffle,
    toggleRepeat,
  } = useAudioContext();

  const [isQueueOpen, setIsQueueOpen] = useState(false);

  if (!currentSong) return null;

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-2xl px-4 md:px-6 flex items-center justify-between z-40 select-none">
        {/* 1. Track Info Section */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0 group">
            <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover" />
            {isPlaying && (
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            )}
          </div>

          <div className="truncate min-w-0">
            <h4 className="text-sm font-bold text-slate-100 truncate">{currentSong.title}</h4>
            <p className="text-xs text-slate-400 truncate mt-0.5">{currentSong.artist}</p>
          </div>

          <div className="hidden sm:block">
            <FavoriteButton songId={currentSong.id} size="sm" />
          </div>
        </div>

        {/* 2. Audio Player Controls & Seek Bar */}
        <div className="flex flex-col items-center gap-1.5 max-w-xl w-full px-2">
          {/* Main Control Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleShuffle}
              title={`Shuffle: ${isShuffle ? 'On' : 'Off'}`}
              className={`p-1.5 rounded-lg transition-colors hidden sm:block ${
                isShuffle ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={prevTrack}
              title="Previous Track"
              className="text-slate-300 hover:text-white transition-colors p-1"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-slate-950" />
              ) : (
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              title="Next Track"
              className="text-slate-300 hover:text-white transition-colors p-1"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={toggleRepeat}
              title={`Repeat: ${repeatMode}`}
              className={`p-1.5 rounded-lg transition-colors hidden sm:block ${
                repeatMode !== 'off' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Seek Progress Bar */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 3. Volume & Queue Controls */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-400 hover:text-slate-200">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsQueueOpen(!isQueueOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isQueueOpen
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
            title="Toggle Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Queue Drawer Component */}
      <QueueDrawer isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
    </>
  );
};
