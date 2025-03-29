import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import LeftSidebar from '../leftSidebar/LeftSidebar';
import GameContainer from '../game/GameContainer';
import RightSidebar from '../rightSidebar/RightSidebar';
import TerminalOverlay from './TerminalOverlay';
import PageContent from '../ui/PageContent';
import {
    selectActivePage,
    selectOrderedPages,
    selectActivePageStates
} from '../../store/pagesSlice';

function Layout() {
    const activePage = useSelector(selectActivePage);
    const pages = useSelector(selectOrderedPages);
    const activePageStates = useSelector(selectActivePageStates);


    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
            <Navbar pages={pages} activePageStates={activePageStates} player={{ name: "Player1" }} />

            {/* Main Content */}
            <div className="flex flex-1 flex-col md:flex-row p-4 gap-4 relative">
                <TerminalOverlay
                    activePageContent={activePage ? <PageContent /> : null}
                />

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
