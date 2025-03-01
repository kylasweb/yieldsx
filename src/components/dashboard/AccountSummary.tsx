import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  Wallet,
  PiggyBank,
} from "lucide-react";

interface AccountMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface AccountSummaryProps {
  metrics?: AccountMetric[];
}

const AccountSummary = ({ metrics = [] }: AccountSummaryProps) => {
  // Default metrics if none are provided
  const defaultMetrics: AccountMetric[] = [
    {
      title: "Account Balance",
      value: "$24,563.00",
      change: 12.5,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Total Investments",
      value: "$18,275.00",
      change: 8.3,
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "Total Earnings",
      value: "$6,288.00",
      change: 23.1,
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Available for Investment",
      value: "$6,288.00",
      change: -2.4,
      icon: <PiggyBank className="h-5 w-5" />,
    },
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="w-full max-w-[1200px] bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayMetrics.map((metric, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.change >= 0 ? (
                      <>
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">
                          {metric.change}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-500">
                          {Math.abs(metric.change)}%
                        </span>
                      </>
                    )}
                    <span className="text-xs text-gray-400 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountSummary;
