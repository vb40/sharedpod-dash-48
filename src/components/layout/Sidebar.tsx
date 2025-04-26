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
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>
          <span className="text-sidebar-foreground text-lg">SharedPod</span>
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
                "sidebar-item",
                location.pathname === item.href && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleSignOut}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            RI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Raja I
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Manager Delivery
            </p>
          </div>
          <LogOut className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
