import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useAuth } from "@/components/auth/AuthContext";

const MainLayout = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || "User";

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" userName={userName} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName={userName} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
