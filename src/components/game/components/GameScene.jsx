import React from 'react';
import { useSelector } from 'react-redux';
import { Stars, Text, OrbitControls } from '@react-three/drei';
import RotatingBox from './RotatingBox';
import PulsingSphere from './PulsingSphere';
import WavyPlane from './WavyPlane';
import InventoryDisplay from './InventoryDisplay';

function GameScene({ showInventory }) {
    // Usando o Redux store
    const uiTheme = useSelector(state => state.ui.theme) || 'dark';
    const gameStatus = useSelector(state => state.game.status) || 'waiting';
    const playerName = useSelector(state => state.player.name) || 'Jogador';

    return (
        <>
            <color attach="background" args={[uiTheme === 'dark' ? '#0f172a' : '#f8fafc']} />
            <fog attach="fog" args={[uiTheme === 'dark' ? '#0f172a' : '#f8fafc', 5, 15]} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

            <Stars radius={100} depth={50} count={3000} factor={4} fade />

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
                color={uiTheme === 'dark' ? '#ffffff' : '#0f172a'}
                fontSize={0.5}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
            >
                {gameStatus === 'active' ? 'Jogo em Andamento' : 'Aguardando Início'}
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
