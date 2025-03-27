import React from 'react';

function ActivityFeed() {
    // Dados mocados
    const activities = [
        { id: 1, user: 'TopPlayer', action: 'completou uma missão', time: '5 min atrás' },
        { id: 2, user: 'GameMaster', action: 'subiu para o nível 50', time: '10 min atrás' },
        { id: 3, user: 'Challenger', action: 'venceu uma batalha', time: '15 min atrás' },
        { id: 4, user: 'Player One', action: 'encontrou um item raro', time: '30 min atrás' },
        { id: 5, user: 'ProGamer123', action: 'estabeleceu um novo recorde', time: '45 min atrás' },
    ];

    return (
        <div className="space-y-3">
            {activities.map((activity) => (
                <div key={activity.id} className="border-b border-neutral-700 pb-2 px-2 last:border-0">
                    <p className="text-xs">
                        <span className="font-bold text-emerald-400">{activity.user}</span>{' '}
                        {activity.action}
                    </p>
                    <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
            ))}
        </div>
    );
}

export default ActivityFeed;
