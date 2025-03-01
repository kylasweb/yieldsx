import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 65000, users: 1200 },
    { name: "Feb", revenue: 72000, users: 1350 },
    { name: "Mar", revenue: 85000, users: 1500 },
    { name: "Apr", revenue: 75000, users: 1400 },
    { name: "May", revenue: 92000, users: 1650 },
    { name: "Jun", revenue: 105000, users: 1800 },
    { name: "Jul", revenue: 110000, users: 1950 },
  ];

  const userActivityData = [
    { name: "Mon", active: 2400, new: 400 },
    { name: "Tue", active: 1980, new: 380 },
    { name: "Wed", active: 2800, new: 500 },
    { name: "Thu", active: 2700, new: 390 },
    { name: "Fri", active: 2900, new: 480 },
    { name: "Sat", active: 1800, new: 200 },
    { name: "Sun", active: 1500, new: 150 },
  ];

  const transactionData = [
    { time: "00:00", deposits: 12, withdrawals: 5 },
    { time: "04:00", deposits: 8, withdrawals: 3 },
    { time: "08:00", deposits: 25, withdrawals: 10 },
    { time: "12:00", deposits: 35, withdrawals: 15 },
    { time: "16:00", deposits: 30, withdrawals: 12 },
    { time: "20:00", deposits: 20, withdrawals: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>Date Range</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Refresh</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Users"
          value="24,563"
          change={12.5}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          bgClass="bg-blue-900/20"
        />
        <KpiCard
          title="Active Users"
          value="18,275"
          change={8.3}
          icon={<UserCheck className="h-5 w-5 text-green-500" />}
          bgClass="bg-green-900/20"
        />
        <KpiCard
          title="Total Revenue"
          value="$105,288"
          change={23.1}
          icon={<DollarSign className="h-5 w-5 text-yellow-500" />}
          bgClass="bg-yellow-900/20"
        />
        <KpiCard
          title="Avg. Commission"
          value="$42.75"
          change={-2.4}
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
          bgClass="bg-purple-900/20"
        />
      </div>

      {/* Revenue Chart */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Revenue & User Growth</CardTitle>
            <Tabs defaultValue="weekly" className="w-[300px]">
              <TabsList className="grid grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="daily"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue ($)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Activity and Real-time Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userActivityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend wrapperStyle={{ color: "#fff" }} />
                  <Bar dataKey="active" fill="#3b82f6" name="Active Users" />
                  <Bar dataKey="new" fill="#10b981" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Real-time Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    vertical={false}
                  />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend wrapperStyle={{ color: "#fff" }} />
                  <Bar dataKey="deposits" fill="#10b981" name="Deposits" />
                  <Bar
                    dataKey="withdrawals"
                    fill="#ef4444"
                    name="Withdrawals"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  bgClass: string;
}

const KpiCard = ({ title, value, change, icon, bgClass }: KpiCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-gray-900/70 border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-1 text-white">{value}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <>
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{change}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">
                    {Math.abs(change)}%
                  </span>
                </>
              )}
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${bgClass}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
