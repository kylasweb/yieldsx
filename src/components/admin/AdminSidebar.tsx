import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  LineChart,
  Package,
  Award,
  Layers,
  Settings,
  HelpCircle,
  LogOut,
  Cpu,
  Briefcase,
  Trophy,
  MessageSquare,
  Palette,
  Database,
  ShieldCheck,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(`/admin${path}`);
  };

  const mainNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      id: "finance",
      label: "Finance Management",
      icon: <DollarSign size={20} />,
      path: "/admin/finance",
    },
    {
      id: "analytics",
      label: "Analytics & Reports",
      icon: <LineChart size={20} />,
      path: "/admin/analytics",
    },
    {
      id: "plans",
      label: "Investment Plans",
      icon: <Package size={20} />,
      path: "/admin/plans",
    },
    {
      id: "rewards",
      label: "Rewards Management",
      icon: <Award size={20} />,
      path: "/admin/rewards",
    },
    {
      id: "commissions",
      label: "Commission Management",
      icon: <Briefcase size={20} />,
      path: "/admin/commissions",
    },
    {
      id: "pools",
      label: "Pool Management",
      icon: <Layers size={20} />,
      path: "/admin/pools",
    },
    {
      id: "ranks",
      label: "Rank Management",
      icon: <Trophy size={20} />,
      path: "/admin/ranks",
    },
  ];

  const secondaryNavItems = [
    {
      id: "tasks",
      label: "Task Management",
      icon: <MessageSquare size={20} />,
      path: "/admin/tasks",
    },
    {
      id: "plan-creator",
      label: "Plan Creator",
      icon: <Cpu size={20} />,
      path: "/admin/plan-creator",
    },
    {
      id: "tokens",
      label: "Token Management",
      icon: <Database size={20} />,
      path: "/admin/tokens",
    },
    {
      id: "website-editor",
      label: "Website Editor",
      icon: <Palette size={20} />,
      path: "/admin/website-editor",
    },
  ];

  const bottomNavItems = [
    {
      id: "settings",
      label: "System Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
    {
      id: "security",
      label: "Security",
      icon: <ShieldCheck size={20} />,
      path: "/admin/security",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/admin/help",
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={20} />,
      path: "/logout",
    },
  ];

  return (
    <div className="w-[280px] h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">YS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Yield Sx</h1>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Admin Profile */}
      <div className="p-4 flex items-center gap-3">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border border-gray-700"
        />
        <div>
          <p className="font-medium text-sm text-white">Admin User</p>
          <p className="text-xs text-gray-400">System Administrator</p>
        </div>
      </div>

      <Separator className="mb-2 bg-gray-800" />

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive(item.path) ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                    >
                      <span className="mr-3 text-blue-500">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <Separator className="my-4 bg-gray-800" />

        <p className="px-4 text-xs font-semibold text-gray-400 mb-2">
          ADVANCED TOOLS
        </p>
        <div className="space-y-1">
          {secondaryNavItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive(item.path) ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"}`}
                    >
                      <span className="mr-3 text-purple-500">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 mt-auto">
        <Separator className="mb-4 bg-gray-800" />
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                      {item.label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="p-4 text-xs text-center text-gray-500">
        Yield Sx Admin v1.0.0
      </div>
    </div>
  );
};

export default AdminSidebar;
