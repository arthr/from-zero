import React from 'react';
import Tabs from '../ui/Tabs';
import Ranking from './Ranking';
import Chat from './Chat';
import ActivityFeed from './ActivityFeed';
import Notifications from './Notifications';

function RightSidebar() {
    const tabs = [
        {
            label: 'Ranking',
            content: <Ranking />
        },
        {
            label: 'Chat',
            content: <Chat />
        },
        {
            label: 'Atividade',
            content: <ActivityFeed />
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <Tabs tabs={tabs} />
            <Notifications />
        </div>
    );
}

export default RightSidebar;
