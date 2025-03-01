import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Copy,
  Share2,
  Users,
  UserPlus,
  ChevronRight,
  DollarSign,
} from "lucide-react";

interface ReferralUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  commission: number;
  status: "active" | "pending";
  referrals?: number;
}

interface ReferralNetworkProps {
  referralCode?: string;
  referralLink?: string;
  referralUsers?: ReferralUser[];
  totalCommission?: number;
  totalReferrals?: number;
}

const ReferralNetwork = ({
  referralCode = "REF123456",
  referralLink = "https://tradeplatform.com/ref/REF123456",
  referralUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2023-05-15",
      commission: 125.5,
      status: "active",
      referrals: 3,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2023-06-22",
      commission: 75.25,
      status: "active",
      referrals: 1,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      joinDate: "2023-07-10",
      commission: 50.0,
      status: "pending",
      referrals: 0,
    },
  ],
  totalCommission = 250.75,
  totalReferrals = 4,
}: ReferralNetworkProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = () => {
    // This would typically open a share dialog or modal
    if (navigator.share) {
      navigator.share({
        title: "Join my trading network",
        text: "Use my referral link to join the trading platform and we both earn bonuses!",
        url: referralLink,
      });
    }
  };

  return (
    <div className="bg-white w-full max-w-[600px] rounded-lg shadow-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Referral Network
          </CardTitle>
          <CardDescription>
            Invite friends and earn commission on their trades
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalReferrals}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Commission</p>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">
                  ${totalCommission.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <Input value={referralLink} readOnly className="bg-white" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy link"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={shareReferralLink}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Referral Network Visualization */}
          <div>
            <h3 className="text-sm font-medium mb-2">Your Referrals</h3>
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
              {referralUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${user.status === "active" ? "bg-white" : "bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${user.commission.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.status === "active" ? "Active" : "Pending"}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite More Friends
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReferralNetwork;
