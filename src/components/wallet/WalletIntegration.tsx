import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Wallet, ArrowRight, Check, AlertCircle } from "lucide-react";

interface WalletIntegrationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface WalletTransaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal";
  amount: string;
  status: "completed" | "pending" | "failed";
}

const WalletIntegration = ({
  isOpen = true,
  onClose = () => {},
}: WalletIntegrationProps) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected" | "failed"
  >("disconnected");

  // Mock transaction data
  const transactions: WalletTransaction[] = [
    {
      id: "1",
      date: "2023-06-15",
      type: "deposit",
      amount: "0.5 ETH",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-06-10",
      type: "withdrawal",
      amount: "0.2 ETH",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-06-05",
      type: "deposit",
      amount: "1.0 ETH",
      status: "pending",
    },
  ];

  const handleConnectWallet = (walletType: string) => {
    setSelectedWallet(walletType);
    setConnectionStatus("connecting");

    // Simulate connection process
    setTimeout(() => {
      // 90% chance of successful connection
      if (Math.random() > 0.1) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("failed");
      }
    }, 1500);
  };

  const handleDisconnect = () => {
    setSelectedWallet(null);
    setConnectionStatus("disconnected");
  };

  const renderWalletOptions = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {["MetaMask", "TrustWallet", "Binance"].map((wallet) => (
        <Card
          key={wallet}
          className={`cursor-pointer hover:border-primary transition-colors ${selectedWallet === wallet ? "border-primary" : ""}`}
          onClick={() => handleConnectWallet(wallet)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-center">{wallet}</CardTitle>
            <CardDescription className="text-center mt-2">
              Connect your {wallet} wallet
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case "connecting":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full border-4 border-t-primary border-muted animate-spin mb-4"></div>
            <h3 className="text-lg font-medium">
              Connecting to {selectedWallet}
            </h3>
            <p className="text-muted-foreground mt-2">
              Please approve the connection request in your wallet
            </p>
          </div>
        );
      case "connected":
        return (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">
              Connected to {selectedWallet}
            </h3>
            <p className="text-muted-foreground mt-2">
              Your wallet is now connected to the platform
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={handleDisconnect}
            >
              Disconnect Wallet
            </Button>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium">Connection Failed</h3>
            <p className="text-muted-foreground mt-2">
              Unable to connect to {selectedWallet}. Please try again.
            </p>
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setConnectionStatus("disconnected")}
              >
                Go Back
              </Button>
              <Button onClick={() => handleConnectWallet(selectedWallet || "")}>
                Try Again
              </Button>
            </div>
          </div>
        );
      default:
        return renderWalletOptions();
    }
  };

  const renderTransactionHistory = () => (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Transaction History</h3>
      {transactions.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t">
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className="px-4 py-3 text-sm capitalize">
                    {transaction.type}
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.amount}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Wallet Integration</DialogTitle>
          <DialogDescription>
            Connect and manage your external wallets for seamless transactions.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="connect" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connect">Connect Wallet</TabsTrigger>
            <TabsTrigger
              value="transactions"
              disabled={connectionStatus !== "connected"}
            >
              Transactions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="connect" className="mt-6">
            {renderConnectionStatus()}
          </TabsContent>
          <TabsContent value="transactions">
            {renderTransactionHistory()}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {connectionStatus === "connected" && (
            <Button className="ml-2">
              <span>Manage Funds</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletIntegration;
