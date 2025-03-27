import React, { useState } from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { GameScene, PlayerNameInput } from './components';

function Canvas() {
    const [showInventory, setShowInventory] = useState(false);

    return (
        <div className="w-full h-full rounded-lg shadow-lg overflow-hidden relative">
            {/* Input para nome do jogador (canto superior esquerdo) */}
            <PlayerNameInput />

            {/* Botão de controle do inventário (canto superior direito) */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={() => setShowInventory(!showInventory)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm font-medium shadow-lg transition-colors flex items-center"
                >
                    <span className="mr-1">{showInventory ? "Esconder" : "Ver"} Inventário</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <ThreeCanvas camera={{ position: [0, 3, 5] }}>
                <GameScene showInventory={showInventory} />
            </ThreeCanvas>
        </div>
    );
}

export default Canvas;
