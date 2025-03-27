import React, { useState } from 'react';
import Avatar from '../ui/Avatar';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-neutral-800 shadow-md py-3 px-6">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <span className="text-emerald-500">Game</span>
                    <span className="text-white">Hub</span>
                </div>

                {/* Menu hamburguer para mobile */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-white hover:text-emerald-400 transition">Home</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Jogo</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Ranking</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Configurações</a>
                </div>

                {/* User Avatar */}
                <div className="relative">
                    <Avatar username="Player1" />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mt-4 md:hidden flex flex-col space-y-3">
                    <a href="#" className="text-white hover:text-emerald-400 transition">Home</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Jogo</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Ranking</a>
                    <a href="#" className="text-white hover:text-emerald-400 transition">Configurações</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
