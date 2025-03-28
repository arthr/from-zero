import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

import { fetchPlayer } from '../../store/playerSlice'

function PlayerInfo() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);

    useEffect(() => {
        dispatch(fetchPlayer());
    }, [dispatch]);

    // Verifica se o jogador está carregando
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
                    <div key={index} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                            <span>{statsName}</span>
                            <span>∞{(statsName === "Experiência") ? "%" : "/∞"}</span>
                        </div>
                        <div className="w-full animate-pulse bg-neutral-700 rounded-full h-2"></div>
                    </div>
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
            <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                    <span>Vida</span>
                    <span>{player.health}/100</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${player.health}%` }}
                    ></div>
                </div>
            </div>

            {/* Barra de Energia */}
            <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                    <span>Energia</span>
                    <span>{player.energy}/100</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${player.energy}%` }}
                    ></div>
                </div>
            </div>

            {/* Barra de XP */}
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Experiência</span>
                    <span>{player.xp}%</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${player.xp}%` }}
                    ></div>
                </div>
            </div>
        </Card>
    );
}

export default PlayerInfo;
