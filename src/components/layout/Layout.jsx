import React from 'react';
import Navbar from './Navbar';
import LeftSidebar from '../leftSidebar/LeftSidebar';
import GameContainer from '../game/GameContainer';
import RightSidebar from '../rightSidebar/RightSidebar';

function Layout() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
            <Navbar />
            <div className="flex flex-1 flex-col md:flex-row p-4 gap-4">
                {/* Left Sidebar - collapses on mobile */}
                <aside className="w-full md:w-1/5 lg:w-1/6 overflow-y-auto max-h-[calc(100vh-6rem)]">
                    <LeftSidebar />
                </aside>

                {/* Main Game Area */}
                <main className="w-full md:w-3/5 lg:w-4/6 flex-grow">
                    <GameContainer />
                </main>

                {/* Right Sidebar - collapses on mobile */}
                <aside className="w-full md:w-1/5 lg:w-1/6 overflow-y-auto max-h-[calc(100vh-6rem)]">
                    <RightSidebar />
                </aside>
            </div>
        </div>
    );
}

export default Layout;
