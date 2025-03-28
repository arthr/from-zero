import React from 'react';
import { useSelector } from 'react-redux';
import { Text, OrbitControls } from '@react-three/drei';
import RotatingBox from './RotatingBox';
import PulsingSphere from './PulsingSphere';
import WavyPlane from './WavyPlane';
import InventoryDisplay from './InventoryDisplay';
import SpaceIllumination from './SpaceIllumination';

function GameScene({ showInventory }) {
    // Usando o Redux store
    const gamePhase = useSelector(state => state.game.gamePhase) || 'waiting';
    const playerName = useSelector(state => state.player.name) || 'Jogador';

    const statusMessages = {
        dev: 'Modo de Desenvolvimento',
        active: 'Jogo em Andamento',
        setup: 'Configurando o Jogo',
        waiting: 'Aguardando Início',
        play: 'Jogo em Andamento',
        end: 'Fim de Jogo',
    };

    return (
        <>
            <color attach="background" args={['#050A24']} />
            <fog attach="fog" args={['#050A24', 5, 15]} />

            {/* Substituímos as luzes básicas pelo nosso componente de iluminação espacial */}
            <SpaceIllumination />

            {/* Removemos as Stars porque o SpaceIllumination já inclui partículas de estrelas */}
            {/* Stars foi removido daqui */}

            <WavyPlane position={[0, -1, 0]} />

            {/* Mostrar itens do inventário ou os objetos padrão */}
            {showInventory ? (
                <InventoryDisplay />
            ) : (
                <>
                    <RotatingBox position={[-2, 0, 0]} color="#10b981" />
                    <PulsingSphere position={[2, 0, 0]} color="#60a5fa" />
                </>
            )}

            <Text
                position={[0, 1.5, 0]}
                color="#ffffff"
                fontSize={0.5}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
            >
                {statusMessages[gamePhase] || 'Status Desconhecido'}
            </Text>

            <Text
                position={[0, 0.8, 0]}
                color="#10b981"
                fontSize={0.3}
                maxWidth={10}
                textAlign="center"
            >
                {`Olá, ${playerName}`}
            </Text>

            <OrbitControls enableZoom={false} autoRotate={!showInventory} autoRotateSpeed={0.5} />
        </>
    );
}

export default GameScene;
