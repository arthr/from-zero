import React, { useState, useEffect } from 'react';

function AnimatedCounter({ value, step = 1, duration = 1000 }) {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const totalSteps = Math.ceil(value / step); // Número total de passos necessários
        const intervalDuration = Math.max(duration / totalSteps, 16); // Duração de cada passo, mínimo de 16ms (~60fps)

        let current = 0;

        const interval = setInterval(() => {
            current += step;
            if (current >= value) {
                clearInterval(interval);
                setCurrentValue(value);
            } else {
                setCurrentValue(current);
            }
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [value, step, duration]);

    return <span>{currentValue}</span>;
}

export default AnimatedCounter;