import React, { createContext, useState, useEffect } from 'react';
import { users as mockUsers, initialItems, initialLoans } from '../data/mockData';

// Create Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Initial State Load from LocalStorage or Fallback to Mock Data
  const [usersList] = useState(mockUsers);
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ent_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [museumItems, setMuseumItems] = useState(() => {
    const saved = localStorage.getItem('ent_museum_items');
    return saved ? JSON.parse(saved) : initialItems;
  });

  const [loanRequests, setLoanRequests] = useState(() => {
    const saved = localStorage.getItem('ent_loan_requests');
    return saved ? JSON.parse(saved) : initialLoans;
  });

  // 2. Synchronize States with LocalStorage for Persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ent_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ent_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ent_museum_items', JSON.stringify(museumItems));
  }, [museumItems]);

  useEffect(() => {
    localStorage.setItem('ent_loan_requests', JSON.stringify(loanRequests));
  }, [loanRequests]);

  // 3. AUTHENTICATION ACTIONS
  const login = (email, password) => {
    const user = usersList[email];
    if (user && user.password === password) {
      // Exclude password from current session state
      const { password: _, ...sessionUser } = user;
      setCurrentUser(sessionUser);
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah!' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ent_current_user');
  };

  const switchRole = (newRole) => {
    // Locate the user account that matches the requested role
    const emailMap = {
      PANITIA: 'panitia@museum.id',
      STAF: 'staf@museum.id',
      ADMIN: 'admin@museum.id',
    };
    const targetEmail = emailMap[newRole];
    if (targetEmail && usersList[targetEmail]) {
      const { password: _, ...sessionUser } = usersList[targetEmail];
      setCurrentUser(sessionUser);
    }
  };

  // 4. PANITIA ACTIONS
  const addLoanRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      barangId: Number(requestData.barangId),
      namaBarang: requestData.namaBarang,
      namaAcara: requestData.namaAcara,
      lokasi: requestData.lokasi,
      tanggalMulai: requestData.tanggalMulai,
      tanggalSelesai: requestData.tanggalSelesai,
      peminjam: currentUser?.name || 'Panitia',
      role: currentUser?.role || 'PANITIA',
      status: 'Pending',
      tanggalPengajuan: new Date().toISOString().split('T')[0],
    };
    setLoanRequests((prev) => [newRequest, ...prev]);
  };

  // 5. STAF ACTIONS (VERIFICATION)
  const approveLoan = (loanId) => {
    setLoanRequests((prevLoans) =>
      prevLoans.map((loan) => {
        if (loan.id === loanId) {
          // Update status to Approved
          const updatedLoan = { ...loan, status: 'Approved' };
          
          // Update the museum item status to 'Dipinjam'
          setMuseumItems((prevItems) =>
            prevItems.map((item) =>
              item.id === loan.barangId ? { ...item, status: 'Dipinjam' } : item
            )
          );
          return updatedLoan;
        }
        return loan;
      })
    );
  };

  const rejectLoan = (loanId) => {
    setLoanRequests((prevLoans) =>
      prevLoans.map((loan) => (loan.id === loanId ? { ...loan, status: 'Rejected' } : loan))
    );
  };

  // 6. ADMIN ACTIONS (CRUD MUSEUM ITEMS)
  const addMuseumItem = (itemData) => {
    const newItem = {
      id: Date.now(),
      name: itemData.name,
      category: itemData.category || 'Senjata',
      origin: itemData.origin || 'Jawa',
      year: itemData.year || 'Abad 17',
      status: itemData.status || 'Tersedia',
      image: itemData.image || 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=500&auto=format&fit=crop&q=60',
      description: itemData.description || '',
    };
    setMuseumItems((prev) => [...prev, newItem]);
  };

  const updateMuseumItem = (itemId, updatedData) => {
    setMuseumItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updatedData } : item))
    );
    
    // Synced Update to loan queue names if they are modified
    if (updatedData.name) {
      setLoanRequests((prevLoans) =>
        prevLoans.map((loan) =>
          loan.barangId === itemId ? { ...loan, namaBarang: updatedData.name } : loan
        )
      );
    }
  };

  const deleteMuseumItem = (itemId) => {
    setMuseumItems((prev) => prev.filter((item) => item.id !== itemId));
    // Cascade delete requests associated with deleted items
    setLoanRequests((prev) => prev.filter((loan) => loan.barangId !== itemId));
  };

  const changeMuseumStatus = (itemId, newStatus) => {
    setMuseumItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: usersList,
        museumItems,
        loanRequests,
        login,
        logout,
        switchRole,
        addLoanRequest,
        approveLoan,
        rejectLoan,
        addMuseumItem,
        updateMuseumItem,
        deleteMuseumItem,
        changeMuseumStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
