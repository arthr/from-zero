import React from 'react';
import { useSelector } from 'react-redux';

function ActivityFeed() {
    // Obtendo atividades do activitiesSlice
    const activities = useSelector((state) => state.activities);

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
