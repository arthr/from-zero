import React, { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';
import { calculateDuration, calculateStep } from '../../utils/animationUtils'; // Importa as funções utilitárias

function ProgressBar({ label, value, maxValue, color }) {
    const [percentage, setPercentage] = useState(0);

    // Calcula a duração da animação usando a função utilitária
    const animationDuration = calculateDuration(value, maxValue);

    // Calcula o step usando a função utilitária
    const step = calculateStep(value, maxValue);

    useEffect(() => {
        // Atualiza a porcentagem para o valor correto após o componente ser montado
        const timeout = setTimeout(() => {
            setPercentage((value / maxValue) * 100);
        }, 100); // Pequeno atraso para garantir que a animação seja visível

        return () => clearTimeout(timeout); // Limpa o timeout ao desmontar
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
                        transition: `width ${animationDuration}ms ease-in-out`, // Sincroniza a duração da animação
                    }}
                ></div>
            </div>
        </div>
    );
}

export default ProgressBar;