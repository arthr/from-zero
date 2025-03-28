import React, { useState } from 'react';

function Avatar({ username, imageUrl }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Avatar placeholder if no image provided
    const initials = username ? username.charAt(0).toUpperCase() : '?';

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={username}
                        className="w-10 h-10 rounded-full border-2 border-emerald-500"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                        {initials}
                    </div>
                )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-neutral-700">Perfil</a>
                        <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-neutral-700">Configurações</a>
                        <div className="border-t border-neutral-700"></div>
                        <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-neutral-700">Sair</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Avatar;
