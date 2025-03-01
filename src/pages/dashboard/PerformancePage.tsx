import React from "react";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

const PerformancePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
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
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-2xl font-bold mt-1 text-white">+24.5%</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">3.2%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-900/20">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Best Performing</p>
                <p className="text-2xl font-bold mt-1 text-white">Elite Plan</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">32.1%</span>
                  <span className="text-xs text-gray-400 ml-1">ROI</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-900/20">
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Worst Performing</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  Bronze Plan
                </p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">-2.4%</span>
                  <span className="text-xs text-gray-400 ml-1">ROI</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-900/20">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Performance Chart */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Investment Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceChart />
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="byPlan" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="byPlan"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                By Plan
              </TabsTrigger>
              <TabsTrigger
                value="byPeriod"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                By Period
              </TabsTrigger>
              <TabsTrigger
                value="byMetric"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                By Metric
              </TabsTrigger>
            </TabsList>

            <TabsContent value="byPlan" className="mt-6">
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Investment
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Current Value
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        ROI
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-sm text-white">
                        Elite Plan
                      </td>
                      <td className="px-4 py-3 text-sm text-white">$5,000</td>
                      <td className="px-4 py-3 text-sm text-white">$6,605</td>
                      <td className="px-4 py-3 text-sm text-green-400">
                        +32.1%
                      </td>
                      <td className="px-4 py-3 text-sm text-white">180 days</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-sm text-white">
                        Gold Plan
                      </td>
                      <td className="px-4 py-3 text-sm text-white">$2,500</td>
                      <td className="px-4 py-3 text-sm text-white">$2,875</td>
                      <td className="px-4 py-3 text-sm text-green-400">
                        +15.0%
                      </td>
                      <td className="px-4 py-3 text-sm text-white">90 days</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-sm text-white">
                        Silver Plan
                      </td>
                      <td className="px-4 py-3 text-sm text-white">$1,000</td>
                      <td className="px-4 py-3 text-sm text-white">$1,050</td>
                      <td className="px-4 py-3 text-sm text-green-400">
                        +5.0%
                      </td>
                      <td className="px-4 py-3 text-sm text-white">30 days</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-sm text-white">
                        Bronze Plan
                      </td>
                      <td className="px-4 py-3 text-sm text-white">$500</td>
                      <td className="px-4 py-3 text-sm text-white">$488</td>
                      <td className="px-4 py-3 text-sm text-red-400">-2.4%</td>
                      <td className="px-4 py-3 text-sm text-white">15 days</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="byPeriod" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Daily</p>
                      <p className="text-xl font-bold text-white">+0.3%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Weekly</p>
                      <p className="text-xl font-bold text-white">+1.7%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Monthly</p>
                      <p className="text-xl font-bold text-white">+7.2%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Yearly</p>
                      <p className="text-xl font-bold text-white">+24.5%</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[300px] bg-gray-800/50 border border-gray-700 rounded-md p-4 flex items-center justify-center">
                  <p className="text-gray-400">
                    Period comparison chart would be displayed here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="byMetric" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">ROI</p>
                      <p className="text-xl font-bold text-white">+24.5%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Profit</p>
                      <p className="text-xl font-bold text-white">$2,163.00</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-400">Risk Score</p>
                      <p className="text-xl font-bold text-white">
                        Medium (3.5/5)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[300px] bg-gray-800/50 border border-gray-700 rounded-md p-4 flex items-center justify-center">
                  <p className="text-gray-400">
                    Metric comparison chart would be displayed here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformancePage;
