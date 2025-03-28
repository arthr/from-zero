import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../ui/Card';

import { fetchPlayer } from '../../store/playerSlice';
import AnimatedCounter from '../ui/AnimatedCounter';

function PlayerStats() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state) => state.player.stats);
    const playerLoading = useSelector((state) => state.player.loading);

    const [stats, setStats] = useState([]);

    const calculatedDuration = (value, maxValue) => {
        const minDuration = 500;
        const maxDuration = 3000;
        const duration = Math.min(Math.max((value / maxValue) * 2000, minDuration), maxDuration);
        return duration;
    };

    useEffect(() => {
        dispatch(fetchPlayer());
    }, [dispatch]);
    // Atualiza os stats quando o jogador é carregado
    useEffect(() => {
        const statsData = [
            { name: 'FOR', value: playerStats.strength },
            { name: 'AGI', value: playerStats.agility },
            { name: 'INT', value: playerStats.intelligence },
            { name: 'LCK', value: playerStats.luck },
        ];
        setStats(statsData);
    }, [playerStats]);

    // Verifica se o jogador está carregando
    if (!playerLoading) {
        return (
            <Card title="Estatísticas">
                <div className="animate-pulse grid grid-cols-4 gap-3">
                    {Array.from({ length: 4 }, () => ({
                        name: `0`,
                        value: 0,
                    })).map((stat, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-sm bg-neutral-700 rounded text-transparent">{stat.name}</span>
                            <span className="text-sm bg-neutral-700 rounded font-bold mt-2 text-transparent">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card title="Estatísticas">
            <div className="grid grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-neutral-400">{stat.name}</span>
                        <span className="text-lg font-bold">
                            <AnimatedCounter value={stat.value} duration={calculatedDuration(stat.value, 100)} />
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default PlayerStats;
