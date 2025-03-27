import React from 'react';

function Controls() {
    return (
        <div className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex space-x-2">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
                    Iniciar
                </button>
                <button className="bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-600 transition">
                    Pausar
                </button>
            </div>

            <div className="flex space-x-4">
                <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬅️
                    </button>
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬆️
                    </button>
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ⬇️
                    </button>
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        ➡️
                    </button>
                </div>

                <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        A
                    </button>
                    <button className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-600">
                        B
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Controls;
