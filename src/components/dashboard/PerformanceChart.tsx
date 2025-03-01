import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PerformanceChartProps {
  data?: {
    daily: PerformanceData[];
    weekly: PerformanceData[];
    monthly: PerformanceData[];
    yearly: PerformanceData[];
  };
  title?: string;
  subtitle?: string;
}

interface PerformanceData {
  name: string;
  investments: number;
  returns: number;
  date: string;
}

const defaultData = {
  daily: [
    { name: "Mon", investments: 1000, returns: 1050, date: "2023-06-01" },
    { name: "Tue", investments: 1050, returns: 1100, date: "2023-06-02" },
    { name: "Wed", investments: 1100, returns: 1080, date: "2023-06-03" },
    { name: "Thu", investments: 1080, returns: 1120, date: "2023-06-04" },
    { name: "Fri", investments: 1120, returns: 1150, date: "2023-06-05" },
    { name: "Sat", investments: 1150, returns: 1180, date: "2023-06-06" },
    { name: "Sun", investments: 1180, returns: 1220, date: "2023-06-07" },
  ],
  weekly: [
    { name: "Week 1", investments: 1000, returns: 1100, date: "2023-06-07" },
    { name: "Week 2", investments: 1100, returns: 1200, date: "2023-06-14" },
    { name: "Week 3", investments: 1200, returns: 1250, date: "2023-06-21" },
    { name: "Week 4", investments: 1250, returns: 1350, date: "2023-06-28" },
  ],
  monthly: [
    { name: "Jan", investments: 1000, returns: 1100, date: "2023-01-31" },
    { name: "Feb", investments: 1100, returns: 1200, date: "2023-02-28" },
    { name: "Mar", investments: 1200, returns: 1350, date: "2023-03-31" },
    { name: "Apr", investments: 1350, returns: 1450, date: "2023-04-30" },
    { name: "May", investments: 1450, returns: 1600, date: "2023-05-31" },
    { name: "Jun", investments: 1600, returns: 1750, date: "2023-06-30" },
  ],
  yearly: [
    { name: "2018", investments: 1000, returns: 1200, date: "2018-12-31" },
    { name: "2019", investments: 1200, returns: 1500, date: "2019-12-31" },
    { name: "2020", investments: 1500, returns: 1800, date: "2020-12-31" },
    { name: "2021", investments: 1800, returns: 2200, date: "2021-12-31" },
    { name: "2022", investments: 2200, returns: 2600, date: "2022-12-31" },
    { name: "2023", investments: 2600, returns: 3100, date: "2023-12-31" },
  ],
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data = defaultData,
  title = "Investment Performance",
  subtitle = "Track your investment growth over time",
}) => {
  const [timeframe, setTimeframe] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");
  const [dateRange, setDateRange] = useState<string>("Last 6 Months");

  // Calculate performance metrics
  const currentData = data[timeframe];
  const lastIndex = currentData.length - 1;
  const firstValue = currentData[0].returns;
  const lastValue = currentData[lastIndex].returns;
  const percentageChange = ((lastValue - firstValue) / firstValue) * 100;
  const isPositive = percentageChange >= 0;

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Tabs
            defaultValue="monthly"
            className="w-[400px]"
            onValueChange={(value) => setTimeframe(value as any)}
          >
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center">
            <Select defaultValue="Last 6 Months" onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
                <SelectItem value="All Time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="mr-8">
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-2xl font-bold">
                ${lastValue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Performance</p>
              <div className="flex items-center">
                <p
                  className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {isPositive ? "+" : ""}
                  {percentageChange.toFixed(2)}%
                </p>
                {isPositive ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500 ml-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500 ml-1" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data[timeframe]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorInvestments"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="investments"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorInvestments)"
                name="Investments"
              />
              <Area
                type="monotone"
                dataKey="returns"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorReturns)"
                name="Returns"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
