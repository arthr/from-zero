import React from 'react';

function Controls() {
    return (
        <div className="bg-neutral-800 rounded-lg p-2 md:p-4 flex flex-col md:flex-row items-center gap-3 md:justify-between">
            <div className="flex space-x-2">
                <button className="bg-emerald-600 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-emerald-700 transition text-sm md:text-base">
                    Iniciar
                </button>
                <button className="bg-neutral-700 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-neutral-600 transition text-sm md:text-base">
                    Pausar
                </button>
            </div>

            <div className="flex space-x-3 md:space-x-4">
                <div className="flex space-x-1 md:space-x-2">
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬅️
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬆️
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬇️
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ➡️
                    </button>
                </div>

                <div className="flex space-x-1 md:space-x-2">
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        A
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        B
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Controls;
