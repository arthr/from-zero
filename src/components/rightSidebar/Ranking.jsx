import React from 'react';
import { useSelector } from 'react-redux';

function Ranking() {
    // Usando Redux para acessar os dados do ranking
    const players = useSelector((state) => state.ranking);

    // Ordenando os jogadores pelo score (decrescente - do maior para o menor)
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
        <div className="space-y-2">
            {sortedPlayers.map((player, index) => (
                <div
                    key={player.id}
                    className={`flex items-center text-sm py-2 px-2 rounded ${player.isCurrentUser ? 'bg-neutral-700' : 'hover:bg-neutral-700'
                        }`}
                >
                    <span className="w-6 text-center font-bold text-emerald-500">#{index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center text-white font-bold mx-3">
                        {player.name.charAt(0) + player.name.charAt(1)}
                    </div>
                    <div className="flex-grow">
                        <p className={player.isCurrentUser ? 'font-bold' : ''}>{player.name}</p>
                    </div>
                    <span className="font-mono font-bold">{player.score}</span>
                </div>
            ))}
        </div>
    );
}

export default Ranking;
