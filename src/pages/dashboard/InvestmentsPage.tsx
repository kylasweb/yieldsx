import React, { useState } from "react";
import ActiveInvestments from "@/components/dashboard/ActiveInvestments";
import InvestmentManagement from "@/components/dashboard/InvestmentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const InvestmentsPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Sample investment packages
  const availablePackages = [
    {
      id: "basic",
      name: "Basic Plan",
      description:
        "Entry-level investment plan with low risk and steady returns",
      minInvestment: 100,
      maxInvestment: 1000,
      roi: 5,
      duration: "30 days",
      risk: "Low",
      status: "active",
    },
    {
      id: "standard",
      name: "Standard Plan",
      description: "Mid-level investment plan with balanced risk and returns",
      minInvestment: 500,
      maxInvestment: 5000,
      roi: 8,
      duration: "60 days",
      risk: "Medium",
      status: "active",
    },
    {
      id: "premium",
      name: "Premium Plan",
      description: "High-level investment plan with higher risk and returns",
      minInvestment: 1000,
      maxInvestment: 10000,
      roi: 12,
      duration: "90 days",
      risk: "Medium-High",
      status: "active",
    },
    {
      id: "elite",
      name: "Elite Plan",
      description: "Premium investment plan for serious investors",
      minInvestment: 5000,
      maxInvestment: 50000,
      roi: 20,
      duration: "180 days",
      risk: "High",
      status: "active",
    },
  ];

  // Sample investment history
  const investmentHistory = [
    {
      id: "INV001",
      plan: "Elite Plan",
      amount: 5000,
      startDate: "2023-02-15",
      endDate: "2023-08-14",
      status: "completed",
      roi: 20,
      profit: 1000,
    },
    {
      id: "INV002",
      plan: "Premium Plan",
      amount: 2000,
      startDate: "2023-04-10",
      endDate: "2023-07-09",
      status: "completed",
      roi: 12,
      profit: 240,
    },
    {
      id: "INV003",
      plan: "Standard Plan",
      amount: 1000,
      startDate: "2023-05-20",
      endDate: "2023-07-19",
      status: "completed",
      roi: 8,
      profit: 80,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Investments</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ActiveInvestments />
        </div>
        <div className="lg:col-span-2">
          <InvestmentManagement />
        </div>
      </div>

      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Investment Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="active"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Active Investments
              </TabsTrigger>
              <TabsTrigger
                value="packages"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Available Packages
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Investment History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full bg-blue-900/20">
                        <Package className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Gold Package
                        </h3>
                        <p className="text-sm text-gray-400">
                          3 months investment
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invested Amount:</span>
                        <span className="text-white font-medium">
                          $5,000.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Value:</span>
                        <span className="text-green-400 font-medium">
                          $5,750.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-green-400 font-medium">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Remaining:</span>
                        <span className="text-white font-medium">32 days</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm text-gray-400">
                            Started on May 15, 2023
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-900/30 text-green-400 border-green-800"
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-3 rounded-full bg-purple-900/20">
                        <Package className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Silver Package
                        </h3>
                        <p className="text-sm text-gray-400">
                          1 month investment
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invested Amount:</span>
                        <span className="text-white font-medium">
                          $2,500.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Value:</span>
                        <span className="text-green-400 font-medium">
                          $2,625.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-green-400 font-medium">+5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Remaining:</span>
                        <span className="text-white font-medium">12 days</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm text-gray-400">
                            Started on June 20, 2023
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-900/30 text-green-400 border-green-800"
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availablePackages.map((pkg) => (
                  <Card key={pkg.id} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-3 rounded-full bg-blue-900/20">
                          <Package className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">
                            Investment Range:
                          </span>
                          <span className="text-white font-medium">
                            ${pkg.minInvestment} - ${pkg.maxInvestment}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ROI:</span>
                          <span className="text-green-400 font-medium">
                            {pkg.roi}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white font-medium">
                            {pkg.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Risk Level:</span>
                          <span className="text-white font-medium">
                            {pkg.risk}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Start Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        End Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        ROI
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Profit
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentHistory.map((inv) => (
                      <tr key={inv.id} className="border-t border-gray-700">
                        <td className="px-4 py-3 text-sm text-white">
                          {inv.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {inv.plan}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          ${inv.amount}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {inv.startDate}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {inv.endDate}
                        </td>
                        <td className="px-4 py-3 text-sm text-green-400">
                          +{inv.roi}%
                        </td>
                        <td className="px-4 py-3 text-sm text-green-400">
                          +${inv.profit}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant="outline"
                            className="bg-green-900/30 text-green-400 border-green-800"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {inv.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentsPage;
