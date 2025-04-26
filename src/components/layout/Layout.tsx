
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileOpen} closeMobileSidebar={closeMobileSidebar} />
      
      <div className="flex flex-col flex-1 w-full">
        <Header isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        
        <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SharedPod. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
