import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Importando do messagesSlice em vez do chatSlice
import { addMessage } from '../../store/messagesSlice';

function Chat() {
    const player = useSelector((state) => state.player);
    const [message, setMessage] = useState('');
    const messagesContainerRef = useRef(null);
    const dispatch = useDispatch();

    // Usando Redux para acessar as mensagens diretamente do messagesSlice
    const messages = useSelector((state) => state.messages);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Criar uma nova mensagem com os dados necessários
            const newMessage = {
                id: Date.now(),
                sender: player.name, // Poderia vir do estado do jogador
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: true
            };

            // Despachar a ação para adicionar a mensagem usando messagesSlice
            dispatch(addMessage(newMessage));
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-80">
            <div
                ref={messagesContainerRef}
                className="flex-grow overflow-y-auto mb-3 space-y-3 px-2"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.isCurrentUser
                                ? 'bg-emerald-600 text-white rounded-br-none'
                                : 'bg-neutral-700 text-white rounded-bl-none'
                                }`}
                        >
                            <p className={`text-xs font-bold ${msg.isCurrentUser ? 'text-emerald-900' : 'text-emerald-400'}`}>{!msg.isCurrentUser ? msg.sender : player.name}</p>
                            <p className="text-sm break-words">{msg.text}</p>
                            <p className="text-xs text-right opacity-70">{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 px-2 text-xs w-full max-w-full">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="min-w-0 bg-neutral-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;
