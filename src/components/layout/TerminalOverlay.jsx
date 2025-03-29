import React, { useEffect, useState } from 'react';
import { Transition, TransitionChild } from '@headlessui/react';

function TerminalOverlay({ activePageContent, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (activePageContent && !mounted) {
            setMounted(true);
        }
    }, [activePageContent, mounted]);

    useEffect(() => {
        if (activePageContent) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [activePageContent]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose(); // Chama o método passado como prop
        }, 1000);
    };

    if (!mounted) return null;

    return (
        <Transition
            show={isVisible}
            as="div"
            className="absolute top-0 left-0 right-0 z-50 flex justify-center bg-transparent"
            enter="transition-opacity duration-300 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 pointer-events-none"
        >
            <TransitionChild
                as="div"
                className="w-full bg-black/70 overflow-hidden flex flex-col border-b border-green-500 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transform origin-top"
                enter="transition-all duration-300 ease-in-out"
                enterFrom="max-h-0 scale-y-0"
                enterTo="max-h-[70vh] scale-y-100"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="max-h-[70vh] scale-y-100"
                leaveTo="max-h-0 scale-y-0"
            >
                {/* Barra de título do terminal */}
                <div className="flex justify-between items-center p-2 border-b border-green-500/30">
                    <div className="flex space-x-2">
                        <div
                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"
                            onClick={handleClose}
                            title="Fechar terminal"
                        ></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto font-mono text-green-400 max-h-[calc(70vh-40px)]">
                    {activePageContent}
                </div>
            </TransitionChild>
        </Transition>
    );
}

export default TerminalOverlay;
