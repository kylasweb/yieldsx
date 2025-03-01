import React from "react";
import ReferralNetwork from "@/components/referral/ReferralNetwork";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Share2, ArrowUpRight, UserPlus, DollarSign, Award } from "lucide-react";

const ReferralPage = () => {
  const [copied, setCopied] = React.useState(false);
  const referralLink = "https://tradeplatform.com/ref/REF123456";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Sample referral data
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    pendingReferrals: 4,
    totalCommission: 425.50,
    pendingCommission: 125.25,
    paidCommission: 300.25,
  };
  
  // Sample commission structure
  const commissionStructure = [
    { level: 1, rate: 10, description: "Direct referrals" },
    { level: 2, rate: 5, description: "Second level referrals" },
    { level: 3, rate: 3, description: "Third level referrals" },
    { level: 4, rate: 1, description: "Fourth level referrals" },
  ];
  
  // Sample referral users
  const referralUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", joinDate: "2023-05-15", commission: 125.5, status: "active", referrals: 3 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", joinDate: "2023-06-22", commission: 75.25, status: "active", referrals: 1 },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", joinDate: "2023-07-10", commission: 50.0, status: "pending", referrals: 0 },
    { id: "4", name: "Emily Davis", email: "emily@example.com", joinDate: "2023-07-05", commission: 75.0, status: "active", referrals: 2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Referral Program</h1>
      
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Referrals</p>
                <p className="text-2xl font-bold mt-1 text-white">{referralStats.totalReferrals}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {referralStats.activeReferrals} active, {referralStats.pendingReferrals} pending
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-900/20">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Commission</p>
                <p className="text-2xl font-bold mt-1 text-white">${referralStats.totalCommission.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">15.2%</span>
                  <span className="text-xs text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-900/20">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/70 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Commission Rate</p>
                <p className="text-2xl font-bold mt-1 text-white">Up to 10%</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-400">Multi-level commission structure</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-900/20">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Referral Link */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input 
                value={referralLink} 
                readOnly 
                className="bg-gray-800 border-gray-700 text-white pr-24"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Friends
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Referral Management */}
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Referral Management</Car