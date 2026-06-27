import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import useApp from './hooks/useApp';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import PanitiaDashboard from './pages/PanitiaDashboard';
import StafDashboard from './pages/StafDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

// Home routing resolver - checks auth state and routes to appropriate path
const HomeRedirect = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role === 'PANITIA') return <Navigate to="/panitia" replace />;
  if (currentUser.role === 'STAF') return <Navigate to="/staf" replace />;
  if (currentUser.role === 'ADMIN') return <Navigate to="/admin" replace />;
  
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Root Path Resolver */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Authenticated Dashboard Shell Layout */}
          <Route element={<DashboardLayout />}>
            {/* PANITIA Routes */}
            <Route element={<ProtectedRoute allowedRoles={['PANITIA']} />}>
              <Route path="/panitia" element={<PanitiaDashboard />} />
            </Route>

            {/* STAF Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STAF']} />}>
              <Route path="/staf" element={<StafDashboard />} />
            </Route>

            {/* ADMIN Routes */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Catch-all Route for 404 Pages */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
