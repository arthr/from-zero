import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@react-three/drei';
import InventoryItem from './InventoryItem';
import SadFace from './SadFace';

function InventoryDisplay() {
    // Apenas lendo os dados do inventário do playerSlice
    const inventory = useSelector(state => state.player.inventory) || [];

    return (
        <group position={[0, 1, 0]}>
            {inventory.length === 0 ? (
                // Mensagem de inventário vazio com emoji triste
                <group>
                    <SadFace position={[0, -0.8, 0]} />
                    <Text
                        position={[0, -1.2, 0]}
                        fontSize={0.2}
                        color="orange"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Inventário vazio
                    </Text>
                </group>
            ) : (
                // Renderiza os itens do inventário
                inventory.map((item, index) => (
                    <InventoryItem
                        key={item.id}
                        item={item}
                        index={index}
                        total={inventory.length}
                    />
                ))
            )}
        </group>
    );
}

export default InventoryDisplay;
