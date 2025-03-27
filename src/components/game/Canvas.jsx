import React, { useEffect, useRef } from 'react';

function Canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Ajustar resolução do canvas
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Redesenhar após redimensionar
            draw();
        };

        // Exemplo simples de desenho
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenhar fundo
            ctx.fillStyle = '#262626';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenhar texto
            ctx.fillStyle = '#10b981';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Canvas do Jogo', canvas.width / 2, canvas.height / 2);

            // Desenhar um círculo
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2 + 50, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        };

        // Inicializar
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Limpar event listeners
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            ></canvas>
        </div>
    );
}

export default Canvas;
