import React from 'react';
import { Header } from '../common/Header';
import { Sidebar } from './Sidebar';
import { PlayerBar } from '../player/PlayerBar';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex overflow-hidden pb-20">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
      <PlayerBar />
    </div>
  );
};
