
import React, { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

type HeaderProps = {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

const Header = ({ isMobileOpen, toggleMobileSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white dark:bg-[#242023] border-gray-200 dark:border-gray-700 px-4 md:px-6">
      <div className="mr-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          aria-label="Toggle Menu"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
