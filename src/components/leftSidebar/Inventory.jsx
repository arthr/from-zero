import React, { useState } from 'react';
import Card from '../ui/Card';
import { useSelector } from 'react-redux';
import AnimatedCounter from '../ui/AnimatedCounter';
import { calculateStep } from '../../utils/animationUtils';

function Inventory() {
    // Obter os itens do inventário e o número máximo de slots do estado Redux
    const items = useSelector((state) => state.player.inventory);
    const enabledSlots = useSelector((state) => state.player.enabledSlots || 8); // Valor padrão de 8 slots se não estiver definido
    const maxSlots = useSelector((state) => state.player.maxSlots || 20); // Total máximo de slots

    const [hoveredItem, setHoveredItem] = useState(null);

    // Criar array de slots para renderização
    const renderSlots = () => {
        let slots = [];

        // Renderizar slots com itens
        for (let i = 0; i < maxSlots; i++) {
            if (i < items.length) {
                // Slot com item
                const item = items[i];
                slots.push(
                    <div
                        key={`slot-${i}`}
                        className="bg-neutral-700 p-2 rounded flex flex-col items-center justify-center relative"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="absolute -bottom-2 -right-1 bg-emerald-600/80 text-white text-xs rounded-sm min-w-[20px] px-1 flex items-center justify-center">
                            <AnimatedCounter value={item.quantity} step={calculateStep(item.quantity, item.quantity)} duration={100} />
                        </span>

                        {hoveredItem === item.id && (
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                {item.name}
                            </div>
                        )}
                    </div>
                );
            } else if (i < enabledSlots) {
                // Slot vazio disponível
                slots.push(
                    <div
                        key={`slot-${i}`}
                        className="bg-neutral-700/50 p-2 rounded flex flex-col items-center justify-center border border-dashed border-gray-500 min-h-[52px]"
                    >
                    </div>
                );
            } else {
                // Slot indisponível (bloqueado)
                slots.push(
                    <div
                        key={`slot-${i}`}
                        className="bg-neutral-900/30 p-2 rounded flex flex-col items-center justify-center border border-dashed border-gray-700/50 min-h-[52px] opacity-50"
                        title="Slot bloqueado"
                    >
                        <span className="text-xs text-gray-500">🔒</span>
                    </div>
                );
            }
        }

        return slots;
    };

    return (
        <Card title="Inventário">
            <div className="grid grid-cols-4 gap-2">
                {renderSlots()}
            </div>
        </Card>
    );
}

export default Inventory;
