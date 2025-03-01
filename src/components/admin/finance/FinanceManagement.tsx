import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  CreditCard,
  Wallet,
  RefreshCw,
  Calendar,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "deposit" | "withdrawal" | "commission" | "investment";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  method: string;
}

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: "TX123456",
      userId: "1",
      userName: "John Doe",
      type: "deposit",
      amount: 1000,
      status: "completed",
      date: "2023-07-20",
      method: "Credit Card",
    },
    {
      id: "TX123457",
      userId: "2",
      userName: "Jane Smith",
      type: "withdrawal",
      amount: 500,
      status: "pending",
      date: "2023-07-19",
      method: "Bank Transfer",
    },
    {
      id: "TX123458",
      userId: "3",
      userName: "Robert Johnson",
      type: "commission",
      amount: 250,
      status: "completed",
      date: "2023-07-18",
      method: "E-Wallet",
    },
    {
      id: "TX123459",
      userId: "4",
      userName: "Emily Davis",
      type: "investment",
      amount: 2000,
      status: "completed",
      date: "2023-07-17",
      method: "Crypto",
    },
    {
      id: "TX123460",
      userId: "5",
      userName: "Michael Wilson",
      type: "withdrawal",
      amount: 1500,
      status: "failed",
      date: "2023-07-16",
      method: "Bank Transfer",
    },
    {
      id: "TX123461",
      userId: "1",
      userName: "John Doe",
      type: "deposit",
      amount: 500,
      status: "completed",
      date: "2023-07-15",
      method: "Credit Card",
    },
    {
      id: "TX123462",
      userId: "2",
      userName: "Jane Smith",
      type: "commission",
      amount: 175,
      status: "completed",
      date: "2023-07-14",
      method: "E-Wallet",
    },
  ];

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchQuery === "" ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "withdrawal":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "commission":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "investment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case "commission":
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case "investment":
        return <Wallet className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Calculate financial metrics
  const totalDeposits = transactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCommissions = transactions
    .filter((t) => t.type === "commission" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalInvestments = transactions
    .filter((t) => t.type === "investment" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Finance Management</h1>
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

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Deposits</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalDeposits.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">12.5%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-900/20">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Withdrawals</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalWithdrawals.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">8.3%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-900/20">
                <Wallet className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Commissions</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalCommissions.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">23.1%</span>
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
                <p className="text-sm text-gray-400">Total Investments</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalInvestments.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">15.7%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-900/20">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <Tabs
            defaultValue="transactions"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Financial Management</CardTitle>
              <TabsList className="grid grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="transactions"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="commissions"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Commissions
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Reports
                </TabsTrigger>
              </TabsList>
            </div>
            <CardDescription className="text-gray-400 mt-2">
              {activeTab === "transactions"
                ? "Manage and track all financial transactions"
                : activeTab === "commissions"
                  ? "View and manage commission payouts"
                  : "Generate and download financial reports"}
            </CardDescription>
          </Tabs>
        </CardHeader>

        <CardContent>
          <TabsContent value="transactions" className="mt-0 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-48 flex items-center space-x-2">
                  <Filter className="text-gray-400 h-4 w-4" />
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="commission">Commissions</SelectItem>
                      <SelectItem value="investment">Investments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48 flex items-center space-x-2">
                  <Filter className="text-gray-400 h-4 w-4" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800/80 border-gray-700">
                    <TableHead className="text-gray-300">
                      Transaction ID
                    </TableHead>
                    <TableHead className="text-gray-300">User</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-gray-300 hidden lg:table-cell">
                      Method
                    </TableHead>
                    <TableHead className="text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        className="hover:bg-gray-800/50 border-gray-700"
                      >
                        <TableCell className="font-medium text-white">
                          {transaction.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {transaction.userName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTypeColor(transaction.type)}
                          >
                            <span className="flex items-center">
                              {getTypeIcon(transaction.type)}
                              <span className="ml-1 capitalize">
                                {transaction.type}
                              </span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          ${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(transaction.status)}
                          >
                            <span className="flex items-center">
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">
                                {transaction.status}
                              </span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-300">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-300">
                          {transaction.method}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-300 hover:text-white hover:bg-gray-800"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-900 border-gray-800 text-white"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {transaction.status === "pending" && (
                                <>
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                <Download className="h-4 w-4 mr-2" />
                                Export Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-gray-400"
                      >
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </div>
          </TabsContent>

          <TabsContent value="commissions" className="mt-0 space-y-4">
            <div className="p-8 text-center">
              <DollarSign className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Commission Management
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Configure commission rates, view commission history, and manage
                payouts for your affiliate network.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Configure Commission Rules
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-0 space-y-4">
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Financial Reports
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Generate detailed financial reports including profit & loss
                statements, balance sheets, and tax reports.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Generate New Report
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceManagement;
