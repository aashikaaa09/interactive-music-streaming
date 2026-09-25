import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { PlaylistProvider, usePlaylistContext } from './context/PlaylistContext';
import { SearchProvider } from './context/SearchContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { PlayerBar } from './components/player/PlayerBar';
import { CreatePlaylistModal } from './components/playlist/CreatePlaylistModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { PlaylistDetailPage } from './pages/PlaylistDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { RecentlyPlayedPage } from './pages/RecentlyPlayedPage';
import { DashboardPage } from './pages/DashboardPage';

const AppLayout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      <div className="flex-1 flex overflow-hidden pb-24">
        {/* Desktop Sidebar */}
        <Sidebar onCreatePlaylist={() => setIsCreatePlaylistOpen(true)} />

        {/* Main Content Router View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/recently-played" element={<RecentlyPlayedPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />

      {/* Persistent Audio Player Bar */}
      <PlayerBar />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
      />
    </div>
  );
};

const AudioWithPlaylistWrapper = () => {
  const { addRecentlyPlayed } = usePlaylistContext();

  return (
    <AudioProvider onSongPlay={(song) => addRecentlyPlayed(song.id)}>
      <SearchProvider>
        <Router>
          <AppLayout />
        </Router>
      </SearchProvider>
    </AudioProvider>
  );
};

function App() {
  return (
    <PlaylistProvider>
      <AudioWithPlaylistWrapper />
    </PlaylistProvider>
  );
}

export default App;
