import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPages, setActivePage } from '../../store/pagesSlice';
import Avatar from '../ui/Avatar';
import { useEffect } from 'react';

function Navbar({ pages, activePageStates, player }) {
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    const handleNavClick = (pageId) => {
        dispatch(setActivePage(pageId)); // Define a página ativa
        if (menuOpen) setMenuOpen(false); // Fecha o menu mobile, se estiver aberto
    };

    const getButtonClasses = (pageId) => {
        return activePageStates[pageId]
            ? "text-emerald-400 transition"
            : "text-white hover:text-emerald-400 transition";
    };

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
                    {pages.map(page => (
                        <button
                            key={page.id}
                            onClick={() => handleNavClick(page.id)}
                            className={getButtonClasses(page.id)}
                        >
                            {page.icon && <span className="mr-1">{page.icon}</span>}
                            {page.title}
                            {page.suffixIcon && <span className="ml-1">{page.suffixIcon}</span>}
                        </button>
                    ))}
                </div>

                {/* User Avatar */}
                <div className="relative">
                    <Avatar username={player.name} />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mt-4 md:hidden flex flex-col space-y-3">
                    {pages.map(page => (
                        <button
                            key={page.id}
                            onClick={() => handleNavClick(page.id)}
                            className={getButtonClasses(page.id) + " -mx-6 border-t pt-2 border-neutral-700"}
                        >
                            {page.icon && <span className="mr-2">{page.icon}</span>}
                            {page.title}
                            {page.suffixIcon && <span className="ml-2">{page.suffixIcon}</span>}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
