
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMobileSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <div ref={sidebarRef}>
        <Sidebar isMobileOpen={isMobileOpen} closeMobileSidebar={closeMobileSidebar} />
      </div>
      
      <div className="flex flex-col flex-1 w-full min-w-0">
        <Header isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 p-3 md:p-4 lg:p-6 overflow-auto">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
