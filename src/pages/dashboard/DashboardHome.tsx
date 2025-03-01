import React from "react";
import AccountSummary from "@/components/dashboard/AccountSummary";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import ActiveInvestments from "@/components/dashboard/ActiveInvestments";
import InvestmentManagement from "@/components/dashboard/InvestmentManagement";
import AIAssistant from "@/components/dashboard/AIAssistant";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Account Summary */}
      <AccountSummary />

      {/* Performance and Active Investments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <ActiveInvestments />
        </div>
      </div>

      {/* Investment Management and AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InvestmentManagement />
        </div>
        <div className="lg:col-span-1">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
