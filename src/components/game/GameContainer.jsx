import React from 'react';
import Canvas from './Canvas';
import Controls from './Controls';

function GameContainer() {
    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-6rem)] overflow-hidden">
            <div className="flex-grow overflow-hidden">
                <Canvas />
            </div>
            <div className="mt-4">
                <Controls />
            </div>
        </div>
    );
}

export default GameContainer;
