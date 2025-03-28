import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../ui/Card';

function Notifications() {
    // Obtendo notificações diretamente do notificationsSlice
    const notifications = useSelector((state) => state.notifications);

    return (
        <Card title="Notificações">
            <div className="space-y-2 -m-1.5">
                {notifications.map((notification) => (
                    <div key={notification.id} className="text-xs p-2 bg-neutral-700 rounded">
                        <p>{notification.text}</p>
                        <p className="text-neutral-500 text-right">{notification.time}</p>
                    </div>
                ))}
                {notifications.length === 0 && (
                    <p className="text-xs text-neutral-500">Nenhuma notificação</p>
                )}
            </div>
        </Card>
    );
}

export default Notifications;
