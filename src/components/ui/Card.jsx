import React from 'react';

function Card({ title, children, className }) {
    return (
        <div className={`bg-neutral-800 rounded-lg shadow-md overflow-hidden ${className}`}>
            {title && (
                <div className="bg-neutral-700 px-4 py-2 border-b border-neutral-600">
                    <h3 className="text-white font-medium">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}

export default Card;
