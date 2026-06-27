import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

// Custom Hook to consume AppContext in components safely
const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider from src/context/AppContext');
  }
  
  return context;
};

export default useApp;
