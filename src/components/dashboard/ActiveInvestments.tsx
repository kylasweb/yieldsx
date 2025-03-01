import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface Investment {
  id: string;
  packageName: string;
  amountInvested: number;
  currentValue: number;
  roi: number;
  status: "increasing" | "decreasing" | "stable";
  duration: string;
  progress: number;
}

interface ActiveInvestmentsProps {
  investments?: Investment[];
  title?: string;
}

const ActiveInvestments = ({
  investments = [
    {
      id: "1",
      packageName: "Gold Package",
      amountInvested: 5000,
      currentValue: 5750,
      roi: 15,
      status: "increasing" as const,
      duration: "3 months",
      progress: 65,
    },
    {
      id: "2",
      packageName: "Silver Package",
      amountInvested: 2500,
      currentValue: 2625,
      roi: 5,
      status: "stable" as const,
      duration: "1 month",
      progress: 30,
    },
    {
      id: "3",
      packageName: "Bronze Package",
      amountInvested: 1000,
      currentValue: 950,
      roi: -5,
      status: "decreasing" as const,
      duration: "2 weeks",
      progress: 85,
    },
  ],
  title = "Active Investments",
}: ActiveInvestmentsProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {title}
          <Badge className="ml-2">{investments.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">
                  {investment.packageName}
                </h3>
                <StatusBadge status={investment.status} roi={investment.roi} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Invested</p>
                  <p className="font-semibold">
                    ${investment.amountInvested.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Current Value</p>
                  <p className="font-semibold">
                    ${investment.currentValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>Progress ({investment.progress}%)</span>
                <span>{investment.duration}</span>
              </div>
              <Progress value={investment.progress} className="h-1.5" />
            </div>
          ))}
        </div>

        {investments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500">No active investments</p>
            <p className="text-sm text-gray-400">
              Start investing to see your portfolio here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatusBadgeProps {
  status: "increasing" | "decreasing" | "stable";
  roi: number;
}

const StatusBadge = ({ status, roi }: StatusBadgeProps) => {
  const isPositive = roi >= 0;

  if (status === "increasing") {
    return (
      <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
        <ArrowUpRight className="h-3 w-3 mr-1" />+{Math.abs(roi)}%
      </div>
    );
  }

  if (status === "decreasing") {
    return (
      <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-medium">
        <ArrowDownRight className="h-3 w-3 mr-1" />-{Math.abs(roi)}%
      </div>
    );
  }

  return (
    <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-medium">
      {isPositive ? "+" : ""}
      {roi}%
    </div>
  );
};

export default ActiveInvestments;
