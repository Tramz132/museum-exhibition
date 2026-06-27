import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useApp from '../hooks/useApp';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const DashboardLayout = () => {
  const { currentUser } = useApp();

  // If there's no active user session, redirect to the login page immediately
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex w-full min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Top Header */}
        <Navbar />

        {/* Scrollable Sub-Page Render Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900/10">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
