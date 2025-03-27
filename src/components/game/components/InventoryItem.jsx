import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function InventoryItem({ item, index, total }) {
    const ref = useRef();

    // Calcular a posição com base no índice e no total
    const angle = (index / total) * Math.PI * 2;
    const radius = 3;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    useFrame((state) => {
        // Faz o item flutuar suavemente
        ref.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime + index) * 0.1;
        // Faz o item rotacionar em direção ao centro
        ref.current.rotation.y = Math.atan2(ref.current.position.x, ref.current.position.z) + Math.PI;
    });

    // Escolhe uma cor baseada no tipo do item
    const getItemColor = (type) => {
        switch (type) {
            case 'weapon': return '#ef4444'; // Vermelho
            case 'armor': return '#3b82f6';  // Azul
            case 'potion': return '#10b981'; // Verde
            case 'scroll': return '#a855f7'; // Roxo
            default: return '#f59e0b';       // Amarelo (padrão)
        }
    };

    // Escolhe uma forma baseada no tipo
    const renderItemShape = (type) => {
        switch (type) {
            case 'weapon':
                return <boxGeometry args={[0.5, 0.5, 1.5]} />;
            case 'armor':
                return <icosahedronGeometry args={[0.5, 1]} />;
            case 'potion':
                return <cylinderGeometry args={[0.2, 0.4, 0.8, 16]} />;
            case 'scroll':
                return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
            default:
                return <sphereGeometry args={[0.4, 16, 16]} />;
        }
    };

    return (
        <group position={[x, 0, z]}>
            <mesh
                ref={ref}
                castShadow
                receiveShadow
            >
                {renderItemShape(item.type)}
                <meshStandardMaterial
                    color={getItemColor(item.type)}
                    roughness={0.5}
                    metalness={0.5}
                />
            </mesh>

            <Text
                position={[0, -1.2, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {item.name}
            </Text>

            {item.quantity > 1 && (
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.15}
                    color="#f8fafc"
                    anchorX="center"
                    anchorY="middle"
                >
                    x{item.quantity}
                </Text>
            )}
        </group>
    );
}

export default InventoryItem;
