import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Library, ListMusic, Heart, User } from 'lucide-react';

export const MobileNav = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Library },
    { path: '/playlists', label: 'Playlists', icon: ListMusic },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/dashboard', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-20 left-0 right-0 h-14 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-lg flex items-center justify-around px-2 z-40">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full py-1 text-xs transition-colors ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
