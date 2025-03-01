import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Users,
  Bot,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activePage?: string;
  userName?: string;
  userAvatar?: string;
}

const Sidebar = ({
  activePage = "dashboard",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: SidebarProps) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      id: "investments",
      label: "Investments",
      icon: <LineChart size={20} />,
      path: "/investments",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: <Wallet size={20} />,
      path: "/wallet",
    },
    {
      id: "referrals",
      label: "Referrals",
      icon: <Users size={20} />,
      path: "/referrals",
    },
    {
      id: "assistant",
      label: "AI Assistant",
      icon: <Bot size={20} />,
      path: "/assistant",
    },
  ];

  const bottomNavItems = [
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/help",
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={20} />,
      path: "/logout",
    },
  ];

  return (
    <div className="w-[280px] h-full bg-background border-r border-border flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">YS</span>
          </div>
          <h1 className="text-xl font-bold">Yield Sx</h1>
        </div>
      </div>

      <Separator />

      {/* User Profile */}
      <div className="p-4 flex items-center gap-3">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-border"
        />
        <div>
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-xs text-muted-foreground">Pro Trader</p>
        </div>
      </div>

      <Separator className="mb-2" />

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={activePage === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start ${activePage === item.id ? "font-medium" : ""}`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 mt-auto">
        <Separator className="mb-4" />
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button variant="ghost" className="w-full justify-start">
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="p-4 text-xs text-center text-muted-foreground">
        Yield Sx v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
