import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearActivePage } from '../../store/pagesSlice';

function TerminalOverlay({ isVisible, content }) {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();

    // Este useEffect apenas controla a montagem inicial do componente
    useEffect(() => {
        if (isVisible && !mounted) {
            setMounted(true);
        }
    }, [isVisible, mounted]);

    const handleClose = () => {
        dispatch(clearActivePage());
    };

    // Se nunca foi montado, não renderiza nada
    if (!mounted) return null;

    return (
        <div
            className={`absolute top-0 left-0 right-0 z-50 flex justify-center bg-transparent
                      transition-opacity duration-300 ease-in-out
                      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className={`w-full bg-black/70 overflow-hidden flex flex-col
                          border-b border-green-500
                          shadow-[0_5px_15px_rgba(0,0,0,0.5)]
                          transition-all duration-300 ease-in-out
                          transform origin-top
                          ${isVisible
                    ? 'max-h-[70vh] scale-y-100'
                    : 'max-h-0 scale-y-0'}`}>

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
                    {content}
                </div>
            </div>
        </div>
    );
}

export default TerminalOverlay;
