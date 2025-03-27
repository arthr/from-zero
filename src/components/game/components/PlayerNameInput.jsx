import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlayerNameInput() {
    const currentPlayerName = useSelector(state => state.player.name) || '';
    const [localPlayerName, setLocalPlayerName] = useState(currentPlayerName);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setLocalPlayerName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localPlayerName.trim()) {
            dispatch({ type: 'player/setName', payload: localPlayerName });
        }
    };

    return (
        <div className="absolute top-4 left-4 z-10 bg-slate-800/70 backdrop-blur-sm rounded-lg p-3 text-white">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <label htmlFor="playerName" className="text-sm font-medium">Nome:</label>
                <input
                    id="playerName"
                    type="text"
                    value={localPlayerName}
                    onChange={handleChange}
                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 rounded px-2 py-1 text-xs font-medium transition-colors"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default PlayerNameInput;
