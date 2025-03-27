import React from 'react';
import Canvas from './Canvas';
import Controls from './Controls';

function GameContainer() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                <Canvas />
            </div>
            <div className="mt-4">
                <Controls />
            </div>
        </div>
    );
}

export default GameContainer;
