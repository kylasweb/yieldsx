import React from "react";
import { Bell, Settings, Search, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminHeader = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md border-b border-gray-800 h-16 w-full px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Documentation
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600 hover:bg-blue-700"
            >
              5
            </Badge>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Admin"
                />
                <AvatarFallback className="bg-blue-600 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-900 border-gray-800 text-white"
          >
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Activity Log
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
