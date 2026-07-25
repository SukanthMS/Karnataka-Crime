import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useCrimeData } from '../../hooks/useCrimeData';

export const MainLayout = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const { firs } = useCrimeData();

  return (
    <div className="flex min-h-screen bg-[#0F172A]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar searchFilter={searchFilter} setSearchFilter={setSearchFilter} firs={firs} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet context={{ searchFilter, setSearchFilter }} />
        </main>
      </div>
    </div>
  );
};
