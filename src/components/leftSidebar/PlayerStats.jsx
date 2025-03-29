import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../ui/Card';
import AnimatedCounter from '../ui/AnimatedCounter';

import { fetchPlayer } from '../../store/playerSlice';

import { calculateDuration } from '../../utils/animationUtils';

function PlayerStats() {
    const dispatch = useDispatch();
    const playerStats = useSelector((state) => state.player.stats);
    const playerLoading = useSelector((state) => state.player.loading);

    const [stats, setStats] = useState([]);

    useEffect(() => {
        dispatch(fetchPlayer());
    }, [dispatch]);

    useEffect(() => {
        const statsData = [
            { name: 'FOR', value: playerStats.strength },
            { name: 'AGI', value: playerStats.agility },
            { name: 'INT', value: playerStats.intelligence },
            { name: 'LCK', value: playerStats.luck },
        ];
        setStats(statsData);
    }, [playerStats]);

    if (playerLoading) {
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
            <div className="grid grid-cols-4 gap-3 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-neutral-400">{stat.name}</span>
                        <span className="text-lg font-bold">
                            <AnimatedCounter value={stat.value} duration={calculateDuration(stat.value, 100, 500, 3000)} />
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default PlayerStats;
