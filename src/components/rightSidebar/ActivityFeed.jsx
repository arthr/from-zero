import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchActivities } from '../../store/activitiesSlice';

function ActivityFeed() {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities.data);

    useEffect(() => {
        dispatch(fetchActivities());
    }, [dispatch]);

    return (
        <div className="space-y-3">
            {Array.isArray(activities) && activities.length > 0 ? (
                activities.map((activity) => (
                    <div key={activity.id} className="border-b border-neutral-700 pb-2 px-2 last:border-0">
                        <p className="text-xs">
                            <span className="font-bold text-emerald-400">{activity.user}</span>{' '}
                            {activity.action}
                        </p>
                        <p className="text-xs text-neutral-500">{activity.time}</p>
                    </div>
                ))
            ) : (
                <p className="text-neutral-500 text-sm">Nenhuma atividade encontrada.</p>
            )}
        </div>
    );
}

export default ActivityFeed;
