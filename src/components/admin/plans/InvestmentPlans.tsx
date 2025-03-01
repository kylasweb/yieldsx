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
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  Clock,
  BarChart,
  Users,
} from "lucide-react";

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minInvestment: number;
  maxInvestment: number;
  roi: number;
  duration: string;
  durationDays: number;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  activeInvestors: number;
  totalInvested: number;
}

const InvestmentPlans = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isPlanDetailsOpen, setIsPlanDetailsOpen] = useState(false);

  // Sample investment plans data
  const plans: InvestmentPlan[] = [
    {
      id: "1",
      name: "Basic Plan",
      description: "Entry-level investment plan with low risk and steady returns",
      minInvestment: 100,
      maxInvestment: 1000,
      roi: 5,
      duration: "30 days",
      durationDays: 30,
      status: "active",
      createdAt: "2023-05-15",
      activeInvestors: 125,
      totalInvested: 45250,
    },
    {
      id: "2",
      name: "Standard Plan",
      description: "Mid-level investment plan with balanced risk and returns",
      minInvestment: 500,
      maxInvestment: 5000,
      roi: 8,
      duration: "60 days",
      durationDays: 60,
      status: "active",
      createdAt: "2023-05-15",
      activeInvestors: 87,
      totalInvested: 152500,
    },
    {
      id: "3",
      name: "Premium Plan",
      description: "High-level investment plan with higher risk and returns",
      minInvestment: 1000,
      maxInvestment: 10000,
      roi: 12,
      duration: "90 days",
      durationDays: 90,
      status: "active",
      createdAt: "2023-05-15",
      activeInvestors: 42,
      totalInvested: 215000,
    },
    {
      id: "4",
      name: "Elite Plan",
      description: "Premium investment plan for serious investors",
      minInvestment: 5000,
      maxInvestment: 50000,
      roi: 20,
      duration: "180 days",
      durationDays: 180,
      status: "active",
      createdAt: "2023-05-15",
      activeInvestors: 18,
      totalInvested: 325000,
    },
    {
      id: "5",
      name: "Platinum Plan",
      description: "Exclusive high-return investment opportunity",
      minInvestment: 10000,
      maxInvestment: 100000,
      roi: 25,
      duration: "365 days",
      durationDays: 365,
      status: "inactive",
      createdAt: "2023-06-20",
      activeInvestors: 0,
      totalInvested: 0,
    },
    {
      id: "6",
      name: "Quick Yield Plan",
      description: "Short-term investment with quick returns",
      minInvestment: 250,
      maxInvestment: 2500,
      roi: 3,
      duration: "15 days",
      durationDays: 15,
      status: "draft",
      createdAt: "2023-07-10",
      activeInvestors: 0,
      totalInvested: 0,
    },
  ];

  // Filter plans based on search query and status filter
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      searchQuery === "" ||
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || plan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleViewPlan = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setIsPlanDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Investment Plans</h1>
        <Button
          onClick={() => setIsAddPlanDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Manage Investment Plans</CardTitle>
          <CardDescription className="text-gray-400">
            Create and manage investment packages with custom ROI and durations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
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

          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="hover:bg-gray-800/80 border-gray-700">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300 hidden md:table-cell">
                    Min-Max Investment
                  </TableHead>
                  <TableHead className="text-gray-300">ROI</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300 hidden lg:table-cell">
                    Investors
                  </TableHead>
                  <TableHead className="text-gray-300 hidden lg:table-cell">
                    Total Invested
                  </TableHead>
                  <TableHead className="text-gray-300 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <TableRow
                      key={plan.id}
                      className="hover:bg-gray-800/50 border-gray-700"
                    >
                      <TableCell className="font-medium text-white">
                        {plan.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-300">
                        ${plan.minInvestment} - ${plan.maxInvestment}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {plan.roi}%
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {plan.duration}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(plan.status)}
                        >
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-300">
                        {plan.activeInvestors}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-300">
                        ${plan.totalInvested.toLocaleString()}
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
                              onClick={() => handleViewPlan(plan)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            {plan.status === "active" ? (
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-yellow-400">
                                <ToggleLeft className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-green-400">
                                <ToggleRight className="h-4 w-4 mr-2" />
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
                      colSpan={8}
                      className="h-24 text-center text-gray-400"
                    >
                      No investment plans found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredPlans.length} of {plans.length} investment plans
          </div>
        </CardContent>
      </Card>

      {/* Add Plan Dialog */}
      <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Investment Plan</DialogTitle>
            <DialogDescription className="text-gray-400">
              Define the details and parameters for a new investment plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planName" className="text-gray-300">
                  Plan Name
                </Label>
                <Input
                  id="planName"
                  placeholder="e.g. Gold Plan"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planStatus" className="text-gray-300">
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
                placeholder="Brief description of the investment plan"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minInvestment" className="text-gray-300">
                  Minimum Investment ($)
                </Label>
                <Input
                  id="minInvestment"
                  type="number"
                  placeholder="100"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxInvestment" className="text-gray-300">
                  Maximum Investment ($)
                </Label>
                <Input
                  id="maxInvestment"
                  type="number"
                  placeholder="1000"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roi" className="text-gray-300">
                  ROI (%)
                </Label>
                <Input
                  id="roi"
                  type="number"
                  placeholder="5"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-gray-300">
                  Duration (Days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Additional Options</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="compoundInterest"
                    className="rounded border-gray-700 bg-gray-800 text-blue-600"
                  />
                  <Label
                    htmlFor="compoundInterest"
                    className="text-sm text-gray-300 font-normal"
                  >
                    Allow Compound Interest
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="earlyWithdrawal"
                    className="rounded border-gray-700 bg-gray-800 text-blue-600"
                  />
                  <Label
                    htmlFor="earlyWithdrawal"
                    className="text-sm text-gray-300 font-normal"
                  >
                    Allow Early Withdrawal
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddPlanDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Details Dialog */}
      <Dialog open={isPlanDetailsOpen} onOpenChange={setIsPlanDetailsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Investment Plan Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed information about the investment plan.
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedPlan.name}</h3>
                  <p className="text-gray-400">{selectedPlan.description}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedPlan.status)}
                    >
                      {selectedPlan.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Plan Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-400">Investment Range</p>
                          <p className="text-white">
                            ${selectedPlan.minInvestment.toLocaleString()} - ${selectedPlan.maxInvestment.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="h-5 w