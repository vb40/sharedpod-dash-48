
import React, { useState } from "react";
import { Menu, X, Moon, Sun, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

const Header = ({ isMobileOpen, toggleMobileSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && location.pathname !== "/") {
      navigate("/", { state: { searchQuery } });
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4 md:px-6">
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
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
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
