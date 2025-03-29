import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function WavyPlane(props) {
    const ref = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const geometry = ref.current.geometry;
        const position = geometry.attributes.position;

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            const waveX = 0.1 * Math.sin(x * 2 + time);
            const waveY = 0.1 * Math.cos(y * 2 + time);
            position.setZ(i, waveX + waveY);
        }

        position.needsUpdate = true;
    });

    return (
        <mesh {...props} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshStandardMaterial color="#5ee9b5" wireframe />
        </mesh>
    );
}

export default WavyPlane;
