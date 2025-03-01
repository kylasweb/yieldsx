import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, DollarSign, Wallet, Package } from "lucide-react";

interface InvestmentManagementProps {
  balance?: number;
  packages?: Array<{
    id: string;
    name: string;
    minInvestment: number;
    roi: number;
    duration: string;
  }>;
  onDeposit?: (amount: number, method: string) => void;
  onWithdraw?: (amount: number, method: string) => void;
  onInvest?: (packageId: string, amount: number) => void;
}

const InvestmentManagement = ({
  balance = 5000,
  packages = [
    {
      id: "basic",
      name: "Basic Plan",
      minInvestment: 100,
      roi: 5,
      duration: "30 days",
    },
    {
      id: "standard",
      name: "Standard Plan",
      minInvestment: 500,
      roi: 8,
      duration: "60 days",
    },
    {
      id: "premium",
      name: "Premium Plan",
      minInvestment: 1000,
      roi: 12,
      duration: "90 days",
    },
    {
      id: "elite",
      name: "Elite Plan",
      minInvestment: 5000,
      roi: 20,
      duration: "180 days",
    },
  ],
  onDeposit = () => {},
  onWithdraw = () => {},
  onInvest = () => {},
}: InvestmentManagementProps) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState("credit_card");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bank_transfer");
  const [selectedPackage, setSelectedPackage] = useState(packages[0].id);
  const [investAmount, setInvestAmount] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(amount, depositMethod);
      setDepositAmount("");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      onWithdraw(amount, withdrawMethod);
      setWithdrawAmount("");
    }
  };

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
    if (
      !isNaN(amount) &&
      amount > 0 &&
      selectedPkg &&
      amount >= selectedPkg.minInvestment &&
      amount <= balance
    ) {
      onInvest(selectedPackage, amount);
      setInvestAmount("");
    }
  };

  const calculateROI = () => {
    const amount = parseFloat(investAmount);
    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
    if (!isNaN(amount) && amount > 0 && selectedPkg) {
      return ((amount * selectedPkg.roi) / 100).toFixed(2);
    }
    return "0.00";
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Investment Management
        </CardTitle>
        <CardDescription>
          Deposit, withdraw, or invest your funds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="invest" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Invest
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Amount to Deposit</h3>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Method</h3>
                <Select value={depositMethod} onValueChange={setDepositMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-sm">
                  Available Balance:{" "}
                  <span className="font-bold">${balance.toFixed(2)}</span>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Amount to Withdraw</h3>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={balance}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Withdrawal Method</h3>
                <Select
                  value={withdrawMethod}
                  onValueChange={setWithdrawMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select withdrawal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invest" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-sm">
                  Available Balance:{" "}
                  <span className="font-bold">${balance.toFixed(2)}</span>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Select Investment Package
                </h3>
                <Select
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.roi}% ROI ({pkg.duration})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Investment Amount</h3>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    max={balance}
                  />
                </div>
              </div>

              {investAmount && (
                <div className="p-4 border rounded-md bg-blue-50">
                  <h4 className="font-medium text-sm mb-2">ROI Calculation</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Investment Amount:</p>
                    <p className="font-medium">
                      ${parseFloat(investAmount || "0").toFixed(2)}
                    </p>

                    <p>Expected Return:</p>
                    <p className="font-medium text-green-600">
                      ${calculateROI()}
                    </p>

                    <p>Duration:</p>
                    <p className="font-medium">
                      {packages.find((pkg) => pkg.id === selectedPackage)
                        ?.duration || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        {activeTab === "deposit" && (
          <Button
            onClick={handleDeposit}
            disabled={!depositAmount || parseFloat(depositAmount) <= 0}
          >
            Deposit Funds <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

        {activeTab === "withdraw" && (
          <Button
            onClick={handleWithdraw}
            disabled={
              !withdrawAmount ||
              parseFloat(withdrawAmount) <= 0 ||
              parseFloat(withdrawAmount) > balance
            }
          >
            Withdraw Funds <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

        {activeTab === "invest" && (
          <Button
            onClick={handleInvest}
            disabled={
              !investAmount ||
              parseFloat(investAmount) <= 0 ||
              parseFloat(investAmount) > balance ||
              parseFloat(investAmount) <
                (packages.find((pkg) => pkg.id === selectedPackage)
                  ?.minInvestment || 0)
            }
          >
            Confirm Investment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default InvestmentManagement;
