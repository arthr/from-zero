import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function PulsingSphere(props) {
    const ref = useRef();

    useFrame((state) => {
        const newScale = 1 + 0.2 * Math.sin(state.clock.elapsedTime * 2);
        ref.current.scale.set(newScale, newScale, newScale);
    });

    return (
        <mesh {...props} ref={ref}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={props.color || "#ffffff"} />
        </mesh>
    );
}

export default PulsingSphere;
