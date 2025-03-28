import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCardCollapse, selectCardCollapsed } from '../../store/uiSlice';
import { sanitizeForId } from '../../utils/stringUtils';

function Card({ title, children, className, collapsible = true, id, badgeCount = 0 }) {
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
        // removemos overflow-hidden para testar o icone de notificacao
        <div className={`bg-neutral-800 rounded-lg shadow-md ${className || ''}`}>
            {title && (
                <div
                    className={`relative bg-neutral-700 px-4 py-2 border-b rounded-lg shadow-md border-neutral-600 flex justify-between items-center ${collapsible ? 'cursor-pointer hover:bg-neutral-600' : ''}`}
                    onClick={collapsible ? handleToggleCollapse : undefined}
                >
                    <div className="flex items-center gap-2">
                        <h3 className="text-white text-sm font-medium">{title}</h3>

                        {badgeCount > 0 && (
                            <span className="relative flex items-center justify-center">
                                <span className="bg-emerald-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {badgeCount}
                                </span>
                                <span className="absolute inline-flex rounded-full bg-emerald-400 opacity-50 w-5 h-5 animate-ping"></span>
                            </span>
                        )}

                    </div>
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
