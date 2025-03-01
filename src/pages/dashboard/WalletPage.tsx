import React, { useState } from "react";
import WalletIntegration from "@/components/wallet/WalletIntegration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const WalletPage = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample wallet data
  const wallets = [
    {
      id: "1",
      name: "Platform Wallet",
      balance: 2450.75,
      type: "internal",
      status: "active",
    },
    {
      id: "2",
      name: "MetaMask",
      balance: 0.75,
      type: "ethereum",
      status: "connected",
    },
    {
      id: "3",
      name: "Binance",
      balance: 1250.5,
      type: "exchange",
      status: "connected",
    },
  ];

  // Sample transaction data
  const transactions = [
    {
      id: "TX001",
      date: "2023-07-20",
      type: "deposit",
      amount: 1000,
      wallet: "Platform Wallet",
      status: "completed",
    },
    {
      id: "TX002",
      date: "2023-07-19",
      type: "withdrawal",
      amount: 500,
      wallet: "Binance",
      status: "pending",
    },
    {
      id: "TX003",
      date: "2023-07-18",
      type: "transfer",
      amount: 250,
      wallet: "MetaMask",
      status: "completed",
    },
    {
      id: "TX004",
      date: "2023-07-17",
      type: "deposit",
      amount: 2000,
      wallet: "Platform Wallet",
      status: "completed",
    },
    {
      id: "TX005",
      date: "2023-07-16",
      type: "withdrawal",
      amount: 1500,
      wallet: "Platform Wallet",
      status: "failed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Wallet Management</h1>
        <Button
          onClick={() => setShowWalletModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Balance</p>
                <p className="text-2xl font-bold mt-1 text-white">$3,702.00</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">12.5%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
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
                <p className="text-sm text-gray-400">Total Deposits</p>
                <p className="text-2xl font-bold mt-1 text-white">$5,250.00</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">8.3%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-900/20">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Withdrawals</p>
                <p className="text-2xl font-bold mt-1 text-white">$1,548.00</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">5.2%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-900/20">
                <ArrowDownRight className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Management */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Wallet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="overview"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="deposit"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Deposit
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {wallets.map((wallet) => (
                    <Card
                      key={wallet.id}
                      className="bg-gray-800/50 border-gray-700"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 p-3 rounded-full bg-blue-900/20">
                            <Wallet className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {wallet.name}
                            </h3>
                            <p className="text-sm text-gray-400 capitalize">
                              {wallet.type}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Balance:</span>
                            <span className="text-white font-medium">
                              ${wallet.balance.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <Badge
                              variant="outline"
                              className="bg-green-900/30 text-green-400 border-green-800"
                            >
                              {wallet.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                          >
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Deposit
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                          >
                            <ArrowDownRight className="h-4 w-4 mr-2" />
                            Withdraw
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

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
                          Wallet
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
                          <td className="px-4 py-3 text-sm">
                            {tx.type === "withdrawal" ? (
                              <span className="text-red-400">
                                -${tx.amount}
                              </span>
                            ) : (
                              <span className="text-green-400">
                                +${tx.amount}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-white">
                            {tx.wallet}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Badge
                              variant="outline"
                              className={
                                tx.status === "completed"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : tx.status === "pending"
                                    ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                                    : "bg-red-900/30 text-red-400 border-red-800"
                              }
                            >
                              {tx.status === "completed" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {tx.status === "pending" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {tx.status === "failed" && (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {tx.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deposit" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Deposit Funds
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            Select Wallet
                          </label>
                          <select className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                            {wallets.map((wallet) => (
                              <option key={wallet.id} value={wallet.id}>
                                {wallet.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            Amount
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-9 bg-gray-700 border-gray-600 text-white"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            Payment Method
                          </label>
                          <select className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                            <option value="credit_card">Credit Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="crypto">Cryptocurrency</option>
                          </select>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          Deposit Funds
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Payment Methods
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-700 rounded-md flex items-center">
                          <div className="mr-4 p-2 rounded-full bg-blue-900/20">
                            <CreditCard className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white">
                              Credit Card
                            </p>
                            <p className="text-sm text-gray-400">
                              Visa ending in 4242
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-900/30 text-green-400 border-green-800"
                          >
                            Default
                          </Badge>
                        </div>

                        <div className="p-4 border border-gray-700 rounded-md flex items-center">
                          <div className="mr-4 p-2 rounded-full bg-blue-900/20">
                            <Wallet className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white">
                              Bank Account
                            </p>
                            <p className="text-sm text-gray-400">
                              Chase Bank ****1234
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Withdraw Funds
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            From Wallet
                          </label>
                          <select className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                            {wallets.map((wallet) => (
                              <option key={wallet.id} value={wallet.id}>
                                {wallet.name} (${wallet.balance.toFixed(2)})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            Amount
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-9 bg-gray-700 border-gray-600 text-white"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">
                            Withdrawal Method
                          </label>
                          <select className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="crypto">Cryptocurrency</option>
                            <option value="paypal">PayPal</option>
                          </select>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                          <ArrowDownRight className="h-4 w-4 mr-2" />
                          Withdraw Funds
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Withdrawal Information
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-700 rounded-md space-y-3">
                          <p className="font-medium text-white">
                            Withdrawal Limits
                          </p>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Minimum:</span>
                            <span className="text-white">$50.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Maximum (Daily):
                            </span>
                            <span className="text-white">$5,000.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Maximum (Monthly):
                            </span>
                            <span className="text-white">$50,000.00</span>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-700 rounded-md space-y-3">
                          <p className="font-medium text-white">
                            Processing Time
                          </p>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Bank Transfer:
                            </span>
                            <span className="text-white">
                              1-3 business days
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Cryptocurrency:
                            </span>
                            <span className="text-white">10-30 minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">PayPal:</span>
                            <span className="text-white">1-24 hours</span>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-700 rounded-md space-y-3">
                          <p className="font-medium text-white">Fees</p>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Bank Transfer:
                            </span>
                            <span className="text-white">$15 or 1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Cryptocurrency:
                            </span>
                            <span className="text-white">0.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">PayPal:</span>
                            <span className="text-white">2.5%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Wallet Integration Modal */}
      {showWalletModal && (
        <WalletIntegration
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
      )}
    </div>
  );
};

export default WalletPage;
