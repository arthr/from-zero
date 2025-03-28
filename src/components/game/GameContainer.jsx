import React from 'react';
import Canvas from './Canvas';

function GameContainer() {
    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-6rem)] overflow-hidden">
            <div className="flex-grow overflow-hidden">
                <Canvas />
            </div>
        </div>
    );
}

export default GameContainer;
