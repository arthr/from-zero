import React from 'react';
import Card from '../ui/Card';

function Notifications() {
    // Dados mocados
    const notifications = [
        { id: 1, text: 'Missão completada: Resgate a princesa', time: '5 min atrás' },
        { id: 2, text: 'Ganhou 100 pontos de experiência', time: '10 min atrás' },
        { id: 3, text: 'Player2 enviou uma mensagem', time: '30 min atrás' },
    ];

    return (
        <Card title="Notificações">
            <div className="space-y-3">
                {notifications.map((notification) => (
                    <div key={notification.id} className="border-b border-neutral-700 pb-2 last:border-0 last:pb-0">
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-neutral-500">{notification.time}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Notifications;
