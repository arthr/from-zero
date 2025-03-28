import React, { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';

function ProgressBar({ label, value, maxValue, color }) {
    const [percentage, setPercentage] = useState(0);

    // Calcula a duração da animação com base no percentual de preenchimento
    const animationDuration = Math.min(Math.max((value / maxValue) * 2000, 500), 3000);
    // Duração mínima de 500ms, máxima de 3000ms

    // Calcula o step relativo ao valor e ao maxValue
    const step = Math.max(Math.ceil(value / 100), Math.ceil(maxValue / 10000), 1);
    // Garante que o step seja proporcional ao value e ao maxValue, com um mínimo de 1

    useEffect(() => {
        // Atualiza a porcentagem para o valor correto após o componente ser montado
        const timeout = setTimeout(() => {
            setPercentage((value / maxValue) * 100);
        }, 100);

        return () => clearTimeout(timeout);
    }, [value, maxValue]);

    return (
        <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>
                    <AnimatedCounter
                        value={value}
                        step={step}
                        duration={animationDuration}
                    />/{maxValue}
                </span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
                <div
                    className={`h-2 rounded-full ${color}`}
                    style={{
                        width: `${percentage}%`,
                        transition: `width ${animationDuration}ms ease-in-out`,
                    }}
                ></div>
            </div>
        </div>
    );
}

export default ProgressBar;