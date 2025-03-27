import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCardCollapse, selectCardCollapsed } from '../../store/uiSlice';
import { sanitizeForId } from '../../utils/stringUtils';

function Card({ title, children, className, collapsible = true, id }) {
    const dispatch = useDispatch();

    // Usa o id fornecido ou gera um baseado no título sanitizado
    const cardId = id || `card-${sanitizeForId(title)}`;

    // Obtém o estado de colapso do Redux
    const isCollapsed = useSelector((state) => selectCardCollapsed(state, cardId));

    const handleToggleCollapse = () => {
        if (collapsible) {
            dispatch(toggleCardCollapse(cardId));
        }
    };

    return (
        <div className={`bg-neutral-800 rounded-lg shadow-md overflow-hidden ${className || ''}`}>
            {title && (
                <div
                    className={`bg-neutral-700 px-4 py-2 border-b border-neutral-600 flex justify-between items-center ${collapsible ? 'cursor-pointer hover:bg-neutral-600' : ''}`}
                    onClick={collapsible ? handleToggleCollapse : undefined}
                >
                    <h3 className="text-white text-sm font-medium">{title}</h3>
                    {collapsible && (
                        <span className="text-white">
                            {isCollapsed ? '▼' : '▲'}
                        </span>
                    )}
                </div>
            )}
            {!isCollapsed && (
                <div className="p-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default Card;
