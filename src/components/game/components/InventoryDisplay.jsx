import React from 'react';
import { useSelector } from 'react-redux';
import InventoryItem from './InventoryItem';

function InventoryDisplay() {
    const inventory = useSelector(state => state.player.inventory) || [];

    // Se não houver itens no inventário, adicionamos alguns para visualização
    const displayInventory = inventory.length > 0 ? inventory : [
        { id: 'demo1', name: 'Espada', type: 'weapon', quantity: 1 },
        { id: 'demo2', name: 'Poção', type: 'potion', quantity: 3 },
        { id: 'demo3', name: 'Armadura', type: 'armor', quantity: 1 },
        { id: 'demo4', name: 'Pergaminho', type: 'scroll', quantity: 2 },
        { id: 'demo5', name: 'Moeda', type: 'gold', quantity: 50 }
    ];

    return (
        <group position={[0, 0, 0]}>
            {displayInventory.map((item, index) => (
                <InventoryItem
                    key={item.id}
                    item={item}
                    index={index}
                    total={displayInventory.length}
                />
            ))}
        </group>
    );
}

export default InventoryDisplay;
