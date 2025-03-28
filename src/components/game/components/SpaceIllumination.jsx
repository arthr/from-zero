import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, SpotLight } from '@react-three/drei';

function SpaceIllumination() {
    const starRef = useRef();
    const spotLightRef = useRef();

    // Faz a luz piscar suavemente
    useFrame((state) => {
        if (starRef.current) {
            // Faz a estrela pulsar lentamente
            const pulse = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + 0.9;
            starRef.current.scale.set(pulse, pulse, pulse);
        }

        if (spotLightRef.current) {
            // Varia a intensidade da luz suavemente
            const intensity = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 2.8;
            spotLightRef.current.intensity = intensity;
        }
    });

    return (
        <group>
            {/* Luz principal - Estrela */}
            <directionalLight
                position={[0, 10, 0]}
                intensity={1.5}
                color="#FFFAEE"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={20}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Luz ambiente suave */}
            <ambientLight intensity={0.3} color="#2B3B7C" />

            {/* Esfera brilhante simulando uma estrela distante */}
            <mesh position={[0, 15, 0]} ref={starRef}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#FFF9C4" toneMapped={false} />
            </mesh>

            {/* SpotLight para destacar a área central */}
            <SpotLight
                ref={spotLightRef}
                position={[0, 10, 0]}
                angle={0.5}
                attenuation={5}
                distance={15}
                intensity={3}
                color="#FFFAEE"
                castShadow
            />

            {/* Partículas de estrelas no fundo */}
            <Sparkles
                count={300}
                scale={20}
                size={0.5}
                speed={0.3}
                opacity={0.8}
                color="#FFFFFF"
            />

            {/* Estrelas secundárias */}
            <pointLight position={[8, 5, 5]} intensity={0.2} color="#A7D8FF" />
            <pointLight position={[-8, 6, -5]} intensity={0.2} color="#FFD2A7" />
        </group>
    );
}

export default SpaceIllumination;
