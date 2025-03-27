import React from 'react';
import PlayerInfo from './PlayerInfo';
import PlayerStats from './PlayerStats';
import Inventory from './Inventory';

function LeftSidebar() {
    return (
        <div className="flex flex-col gap-4">
            <PlayerInfo />
            <PlayerStats />
            <Inventory />
        </div>
    );
}

export default LeftSidebar;
