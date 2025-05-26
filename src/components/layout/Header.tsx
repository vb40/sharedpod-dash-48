
import React, { useState } from "react";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";

type HeaderProps = {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

const Header = ({ isMobileOpen, toggleMobileSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <div className="mr-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground bg-gray-50 hover:bg-gray-100 border-gray-200"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search for people, files, conversations...
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="text-gray-600 hover:text-gray-900"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      
      <AdvancedSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;
