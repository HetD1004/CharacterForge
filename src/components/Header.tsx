import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brand-blue dark:text-blue-400">
          CharacterForge
        </Link>
        <div className="flex items-center gap-6">
          <nav className="space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/persona-interview" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
              Create Persona
            </Link>
            <Link to="/mood-board" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
              Create Mood Board
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
