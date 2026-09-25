import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { songs } from '../data/songs';

const AudioContext = createContext(null);

export const AudioProvider = ({ children, onSongPlay }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.duration || 0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // Playback mode & Queue controls
  const [queue, setQueue] = useState(songs);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'one' | 'all'

  // Initialize audio listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Update volume and mute state
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Track playback completion & auto-advance
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [queue, queueIndex, repeatMode, isShuffle]);

  // Actions
  const playTrack = (song, newQueue = null) => {
    if (!song) return;

    let targetQueue = queue;
    let targetIndex = queueIndex;

    if (newQueue && newQueue.length > 0) {
      targetQueue = newQueue;
      setQueue(newQueue);
      targetIndex = newQueue.findIndex((s) => s.id === song.id);
      if (targetIndex === -1) targetIndex = 0;
      setQueueIndex(targetIndex);
    } else {
      const idx = queue.findIndex((s) => s.id === song.id);
      if (idx !== -1) {
        setQueueIndex(idx);
      } else {
        targetQueue = [...queue, song];
        setQueue(targetQueue);
        setQueueIndex(targetQueue.length - 1);
      }
    }

    setCurrentSong(song);
    setCurrentTime(0);

    const audio = audioRef.current;
    audio.src = song.audioUrl;
    audio.currentTime = 0;
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
        if (onSongPlay) onSongPlay(song);
      })
      .catch((err) => {
        console.warn('Audio play request interrupted or preview URL fallback needed:', err);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentSong && queue.length > 0) {
      playTrack(queue[0]);
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      if (!audio.src && currentSong) {
        audio.src = currentSong.audioUrl;
      }
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const seek = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const setVolume = (level) => {
    const newVol = Math.max(0, Math.min(1, level));
    setVolumeState(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const nextTrack = () => {
    if (queue.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = queueIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setQueueIndex(nextIndex);
    playTrack(queue[nextIndex]);
  };

  const prevTrack = () => {
    if (queue.length === 0) return;

    if (currentTime > 3) {
      seek(0);
      return;
    }

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }
    setQueueIndex(prevIndex);
    playTrack(queue[prevIndex]);
  };

  const addToQueue = (song) => {
    setQueue((prev) => {
      if (prev.some((s) => s.id === song.id)) return prev;
      return [...prev, song];
    });
  };

  const removeFromQueue = (songId) => {
    setQueue((prev) => prev.filter((s) => s.id !== songId));
  };

  const toggleShuffle = () => setIsShuffle((prev) => !prev);

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const value = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    queue,
    queueIndex,
    isShuffle,
    repeatMode,
    playTrack,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    addToQueue,
    removeFromQueue,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
