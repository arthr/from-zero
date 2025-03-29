import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Transition } from '@headlessui/react';

import {
    MdOutlineMarkEmailUnread,
    MdOutlineMarkEmailRead,
    MdOutlineDisabledByDefault
} from "react-icons/md";
import Card from '../ui/Card';

import {
    fetchNotifications,
    markAsRead,
    removeNotification
} from '../../store/notificationsSlice';

function Notifications() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications.data);
    const notificationsLoading = useSelector((state) => state.notifications.loading);

    const [readedNotifications, setReadedNotifications] = useState([]);
    const [hiddenNotifications, setHiddenNotifications] = useState([]);
    const [newNotifications, setNewNotifications] = useState([]);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchNotifications());
        }, 60000); // Atualiza a cada 60 segundos

        return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
        const newNotifications = notifications.filter((notification) => {
            return !notification.read && !readedNotifications.includes(notification.id) && !hiddenNotifications.includes(notification.id);
        });
        setNewNotifications(newNotifications);
    }, [notifications, readedNotifications, hiddenNotifications]);

    const handleMarkAsRead = (id) => {
        setReadedNotifications((prev) => [...prev, id]);
        setTimeout(() => {
            dispatch(markAsRead(id));
        }, 300); // Tempo da animação antes de remover do estado Redux
    };

    const handleRemoveNotification = (id) => {
        setHiddenNotifications((prev) => [...prev, id]);
        setReadedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
        setTimeout(() => {
            dispatch(removeNotification(id));
        }, 300); // Tempo da animação antes de remover do estado Redux
    };

    return (
        <Card title="Notificações" badgeCount={newNotifications.length || 0}>
            <div className="space-y-2 -m-1.5">
                {(notificationsLoading && newNotifications.length > 0)
                    ? Array.from({ length: 1 }, () => ({
                        id: 0,
                        text: 'Carregando...',
                    })).map((notification, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-sm h-13 bg-neutral-700/30 rounded text-transparent transition-all">{notification.text}</span>
                        </div>
                    ))
                    : (newNotifications.length === 0 && readedNotifications.length === 0)
                        ? (
                            <p className="w-full text-xs text-center text-neutral-500">Nenhuma notificação</p>
                        ) : notifications.map((notification) => (
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
