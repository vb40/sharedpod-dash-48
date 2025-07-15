
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
      <div ref={sidebarRef} className="fixed left-0 top-0 h-full z-50">
        <Sidebar isMobileOpen={isMobileOpen} closeMobileSidebar={closeMobileSidebar} />
      </div>
      
      <div className="flex flex-col flex-1 w-full min-w-0 lg:ml-64">
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
