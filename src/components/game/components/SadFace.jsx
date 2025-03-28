import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SadFace({ position = [0, 0, 0] }) {
    const groupRef = useRef();

    // Animação suave de flutuação
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Rosto (esfera amarela) - reduzido de 0.5 para 0.3 */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#FFD54F" />
            </mesh>

            {/* Olho esquerdo - reduzido proporcionalmente */}
            <mesh position={[-0.12, 0.09, 0.25]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#263238" />
            </mesh>

            {/* Olho direito - reduzido proporcionalmente */}
            <mesh position={[0.12, 0.09, 0.25]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#263238" />
            </mesh>

            {/* Bico de Pato no lugar da boca */}
            <mesh position={[0, 0, 0.25]}>
                <group position={[0, -0.08, 0.05]}>
                    {/* Parte superior do bico */}
                    <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.05, 0, 0]}>
                        <boxGeometry args={[0.15, 0.03, 0.12]} />
                        <meshStandardMaterial color="#FF9800" />
                    </mesh>

                    {/* Parte inferior do bico */}
                    <mesh position={[0, -0.025, 0]} rotation={[-Math.PI * 0.05, 0, 0]}>
                        <boxGeometry args={[0.13, 0.025, 0.1]} />
                        <meshStandardMaterial color="#E65100" />
                    </mesh>
                </group>
            </mesh>
        </group>
    );
}

export default SadFace;
