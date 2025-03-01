import React from "react";
import AccountSummary from "@/components/dashboard/AccountSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AccountPage = () => {
  // Sample transaction data
  const transactions = [
    {
      id: "TX001",
      date: "2023-07-20",
      type: "deposit",
      amount: 1000,
      status: "completed",
    },
    {
      id: "TX002",
      date: "2023-07-19",
      type: "withdrawal",
      amount: 500,
      status: "pending",
    },
    {
      id: "TX003",
      date: "2023-07-18",
      type: "commission",
      amount: 250,
      status: "completed",
    },
    {
      id: "TX004",
      date: "2023-07-17",
      type: "investment",
      amount: 2000,
      status: "completed",
    },
    {
      id: "TX005",
      date: "2023-07-16",
      type: "withdrawal",
      amount: 1500,
      status: "failed",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Account Summary</h1>

      {/* Account Summary */}
      <AccountSummary />

      {/* Detailed Account Information */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="transactions"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="earnings"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Earnings
              </TabsTrigger>
              <TabsTrigger
                value="statements"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Statements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-t border-gray-700">
                        <td className="px-4 py-3 text-sm text-white">
                          {tx.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {tx.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-white capitalize">
                          {tx.type}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {tx.type === "withdrawal" ? (
                            <span className="text-red-400">-${tx.amount}</span>
                          ) : (
                            <span className="text-green-400">
                              +${tx.amount}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              tx.status === "completed"
                                ? "bg-green-900/30 text-green-400"
                                : tx.status === "pending"
                                  ? "bg-yellow-900/30 text-yellow-400"
                                  : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Transactions
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">Total Earnings</p>
                        <p className="text-2xl font-bold mt-1 text-white">
                          $6,288.00
                        </p>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500">23.1%</span>
                          <span className="text-xs text-gray-400 ml-1">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">
                          Investment Returns
                        </p>
                        <p className="text-2xl font-bold mt-1 text-white">
                          $4,125.50
                        </p>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500">15.7%</span>
                          <span className="text-xs text-gray-400 ml-1">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">
                          Referral Commissions
                        </p>
                        <p className="text-2xl font-bold mt-1 text-white">
                          $2,162.50
                        </p>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500">32.4%</span>
                          <span className="text-xs text-gray-400 ml-1">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="statements" className="mt-6">
              <div className="space-y-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        July 2023 Statement
                      </p>
                      <p className="text-sm text-gray-400">
                        Period: Jul 1, 2023 - Jul 31, 2023
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        June 2023 Statement
                      </p>
                      <p className="text-sm text-gray-400">
                        Period: Jun 1, 2023 - Jun 30, 2023
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        May 2023 Statement
                      </p>
                      <p className="text-sm text-gray-400">
                        Period: May 1, 2023 - May 31, 2023
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
