import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, Icosahedron, Torus } from '@react-three/drei';

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
            case 'gold': return '#f59e0b';   // Dourado
            case 'ammo': return '#737373';   // Cinza
            default: return '#f59e0b';       // Amarelo (padrão)
        }
    };

    // Escolhe uma forma baseada no tipo
    const renderItemShape = (type) => {
        switch (type) {
            case 'weapon':
                return (
                    <group>
                        {/* Lâmina da espada */}
                        <Box args={[0.2, 0.6, 0.05]} position={[0, 0.3, 0]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.8} roughness={0.2} />
                        </Box>
                        {/* Cabo */}
                        <Box args={[0.1, 0.25, 0.1]} position={[0, -0.1, 0]}>
                            <meshStandardMaterial color="#5D4037" metalness={0.3} roughness={0.8} />
                        </Box>
                        {/* Guarda */}
                        <Box args={[0.3, 0.05, 0.1]} position={[0, 0.05, 0]}>
                            <meshStandardMaterial color="#8D6E63" metalness={0.6} roughness={0.3} />
                        </Box>
                    </group>
                );

            case 'armor':
                return (
                    <group>
                        {/* Corpo do escudo */}
                        <Box args={[0.6, 0.8, 0.1]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.7} roughness={0.3} />
                        </Box>
                        {/* Detalhes do escudo */}
                        <Box args={[0.5, 0.7, 0.05]} position={[0, 0, 0.08]}>
                            <meshStandardMaterial color="#1E40AF" metalness={0.5} roughness={0.4} />
                        </Box>
                    </group>
                );

            case 'potion':
                return (
                    <group>
                        {/* Corpo do frasco */}
                        <Cylinder args={[0.2, 0.3, 0.6, 8]} position={[0, -0.1, 0]}>
                            <meshStandardMaterial color={getItemColor(type)} transparent opacity={0.8} roughness={0.2} />
                        </Cylinder>
                        {/* Tampa */}
                        <Cylinder args={[0.1, 0.15, 0.15, 8]} position={[0, 0.25, 0]}>
                            <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
                        </Cylinder>
                    </group>
                );

            case 'scroll':
                return (
                    <group>
                        {/* Pergaminho enrolado */}
                        <Cylinder args={[0.2, 0.2, 0.6, 8]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshStandardMaterial color="#D4C4A8" roughness={0.9} metalness={0.1} />
                        </Cylinder>
                        {/* Extremidades */}
                        <Cylinder args={[0.25, 0.25, 0.1, 8]} position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshStandardMaterial color="#8D6E63" roughness={0.7} metalness={0.2} />
                        </Cylinder>
                        <Cylinder args={[0.25, 0.25, 0.1, 8]} position={[0, 0, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshStandardMaterial color="#8D6E63" roughness={0.7} metalness={0.2} />
                        </Cylinder>
                    </group>
                );

            case 'gold':
                return (
                    <group>
                        {/* Pilha de moedas */}
                        <Cylinder args={[0.3, 0.3, 0.05, 16]} position={[0, 0, 0]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.9} roughness={0.1} />
                        </Cylinder>
                        <Cylinder args={[0.3, 0.3, 0.05, 16]} position={[0.05, 0.06, 0.05]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.9} roughness={0.1} />
                        </Cylinder>
                        <Cylinder args={[0.3, 0.3, 0.05, 16]} position={[-0.05, 0.12, -0.05]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.9} roughness={0.1} />
                        </Cylinder>
                    </group>
                );

            case 'ammo':
                return (
                    <group>
                        {/* Feixe de flechas */}
                        <Cylinder args={[0.04, 0.04, 0.8, 6]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial color="#A0522D" roughness={0.7} />
                        </Cylinder>
                        <Cylinder args={[0.04, 0.01, 0.2, 6]} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.8} roughness={0.2} />
                        </Cylinder>
                        {/* Flechas adicionais */}
                        <Cylinder args={[0.04, 0.04, 0.8, 6]} position={[0, 0.08, 0.08]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial color="#A0522D" roughness={0.7} />
                        </Cylinder>
                        <Cylinder args={[0.04, 0.01, 0.2, 6]} position={[0.5, 0.08, 0.08]} rotation={[0, 0, Math.PI / 2]}>
                            <meshStandardMaterial color={getItemColor(type)} metalness={0.8} roughness={0.2} />
                        </Cylinder>
                    </group>
                );

            default:
                return <sphereGeometry args={[0.4, 8, 8]} />;
        }
    };

    return (
        <group position={[x, 0, z]}>
            <group
                ref={ref}
                castShadow
                receiveShadow
            >
                {renderItemShape(item.type)}
            </group>

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
