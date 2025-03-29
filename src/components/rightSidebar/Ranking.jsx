import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FaMedal } from "react-icons/fa";

import { fetchRanking } from '../../store/rankingSlice';

function Ranking() {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.ranking.data);

    useEffect(() => {
        dispatch(fetchRanking());
    }, [dispatch]);

    // Ordenando os jogadores pelo score (decrescente - do maior para o menor)
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
        <div className="space-y-2">
            {sortedPlayers.map((player, index) => {
                const medalColors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
                const medalBgColors = [
                    'bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 ring-2 ring-yellow-400 text-white text-lg shadow-md',
                    'bg-gradient-to-tr from-gray-400 via-neutral-300 to-gray-500 ring-2 ring-gray-400 text-white text-lg shadow-md',
                    'bg-gradient-to-tr from-amber-600 via-orange-400 to-amber-500 ring-2 ring-orange-400 text-white text-lg shadow-md'
                ];
                const medalColor = medalColors[index] || 'text-emerald-500';
                const medalBgColor = medalBgColors[index] || 'bg-gradient-to-tr from-neutral-600 to-neutral-700 ring-2 ring-neutral-500 text-emerald-500 text-lg shadow';

                return (
                    <div
                        key={player.id}
                        className={`flex items-center text-sm py-2 px-2 rounded ${player.isCurrentUser ? 'bg-neutral-700' : 'hover:bg-neutral-700'
                            }`}
                    >
                        <span className="w-6 text-center font-bold text-emerald-500">#{index + 1}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mx-3 shadow-md ${medalBgColor}`}>
                            <FaMedal className={`${medalColor}`} style={{ filter: 'drop-shadow(rgba(0, 0, 0, 0.8) 0px 2px 0px)' }} />
                        </div>
                        <div className="flex-grow">
                            <p className={player.isCurrentUser ? 'font-bold' : ''}>{player.name}</p>
                        </div>
                        <span className="font-mono font-bold">{player.score}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Ranking;
