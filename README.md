# 🎵 Interactive Music Streaming Web Application

A responsive music streaming frontend application developed using React.js and Tailwind CSS as part of a web development internship project. The application provides a modern music listening experience with song discovery, audio playback, search and filtering, favorites, playlists, recently played tracks, and a user dashboard.

## ✨ Features

- 🎵 Modern music streaming interface
- 🎤 Artist, album, and song sections
- ▶️ Functional audio player
- ⏯️ Play / pause controls
- ⏩ Seek and playback progress control
- 🔊 Volume control
- 📋 Queue management
- 🔍 Search and filtering
- ❤️ Favorite songs
- 🎶 Playlist creation and management
- 🕘 Recently played songs
- 📊 User dashboard
- 💾 Browser localStorage persistence
- 📱 Responsive desktop and mobile design
- ♻️ Reusable React components

## 🛠️ Technologies

- React.js
- JavaScript / JSX
- Tailwind CSS
- Vite
- React Router
- HTML5 Audio
- Browser localStorage

## 📁 Project Structure

```text
interactive-music-streaming/
│
├── public/
│   └── audio/
│       ├── song-1.mp3
│       ├── song-2.mp3
│       ├── ...
│       └── song-16.mp3
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── FavoriteButton.jsx
│   │   │   └── Header.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── RecentlyPlayedSection.jsx
│   │   │   └── UserStatsWidget.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── library/
│   │   │   ├── AlbumCard.jsx
│   │   │   ├── ArtistCard.jsx
│   │   │   ├── SearchFilterBar.jsx
│   │   │   └── SongCard.jsx
│   │   │
│   │   ├── player/
│   │   │   ├── PlayerBar.jsx
│   │   │   └── QueueDrawer.jsx
│   │   │
│   │   └── playlist/
│   │       ├── CreatePlaylistModal.jsx
│   │       └── PlaylistCard.jsx
│   │
│   ├── context/
│   │   ├── AudioContext.jsx
│   │   ├── PlaylistContext.jsx
│   │   └── SearchContext.jsx
│   │
│   ├── data/
│   │   └── songs.js
│   │
│   ├── hooks/
│   │   ├── useDashboardData.js
│   │   ├── useLocalStorage.js
│   │   └── useMusicSearch.js
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── PlaylistDetailPage.jsx
│   │   ├── PlaylistsPage.jsx
│   │   ├── RecentlyPlayedPage.jsx
│   │   └── SearchPage.jsx
│   │
│   ├── utils/
│   │   ├── audioGenerator.js
│   │   └── formatTime.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/aashikaaa09/interactive-music-streaming.git
cd interactive-music-streaming
npm install
```

### Run the Application

```bash
npm run dev
```

The application will be available at the local development server provided by Vite.

## 🎧 Audio Player

The application includes a functional frontend audio player using HTML5 audio.

The player supports:

Play and pause
Track selection
Playback progress
Seeking
Volume adjustment
Queue management
Automatic tracking of recently played songs

The application uses locally stored MP3 files from the public/audio/ directory.

## ❤️ Favorites

Users can mark songs as favorites directly from the interface.
Favorite selections are stored using browser localStorage, allowing the selected songs to remain available after refreshing the page.

## 🎶 Playlists

Users can create and manage playlists through the application.
Playlist data is persisted using browser localStorage, allowing playlists and their songs to remain available across page refreshes.

## 🕘 Recently Played

The application records songs played by the user and displays them in the recently played section.
Recently played data is stored locally in the browser.

## 🔍 Search and Filtering

Users can search through the music library and filter available songs using the search interface.
Search functionality supports discovering songs within the application's music library without requiring an external backend service.

## 📊 User Dashboard

The dashboard provides an overview of the user's music activity, including:
Recently played songs
Favorite songs
Playlist information
User music statistics

## 📱 Responsive Design

The interface is designed to adapt across:
Desktop screens
Tablets
Mobile devices

The layout includes responsive navigation, library sections, and a responsive audio player for different screen sizes.

## 🗺️ Application Pages

| Page               | Description                       |
| ------------------ | --------------------------------- |
| `/`                | Home page and music discovery     |
| `/search`          | Search and filtering interface    |
| `/favorites`       | Favorite songs                    |
| `/playlists`       | User playlists                    |
| `/playlists/:id`   | Playlist details and songs        |
| `/recently-played` | Recently played songs             |
| `/dashboard`       | User dashboard and music activity |

## 💾 Client-Side Features

Audio Playback
Music tracks are played directly in the browser using the HTML5 audio functionality and locally stored MP3 files.

Favorites
Favorite songs are stored using browser localStorage so that selections persist after refreshing the page.

Playlists
User-created playlists and their contents are persisted locally using localStorage.

Recently Played
Recently played tracks are recorded locally and displayed in the application's recently played sections.

Search
Music can be searched and filtered dynamically through the application's search interface.

## 👩‍💻 Author

Aashika Kiran Nair
