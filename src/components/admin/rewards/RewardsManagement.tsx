import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Gift,
  Trophy,
  Users,
  Target,
  Download,
  RefreshCw,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  type: "achievement" | "milestone" | "referral" | "loyalty";
  value: number;
  valueType: "cash" | "points" | "product";
  status: "active" | "inactive" | "draft";
  criteria: string;
  createdAt: string;
  claimedCount: number;
}

interface RewardClaim {
  id: string;
  rewardId: string;
  rewardName: string;
  userId: string;
  userName: string;
  claimDate: string;
  status: "pending" | "approved" | "rejected" | "fulfilled";
  value: number;
  valueType: "cash" | "points" | "product";
}

const RewardsManagement = () => {
  const [activeTab, setActiveTab] = useState("rewards");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddRewardDialogOpen, setIsAddRewardDialogOpen] = useState(false);

  // Sample rewards data
  const rewards: Reward[] = [
    {
      id: "RW001",
      name: "First Referral Bonus",
      description: "Reward for your first successful referral",
      type: "referral",
      value: 50,
      valueType: "cash",
      status: "active",
      criteria: "Complete 1 successful referral",
      createdAt: "2023-06-15",
      claimedCount: 125,
    },
    {
      id: "RW002",
      name: "Investment Milestone",
      description: "Reward for reaching $10,000 in investments",
      type: "milestone",
      value: 100,
      valueType: "cash",
      status: "active",
      criteria: "Reach $10,000 in total investments",
      createdAt: "2023-06-15",
      claimedCount: 87,
    },
    {
      id: "RW003",
      name: "Elite Trader Badge",
      description: "Recognition for completing 50 successful trades",
      type: "achievement",
      value: 500,
      valueType: "points",
      status: "active",
      criteria: "Complete 50 successful trades",
      createdAt: "2023-06-15",
      claimedCount: 42,
    },
    {
      id: "RW004",
      name: "One Year Anniversary",
      description: "Reward for being a member for one year",
      type: "loyalty",
      value: 75,
      valueType: "cash",
      status: "active",
      criteria: "Account age of 1 year",
      createdAt: "2023-06-15",
      claimedCount: 156,
    },
    {
      id: "RW005",
      name: "Premium Membership Gift",
      description: "Special gift for premium members",
      type: "loyalty",
      value: 1,
      valueType: "product",
      status: "inactive",
      criteria: "Premium membership for 3 months",
      createdAt: "2023-07-10",
      claimedCount: 0,
    },
    {
      id: "RW006",
      name: "Referral Champion",
      description: "Reward for referring 10 active users",
      type: "referral",
      value: 250,
      valueType: "cash",
      status: "draft",
      criteria: "Refer 10 users who make at least one investment",
      createdAt: "2023-07-15",
      claimedCount: 0,
    },
  ];

  // Sample reward claims data
  const rewardClaims: RewardClaim[] = [
    {
      id: "CL001",
      rewardId: "RW001",
      rewardName: "First Referral Bonus",
      userId: "1",
      userName: "John Doe",
      claimDate: "2023-07-18",
      status: "approved",
      value: 50,
      valueType: "cash",
    },
    {
      id: "CL002",
      rewardId: "RW002",
      rewardName: "Investment Milestone",
      userId: "2",
      userName: "Jane Smith",
      claimDate: "2023-07-17",
      status: "pending",
      value: 100,
      valueType: "cash",
    },
    {
      id: "CL003",
      rewardId: "RW003",
      rewardName: "Elite Trader Badge",
      userId: "3",
      userName: "Robert Johnson",
      claimDate: "2023-07-16",
      status: "fulfilled",
      value: 500,
      valueType: "points",
    },
    {
      id: "CL004",
      rewardId: "RW004",
      rewardName: "One Year Anniversary",
      userId: "4",
      userName: "Emily Davis",
      claimDate: "2023-07-15",
      status: "rejected",
      value: 75,
      valueType: "cash",
    },
    {
      id: "CL005",
      rewardId: "RW001",
      rewardName: "First Referral Bonus",
      userId: "5",
      userName: "Michael Wilson",
      claimDate: "2023-07-14",
      status: "pending",
      value: 50,
      valueType: "cash",
    },
  ];

  // Filter rewards based on search query and filters
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch =
      searchQuery === "" ||
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || reward.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" || reward.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Filter reward claims based on search query
  const filteredClaims = rewardClaims.filter((claim) => {
    return (
      searchQuery === "" ||
      claim.rewardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "fulfilled":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "milestone":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "referral":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "loyalty":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-4 w-4 text-purple-500" />;
      case "milestone":
        return <Target className="h-4 w-4 text-blue-500" />;
      case "referral":
        return <Users className="h-4 w-4 text-green-500" />;
      case "loyalty":
        return <Award className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getClaimStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "fulfilled":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Rewards Management</h1>
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
            onClick={() => setIsAddRewardDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Reward
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <Tabs
            defaultValue="rewards"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Rewards System</CardTitle>
              <TabsList className="grid grid-cols-2 bg-gray-800">
                <TabsTrigger
                  value="rewards"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Rewards
                </TabsTrigger>
                <TabsTrigger
                  value="claims"
                  className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Claims
                </TabsTrigger>
              </TabsList>
            </div>
            <CardDescription className="text-gray-400 mt-2">
              {activeTab === "rewards"
                ? "Create and manage rewards for user achievements and milestones"
                : "Track and process reward claims from users"}
            </CardDescription>
          </Tabs>
        </CardHeader>

        <CardContent>
          <TabsContent value="rewards" className="mt-0 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search rewards..."
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
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="loyalty">Loyalty</SelectItem>
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
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
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Value</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300 hidden lg:table-cell">
                      Claimed
                    </TableHead>
                    <TableHead className="text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRewards.length > 0 ? (
                    filteredRewards.map((reward) => (
                      <TableRow
                        key={reward.id}
                        className="hover:bg-gray-800/50 border-gray-700"
                      >
                        <TableCell className="font-medium text-white">
                          {reward.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-300">
                          {reward.description}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTypeColor(reward.type)}
                          >
                            <span className="flex items-center">
                              {getTypeIcon(reward.type)}
                              <span className="ml-1 capitalize">
                                {reward.type}
                              </span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {reward.valueType === "cash" && "$"}
                          {reward.value}
                          {reward.valueType === "points" && " points"}
                          {reward.valueType === "product" && " product"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(reward.status)}
                          >
                            {reward.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-300">
                          {reward.claimedCount}
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
                                Edit Reward
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              {reward.status === "active" ? (
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-yellow-400">
                                  <AlertCircle className="h-4 w-4 mr-2" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
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
                        No rewards found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredRewards.length} of {rewards.length} rewards
            </div>
          </TabsContent>

          <TabsContent value="claims" className="mt-0 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search claims..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-48 flex items-center space-x-2">
                  <Filter className="text-gray-400 h-4 w-4" />
                  <Select
                    defaultValue="all"
                    onValueChange={(value) => console.log(value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800/80 border-gray-700">
                    <TableHead className="text-gray-300">Claim ID</TableHead>
                    <TableHead className="text-gray-300">Reward</TableHead>
                    <TableHead className="text-gray-300">User</TableHead>
                    <TableHead className="text-gray-300">Value</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <TableRow
                        key={claim.id}
                        className="hover:bg-gray-800/50 border-gray-700"
                      >
                        <TableCell className="font-medium text-white">
                          {claim.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {claim.rewardName}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {claim.userName}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {claim.valueType === "cash" && "$"}
                          {claim.value}
                          {claim.valueType === "points" && " points"}
                          {claim.valueType === "product" && " product"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(claim.status)}
                          >
                            <span className="flex items-center">
                              {getClaimStatusIcon(claim.status)}
                              <span className="ml-1 capitalize">
                                {claim.status}
                              </span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-300">
                          {claim.claimDate}
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
                              {claim.status === "pending" && (
                                <>
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-blue-400">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {claim.status === "approved" && (
                                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                  <Gift className="h-4 w-4 mr-2" />
                                  Mark as Fulfilled
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
                        No claims found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredClaims.length} of {rewardClaims.length} claims
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* Add Reward Dialog */}
      <Dialog
        open={isAddRewardDialogOpen}
        onOpenChange={setIsAddRewardDialogOpen}
      >
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Reward</DialogTitle>
            <DialogDescription className="text-gray-400">
              Define a new reward for user achievements and milestones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rewardName" className="text-gray-300">
                  Reward Name
                </Label>
                <Input
                  id="rewardName"
                  placeholder="e.g. First Referral Bonus"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rewardStatus" className="text-gray-300">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Brief description of the reward"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rewardType" className="text-gray-300">
                  Reward Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="loyalty">Loyalty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria" className="text-gray-300">
                  Achievement Criteria
                </Label>
                <Input
                  id="criteria"
                  placeholder="e.g. Complete 5 successful referrals"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valueType" className="text-gray-300">
                  Reward Value Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select value type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value" className="text-gray-300">
                  Reward Value
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="e.g. 50"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRewardDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Reward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsManagement;
