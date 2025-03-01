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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DollarSign,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  RefreshCw,
  Settings,
  Users,
  Percent,
  Edit,
  Plus,
  Layers,
  Network,
} from "lucide-react";

interface CommissionRule {
  id: string;
  name: string;
  description: string;
  type: "direct" | "binary" | "unilevel" | "matching";
  rate: number;
  level: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface CommissionPayout {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: "direct" | "binary" | "unilevel" | "matching";
  status: "pending" | "approved" | "paid" | "rejected";
  date: string;
  source: string;
  level: number;
}

const CommissionManagement = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample commission rules data
  const commissionRules: CommissionRule[] = [
    {
      id: "CR001",
      name: "Direct Referral Commission",
      description: "Commission earned from direct referrals",
      type: "direct",
      rate: 10,
      level: 1,
      status: "active",
      createdAt: "2023-05-15",
      updatedAt: "2023-05-15",
    },
    {
      id: "CR002",
      name: "Binary Team Commission",
      description: "Commission earned from binary team structure",
      type: "binary",
      rate: 8,
      level: 1,
      status: "active",
      createdAt: "2023-05-15",
      updatedAt: "2023-06-10",
    },
    {
      id: "CR003",
      name: "Unilevel Level 1 Commission",
      description: "Commission earned from level 1 in unilevel structure",
      type: "unilevel",
      rate: 7,
      level: 1,
      status: "active",
      createdAt: "2023-05-15",
      updatedAt: "2023-05-15",
    },
    {
      id: "CR004",
      name: "Unilevel Level 2 Commission",
      description: "Commission earned from level 2 in unilevel structure",
      type: "unilevel",
      rate: 5,
      level: 2,
      status: "active",
      createdAt: "2023-05-15",
      updatedAt: "2023-05-15",
    },
    {
      id: "CR005",
      name: "Unilevel Level 3 Commission",
      description: "Commission earned from level 3 in unilevel structure",
      type: "unilevel",
      rate: 3,
      level: 3,
      status: "active",
      createdAt: "2023-05-15",
      updatedAt: "2023-05-15",
    },
    {
      id: "CR006",
      name: "Matching Bonus",
      description: "Matching bonus from downline commissions",
      type: "matching",
      rate: 15,
      level: 1,
      status: "inactive",
      createdAt: "2023-06-20",
      updatedAt: "2023-06-20",
    },
  ];

  // Sample commission payouts data
  const commissionPayouts: CommissionPayout[] = [
    {
      id: "CP001",
      userId: "1",
      userName: "John Doe",
      amount: 250,
      type: "direct",
      status: "paid",
      date: "2023-07-15",
      source: "Referral: Jane Smith",
      level: 1,
    },
    {
      id: "CP002",
      userId: "2",
      userName: "Jane Smith",
      amount: 180,
      type: "binary",
      status: "pending",
      date: "2023-07-18",
      source: "Binary Team Volume",
      level: 1,
    },
    {
      id: "CP003",
      userId: "3",
      userName: "Robert Johnson",
      amount: 75,
      type: "unilevel",
      status: "approved",
      date: "2023-07-17",
      source: "Downline: Michael Wilson",
      level: 2,
    },
    {
      id: "CP004",
      userId: "4",
      userName: "Emily Davis",
      amount: 120,
      type: "direct",
      status: "paid",
      date: "2023-07-16",
      source: "Referral: David Miller",
      level: 1,
    },
    {
      id: "CP005",
      userId: "5",
      userName: "Michael Wilson",
      amount: 45,
      type: "unilevel",
      status: "rejected",
      date: "2023-07-14",
      source: "Downline: Sarah Brown",
      level: 3,
    },
  ];

  // Filter commission rules based on search query and filters
  const filteredRules = commissionRules.filter((rule) => {
    const matchesSearch =
      searchQuery === "" ||
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || rule.type === typeFilter;

    const matchesStatus = statusFilter === "all" || rule.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Filter commission payouts based on search query and filters
  const filteredPayouts = commissionPayouts.filter((payout) => {
    const matchesSearch =
      searchQuery === "" ||
      payout.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || payout.type === typeFilter;

    const matchesStatus = statusFilter === "all" || payout.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "direct":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "binary":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "unilevel":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "matching":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "direct":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "binary":
        return <Network className="h-4 w-4 text-purple-500" />;
      case "unilevel":
        return <Layers className="h-4 w-4 text-green-500" />;
      case "matching":
        return <Percent className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "rejected":
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Calculate total commissions
  const totalPendingCommissions = commissionPayouts
    .filter((p) => p.status === "pending" || p.status === "approved")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaidCommissions = commissionPayouts
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Commission Management</h1>
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
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Commission Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Pending Commissions</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalPendingCommissions.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">12.5%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-yellow-900/20">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Paid Commissions</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  ${totalPaidCommissions.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">8.3%</span>
                  <span className="text-xs text-gray-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-900/20">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Average Commission</p>
                <p className="text-2xl font-bold mt-1 text-white">
                  $
                  {(commissionPayouts.reduce((sum, p) => sum + p.amount, 0) /
                    commissionPayouts.length).toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">5.2%</span>
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
      </div>

      {/* Main Content Tabs */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <Tabs
            defaultValue="rules"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Commission System</CardTitle>
              <TabsList className="grid grid-cols-2 bg-gray-800">
                <TabsTrigger
                  value="rules"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Commission Rules
                </TabsTrigger>
                <TabsTrigger
                  value="payouts"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Commission Payouts
                </TabsTrigger>
              </TabsList>
            </div>
            <CardDescription className="text-gray-400 mt-2">
              {activeTab === "rules"
                ? "Configure and manage commission rules for your MLM structure"
                : "Track and process commission payouts to users"}
            </CardDescription>
          </Tabs>
        </CardHeader>

        <CardContent>
          <TabsContent value="rules" className="mt-0 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search rules..."
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
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="binary">Binary</SelectItem>
                        <SelectItem value="unilevel">Unilevel</SelectItem>
                        <SelectItem value="matching">Matching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-48 flex items-center space-x-2">
                    <Filter className="text-gray-400 h-4 w-4" />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>

            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800/80 border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Rate</TableHead>
                    <TableHead className="text-gray-300">Level</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.length > 0 ? (
                    filteredRules.map((rule) => (
                      <TableRow
                        key={rule.id}
                        className="hover:bg-gray-800/50 border-gray-700"
                      >
                        <TableCell className="font-medium text-white">
                          {rule.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-300">
                          {rule.description}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTypeColor(rule.type)}
                          >
                            <span className="flex items-center">
                              {getTypeIcon(rule.type)}
                              <span className="ml-1 capitalize">
                                {rule.type}
                              </span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {rule.rate}%
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {rule.level}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(rule.status)}
                          >
                            <span className="flex items-center">
                              {getStatusIcon(rule.status)}
                              <span className="ml-1 capitalize">
                                {rule.status}
                              </span>
                            </span>
                          </Badge>
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
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Rule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              {rule.status === "active" ? (
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-yellow-400">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-gray-400"
                      >
                        No commission rules found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredRules.length} of {commissionR