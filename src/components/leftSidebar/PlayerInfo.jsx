import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import ProgressBar from '../ui/ProgressBar'; // Importa o novo subcomponente

import { fetchPlayer } from '../../store/playerSlice';

function PlayerInfo() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);

    useEffect(() => {
        dispatch(fetchPlayer());
    }, [dispatch]);

    if (!player.loading) {
        return (
            <Card title="Informações do Jogador">
                <div className="animate-pulse flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
                    <div className="ml-3">
                        <div className="h-4 bg-neutral-700 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-neutral-700 rounded w-16"></div>
                    </div>
                </div>
                {["Vida", "Energia", "Experiência"].map((statsName, index) => (
                    <ProgressBar
                        key={index}
                        label={statsName}
                        value={0}
                        maxValue={0}
                        color="bg-red-500"
                    />
                ))}
            </Card>
        );
    }

    return (
        <Card title="Informações do Jogador">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold mr-3">
                    <Avatar username={player.name} />
                </div>
                <div>
                    <h4 className="font-bold text-white">{player.name}</h4>
                    <p className="text-sm text-neutral-400">Nível {player.level}</p>
                </div>
            </div>

            {/* Barra de Vida */}
            <ProgressBar
                label="Vida"
                value={player.health}
                maxValue={300}
                color="bg-red-500"
            />

            {/* Barra de Energia */}
            <ProgressBar
                label="Energia"
                value={player.energy}
                maxValue={100}
                color="bg-blue-500"
            />

            {/* Barra de Experiência */}
            <ProgressBar
                label="Experiência"
                value={player.xp}
                maxValue={10000}
                color="bg-emerald-500"
            />
        </Card>
    );
}

export default PlayerInfo;
