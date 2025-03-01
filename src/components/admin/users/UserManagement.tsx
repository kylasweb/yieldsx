import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Eye,
  UserCheck,
  Ban,
  Download,
  RefreshCw,
  Users,
  Activity,
  Wallet,
  MessageSquare,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending" | "suspended";
  joinDate: string;
  lastActive: string;
  balance: number;
  referrals: number;
}

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState(");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  // Sample user data
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-05-15",
      lastActive: "2023-07-20",
      balance: 1250.75,
      referrals: 3,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "leader",
      status: "active",
      joinDate: "2023-04-22",
      lastActive: "2023-07-19",
      balance: 3450.25,
      referrals: 12,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "user",
      status: "pending",
      joinDate: "2023-07-10",
      lastActive: "2023-07-10",
      balance: 0,
      referrals: 0,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-03-05",
      lastActive: "2023-07-20",
      balance: 5200.50,
      referrals: 8,
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-06-18",
      lastActive: "2023-07-15",
      balance: 750.25,
      referrals: 1,
    },
    {
      id: "6",
      name: "Sarah Brown",
      email: "sarah@example.com",
      role: "leader",
      status: "active",
      joinDate: "2023-05-30",
      lastActive: "2023-07-20",
      balance: 2800.75,
      referrals: 7,
    },
    {
      id: "7",
      name: "David Miller",
      email: "david@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2023-04-12",
      lastActive: "2023-06-25",
      balance: 125.50,
      referrals: 0,
    },
  ];

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "leader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "user":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
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
            onClick={() => setIsAddUserDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">User Accounts</CardTitle>
          <CardDescription className="text-gray-400">
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-48 flex items-center space-x-2">
                <Filter className="text-gray-400 h-4 w-4" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48 flex items-center space-x-2">
                <Shield className="text-gray-400 h-4 w-4" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="hover:bg-gray-800/80 border-gray-700">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300 hidden md:table-cell">
                    Join Date
                  </TableHead>
                  <TableHead className="text-gray-300 hidden lg:table-cell">
                    Balance
                  </TableHead>
                  <TableHead className="text-gray-300 hidden lg:table-cell">
                    Referrals
                  </TableHead>
                  <TableHead className="text-gray-300 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-gray-800/50 border-gray-700"
                    >
                      <TableCell className="font-medium text-white">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRoleColor(user.role)}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(user.status)}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-300">
                        {user.joinDate}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-300">
                        ${user.balance.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-300">
                        {user.referrals}
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
                            <DropdownMenuItem
                              className="hover:bg-gray-800 cursor-pointer"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            {user.status === "active" ? (
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-yellow-400">
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : user.status === "suspended" ? (
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate User
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
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
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm text-gray-300">
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm text-gray-300">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm text-gray-300">
                Role
              </label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed information about the user account.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-blue-500">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-gray-400">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={getRoleColor(selectedUser.role)}
                    >
                      {selectedUser.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedUser.status)}
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-4 bg-gray-800">
                  <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    <Activity className="h-4 w-4 mr-2" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    <Wallet className="h-4 w-4 mr-2" />
                    Financial
                  </TabsTrigger>
                  <TabsTrigger value="communication" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Communication
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Account Information</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">User ID:</span>
                            <span className="text-white">{selectedUser.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Join Date:</span>
                            <span className="text-white">{selectedUser.joinDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Active:</span>
                            <span className="text-white">{selectedUser.lastActive}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-white capitalize">{selectedUser.status}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Contact Information</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{selectedUser.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Phone:</span>
                            <span className="text-white">+1 (555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Financial Summary</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Current Balance:</span>
                            <span className="text-white">${selectedUser.balance.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Earnings:</span>
                            <span className="text-white">$4,250.75</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Withdrawals:</span>
                            <span className="text-white">$1,750.00</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Referral Information</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Referrals:</span>
                            <span className="text-white">{selectedUser.referrals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Referrals:</span>
                            <span className="text-white">{Math.floor(selectedUser.referrals * 0.8)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Referral Earnings:</span>
                            <span className="text-white">$750.25</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="mt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Recent Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500">
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-white">Deposit Completed</p>
                          <p className="text-sm text-gray-400">$500.00 was added to the account</p>
                          <p className="text-xs text-gray-500 mt-1">2023-07-18 14:32:45</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-500">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-white">Investment Made</p>
                          <p className="text-sm text-gray-400">Invested $250.00 in Gold Package</p>
                          <p className="text-xs text-gray-500 mt-1">2023-07-15 09:12:33</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-500">
                          <UserPlus className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-white">Referral Signup</p>
                          <p className="text-sm text-gray-400">New referral: Alex Thompson</p>
                          <p className="text-xs text-gray-500 mt-1">2023-07-10 16:45:22</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="financial" className="mt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Transaction History</h4>
                    <div className="rounded-md border border-gray-700 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-gray-800">
                          <TableRow className="hover:bg-gray-800/80 border-gray-700">
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Type</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-gray-800/50 border-gray-700">
                            <TableCell className="text-gray-300">2023-07-18</TableCell>
                            <TableCell className="text-gray-300">Deposit</TableCell>
                            <TableCell className="text-green-500">+$500.00</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-900/30 text-green-400">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-800/50 border-gray-700">
                            <TableCell className="text-gray-300">2023-07-15</TableCell>
                            <TableCell className="text-gray-300">Investment</TableCell>
                            <TableCell className="text-red-500">-$250.00</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-900/30 text-green-400">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-800/50 border-gray-700">
                            <TableCell className="text-gray-300">2023-07-05</TableCell>
                            <TableCell className="text-gray-300">Withdrawal</TableCell>
                            <TableCell className="text-red-500">-$100.00</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-900/30 text-green-400">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-800/50 border-gray-700">
                            <TableCell className="text-gray-300">2023-07-01</TableCell>
                            <TableCell className="text-gray-300">Commission</TableCell>
                            <TableCell className="text-green-500">+$75.25</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-900/30 text-green-400">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="communication" className="mt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Message History</h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-md border border-gray-700 bg-gray-800/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">Welcome to Yield Sx</p>
                            <p className="text-xs text-gray-500">2023-05-15 10:00:00</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-900/30 text-blue-400">
                            System
                          </Badge>
                        </div>
                        <p className="mt-2 text-gray-300">
                          Welcome to Yield Sx! We're excited to have you join our platform. If you have any questions, please don't hesitate to contact our support team.
                        </p>
                      </div>
                      <div className="p-4 rounded-md border border-gray-700 bg-gray-800/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">Investment Confirmation</p>
                            <p className="text-xs text-gray-500">2023-07-15 09:15:22</p>
                          </div>
                          <Badge variant="outline" className="bg-green-900/30 text-green-400">
                            Transaction
                          </Badge>
                        </div>
                        <p className="mt-2 text-gray-300">
                          Your investment of $250.00 in the Gold Package has been confirmed. You can track your investment performance in your dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUserDetailsOpen(false)}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
            >
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
