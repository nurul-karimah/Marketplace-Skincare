import React, { useState } from 'react';
import SidebarNavbar from './SidebarNavbar';

export default function DashboardLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      {/* Tombol toggle di mobile */}
      <button className="btn btn-dark d-md-none m-2" onClick={() => setShowSidebar(!showSidebar)}>
        ☰ Menu
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-container bg-dark text-white p-3 ${showSidebar ? 'd-block' : 'd-none d-md-block'}`}
        style={{
          width: '240px',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <SidebarNavbar />
      </div>

      {/* Konten utama */}
      <div
        className="main-content flex-grow-1"
        style={{
          marginLeft: '240px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>

      {/* CSS Responsif */}
      <style>{`
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
          }
          .sidebar-container {
            width: 100%;
            height: auto;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
}
