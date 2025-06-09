
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Ticket, 
  FolderKanban, 
  Users, 
  Award,
  LogOut
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    disabled: false,
  },
  {
    title: "Tickets",
    icon: Ticket,
    href: "/tickets",
    disabled: true,
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
    disabled: true,
  },
  {
    title: "Members",
    icon: Users,
    href: "/team",
    disabled: true,
  },
  {
    title: "Certifications",
    icon: Award,
    href: "/certifications",
    disabled: true,
  },
];

type SidebarProps = {
  isMobileOpen: boolean;
  closeMobileSidebar: () => void;
};

const Sidebar = ({ isMobileOpen, closeMobileSidebar }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    navigate('/thank-you');
  };

  const handleLinkClick = (item: any) => {
    if (item.disabled) {
      return; // Do nothing if disabled
    }
    
    if (isMobileOpen) {
      closeMobileSidebar();
    }
  };

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-[#242023] border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => window.location.reload()}>
            <span className="text-lg font-bold" style={{ color: '#0081bc' }}>Shared POD</span>
          </Link>
        </div>
        
        <div className="flex flex-col flex-1 h-full">
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.disabled) {
                  return (
                    <div
                      key={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50",
                        "text-gray-400 dark:text-gray-500"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleLinkClick(item)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      location.pathname === item.href 
                        ? "border-r-2" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    )}
                    style={location.pathname === item.href ? {
                      backgroundColor: '#E6F3FF',
                      color: '#0081bc',
                      borderRightColor: '#0081bc'
                    } : {}}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      <div 
        className="fixed bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#242023] p-4"
        onClick={handleSignOut}
        style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.15)', cursor: 'pointer' }}
      >
        <div className="flex items-center gap-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 p-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#0081bc' }}>
            RI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Raja I
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Manager Delivery
            </p>
          </div>
          <LogOut className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
