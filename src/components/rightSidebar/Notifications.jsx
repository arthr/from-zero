import React from 'react';
import { useSelector } from 'react-redux';

function Notifications() {
    // Obtendo notificações diretamente do notificationsSlice
    const notifications = useSelector((state) => state.notifications);

    return (
        <div className="bg-neutral-800 rounded-lg p-3 shadow-md">
            <h3 className="text-sm font-bold mb-2 text-emerald-500">Notificações</h3>
            <div className="space-y-2">
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
        </div>
    );
}

export default Notifications;
