import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Transition } from '@headlessui/react';

import { MdOutlineMarkEmailUnread, MdOutlineMarkEmailRead, MdOutlineDisabledByDefault } from "react-icons/md";
import Card from '../ui/Card';

import { fetchNotifications, markAsRead, removeNotification } from '../../store/notificationsSlice';

function Notifications() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);
    const [readedNotifications, setReadedNotifications] = useState([]);
    const [hiddenNotifications, setHiddenNotifications] = useState([]);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchNotifications());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const handleMarkAsRead = (id) => {
        setReadedNotifications((prev) => [...prev, id]);
        setTimeout(() => {
            dispatch(markAsRead(id));
        }, 300); // Tempo da animação antes de remover do estado Redux
    };

    const handleRemoveNotification = (id) => {
        setHiddenNotifications((prev) => [...prev, id]);
        setTimeout(() => {
            dispatch(removeNotification(id));
        }
            , 300); // Tempo da animação antes de remover do estado Redux
    };

    return (
        <Card title="Notificações" badgeCount={notifications.filter((v) => !v.read).length || 0}>
            <div className="space-y-2 -m-1.5">
                {notifications.map((notification) => (
                    <Transition
                        key={notification.id}
                        show={!hiddenNotifications.includes(notification.id)}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className={`relative text-xs p-2 rounded flex justify-between items-start gap-2 transition-opacity duration-300 ${readedNotifications.includes(notification.id)
                                ? 'bg-neutral-700/30'
                                : 'bg-neutral-700'
                                }`}
                        >
                            <div className={`flex-1 ${readedNotifications.includes(notification.id)
                                ? 'opacity-30'
                                : ''
                                }`}>
                                <p>{notification.text}</p>
                                <p className="text-neutral-500 mt-1 text-right">
                                    {formatDistanceToNow(notification.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                            <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className={`absolute top-0 right-4 mt-1 mr-1 text-sm leading-none transition ${notification.read
                                    ? 'cursor-default text-orange-400/50'
                                    : 'cursor-pointer text-emerald-300/60 hover:text-emerald-400'
                                    }`}
                                title="Lida"
                            >
                                {notification.read ? <MdOutlineMarkEmailRead /> : <MdOutlineMarkEmailUnread />}
                            </button>
                            <button
                                onClick={() => !notification.read ? handleRemoveNotification(notification.id) : null}
                                className="absolute top-0 right-0 mt-1 mr-1 text-sm leading-none transition text-red-300/60 hover:text-red-400"
                                title="Remover"
                            >
                                <MdOutlineDisabledByDefault />
                            </button>
                        </div>
                    </Transition>
                ))}
                {notifications.length === 0 && (
                    <p className="text-xs text-neutral-500">Nenhuma notificação</p>
                )}
            </div>
        </Card>
    );
}

export default Notifications;
