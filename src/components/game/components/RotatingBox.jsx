import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function RotatingBox(props) {
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
        ref.current.rotation.y += delta * 0.5;
    });

    return (
        <mesh {...props} ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={props.color || "#10b981"} />
        </mesh>
    );
}

export default RotatingBox;
