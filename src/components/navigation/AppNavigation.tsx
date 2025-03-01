import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Shield,
  DollarSign,
  LineChart,
  Package,
  Bot,
  Wallet,
  Users,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  section: "public" | "user" | "admin";
  roles?: string[];
}

const AppNavigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const userRole = user?.user_metadata?.role || "user";

  const navigationItems: NavigationItem[] = [
    // Public navigation
    {
      id: "home",
      label: "Home",
      icon: <Home size={20} />,
      path: "/",
      section: "public",
    },
    {
      id: "login",
      label: "Login",
      icon: <User size={20} />,
      path: "/login",
      section: "public",
    },
    {
      id: "register",
      label: "Register",
      icon: <User size={20} />,
      path: "/register",
      section: "public",
    },

    // User dashboard navigation
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
      section: "user",
    },
    {
      id: "account",
      label: "Account Summary",
      icon: <DollarSign size={20} />,
      path: "/dashboard/account",
      section: "user",
    },
    {
      id: "performance",
      label: "Performance",
      icon: <LineChart size={20} />,
      path: "/dashboard/performance",
      section: "user",
    },
    {
      id: "investments",
      label: "Investments",
      icon: <Package size={20} />,
      path: "/dashboard/investments",
      section: "user",
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: <Bot size={20} />,
      path: "/dashboard/assistant",
      section: "user",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: <Wallet size={20} />,
      path: "/dashboard/wallet",
      section: "user",
    },
    {
      id: "referrals",
      label: "Referrals",
      icon: <Users size={20} />,
      path: "/dashboard/referrals",
      section: "user",
    },

    // Admin dashboard navigation
    {
      id: "admin",
      label: "Admin Dashboard",
      icon: <Shield size={20} />,
      path: "/admin",
      section: "admin",
      roles: ["admin"],
    },
    {
      id: "admin-users",
      label: "User Management",
      icon: <Users size={20} />,
      path: "/admin/users",
      section: "admin",
      roles: ["admin"],
    },
    {
      id: "admin-finance",
      label: "Finance Management",
      icon: <DollarSign size={20} />,
      path: "/admin/finance",
      section: "admin",
      roles: ["admin"],
    },
    {
      id: "admin-plans",
      label: "Investment Plans",
      icon: <Package size={20} />,
      path: "/admin/plans",
      section: "admin",
      roles: ["admin"],
    },
    {
      id: "admin-commissions",
      label: "Commission Management",
      icon: <DollarSign size={20} />,
      path: "/admin/commissions",
      section: "admin",
      roles: ["admin"],
    },
    {
      id: "admin-rewards",
      label: "Rewards Management",
      icon: <Package size={20} />,
      path: "/admin/rewards",
      section: "admin",
      roles: ["admin"],
    },

    // Common navigation
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      section: "user",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/help",
      section: "user",
    },
  ];

  // Determine which section to show based on the current path
  const getCurrentSection = (): "public" | "user" | "admin" => {
    const path = location.pathname;
    if (path.startsWith("/admin")) return "admin";
    if (
      path.startsWith("/dashboard") ||
      path === "/settings" ||
      path === "/help"
    )
      return "user";
    return "public";
  };

  const currentSection = getCurrentSection();

  // Filter navigation items based on current section and user role
  const filteredNavItems = navigationItems.filter((item) => {
    // For public section, only show public items
    if (currentSection === "public") return item.section === "public";

    // For user section, only show user items if authenticated
    if (currentSection === "user") {
      return item.section === "user" && user;
    }

    // For admin section, only show admin items if user has admin role
    if (currentSection === "admin") {
      return item.section === "admin" && item.roles?.includes(userRole);
    }

    return false;
  });

  const handleLogout = async () => {
    await signOut();
    // Redirect will happen via ProtectedRoute component
  };

  return (
    <nav className="space-y-2">
      {filteredNavItems.map((item) => (
        <Link to={item.path} key={item.id}>
          <Button
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
          >
            <span className="mr-3 text-blue-500">{item.icon}</span>
            {item.label}
          </Button>
        </Link>
      ))}

      {user && (
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          <span className="mr-3 text-red-500">
            <LogOut size={20} />
          </span>
          Logout
        </Button>
      )}
    </nav>
  );
};

export default AppNavigation;
