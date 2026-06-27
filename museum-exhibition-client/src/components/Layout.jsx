import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex w-full min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Container - Right */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar - Sticky Top */}
        <Navbar />

        {/* Dashboard Pages Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
