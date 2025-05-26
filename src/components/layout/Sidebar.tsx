
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
  },
  {
    title: "Tickets",
    icon: Ticket,
    href: "/tickets",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
  {
    title: "Certifications",
    icon: Award,
    href: "/certifications",
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

  const handleLinkClick = () => {
    if (isMobileOpen) {
      closeMobileSidebar();
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-md flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-gray-900 text-lg">SharedPod</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="border-t border-gray-200 p-4 mt-auto">
        <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50" onClick={handleSignOut}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center text-white text-sm font-medium">
            RI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Raja I
            </p>
            <p className="text-xs text-gray-500 truncate">
              Manager Delivery
            </p>
          </div>
          <LogOut className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
