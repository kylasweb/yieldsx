import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
