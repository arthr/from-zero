import React from 'react';
import Card from '../ui/Card';
import { useSelector } from 'react-redux';

function PlayerStats() {
    // Obtendo os dados das estatísticas do jogador do Redux
    const playerStats = useSelector((state) => state.player.stats);

    // Transformando o objeto em array para manter o padrão de renderização
    const stats = [
        { name: 'FOR', value: playerStats.strength },
        { name: 'AGI', value: playerStats.agility },
        { name: 'INT', value: playerStats.intelligence },
        { name: 'SOR', value: playerStats.luck },
    ];

    return (
        <Card title="Estatísticas">
            <div className="grid grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-neutral-400">{stat.name}</span>
                        <span className="text-lg font-bold">{stat.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default PlayerStats;
