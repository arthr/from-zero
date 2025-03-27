import React, { useState } from 'react';

function Tabs({ tabs }) {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="bg-neutral-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-neutral-700 border-b border-neutral-600">
                <div className="flex border-b border-neutral-800">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`flex-grow px-4 py-2 font-medium text-xs ${activeTab === index
                                ? 'text-emerald-500 border-b-2 border-emerald-500'
                                : 'text-neutral-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="py-3">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}

export default Tabs;
