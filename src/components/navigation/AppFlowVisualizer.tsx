import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  User,
  UserCheck,
  Shield,
  DollarSign,
  LineChart,
  Package,
  Award,
  Layers,
  Settings,
  LogOut,
  Wallet,
  Bot,
  TrendingUp,
  Share2,
  Lock,
  Home,
  LogIn,
  UserPlus,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "page" | "action" | "decision" | "section";
  section: "public" | "user" | "admin";
  description: string;
  children?: string[];
}

interface FlowConnection {
  from: string;
  to: string;
  label?: string;
}

const AppFlowVisualizer = () => {
  const [activeSection, setActiveSection] = useState<
    "public" | "user" | "admin"
  >("user");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    D1: true,
    J: true,
  });

  // Define flow nodes based on the mermaid diagram
  const flowNodes: Record<string, FlowNode> = {
    // Main flow nodes
    A: {
      id: "A",
      label: "User",
      icon: <User />,
      type: "page",
      section: "public",
      description: "Starting point for all users",
    },
    B: {
      id: "B",
      label: "Authentication",
      icon: <Lock />,
      type: "decision",
      section: "public",
      description: "Authentication decision point",
    },
    C: {
      id: "C",
      label: "Public Pages",
      icon: <Home />,
      type: "section",
      section: "public",
      description: "Publicly accessible pages",
    },
    C1: {
      id: "C1",
      label: "Landing Page",
      icon: <Home />,
      type: "page",
      section: "public",
      description: "Main landing page with marketing information",
    },
    C2: {
      id: "C2",
      label: "Login Page",
      icon: <LogIn />,
      type: "page",
      section: "public",
      description: "User login page",
    },
    C3: {
      id: "C3",
      label: "Register Page",
      icon: <UserPlus />,
      type: "page",
      section: "public",
      description: "New user registration page",
    },

    // User dashboard nodes
    D: {
      id: "D",
      label: "User Dashboard",
      icon: <User />,
      type: "section",
      section: "user",
      description: "Main user dashboard area",
    },
    D1: {
      id: "D1",
      label: "Main Dashboard",
      icon: <Home />,
      type: "page",
      section: "user",
      description: "User's main dashboard view",
    },
    D2: {
      id: "D2",
      label: "Account Summary",
      icon: <DollarSign />,
      type: "page",
      section: "user",
      description: "Overview of user's account",
    },
    D3: {
      id: "D3",
      label: "Performance Charts",
      icon: <LineChart />,
      type: "page",
      section: "user",
      description: "Investment performance visualization",
    },
    D4: {
      id: "D4",
      label: "Active Investments",
      icon: <TrendingUp />,
      type: "page",
      section: "user",
      description: "Currently active investments",
    },
    D5: {
      id: "D5",
      label: "Investment Management",
      icon: <Package />,
      type: "page",
      section: "user",
      description: "Manage investments, deposits, and withdrawals",
    },
    D6: {
      id: "D6",
      label: "AI Assistant",
      icon: <Bot />,
      type: "page",
      section: "user",
      description: "AI-powered trading assistant",
    },
    D7: {
      id: "D7",
      label: "Wallet Integration",
      icon: <Wallet />,
      type: "page",
      section: "user",
      description: "Connect and manage external wallets",
    },
    D8: {
      id: "D8",
      label: "Referral Network",
      icon: <Users />,
      type: "page",
      section: "user",
      description: "Manage referrals and commissions",
    },

    // Admin dashboard nodes
    J: {
      id: "J",
      label: "Admin Dashboard",
      icon: <Shield />,
      type: "section",
      section: "admin",
      description: "Administrative control panel",
    },
    J1: {
      id: "J1",
      label: "Admin Overview",
      icon: <Home />,
      type: "page",
      section: "admin",
      description: "Admin dashboard overview",
    },
    J2: {
      id: "J2",
      label: "User Management",
      icon: <Users />,
      type: "page",
      section: "admin",
      description: "Manage user accounts",
    },
    J3: {
      id: "J3",
      label: "Finance Management",
      icon: <DollarSign />,
      type: "page",
      section: "admin",
      description: "Manage financial transactions",
    },
    J4: {
      id: "J4",
      label: "Investment Plans",
      icon: <Package />,
      type: "page",
      section: "admin",
      description: "Configure investment packages",
    },
    J5: {
      id: "J5",
      label: "Commission Management",
      icon: <Award />,
      type: "page",
      section: "admin",
      description: "Manage commission structure",
    },
    J6: {
      id: "J6",
      label: "Rewards Management",
      icon: <Award />,
      type: "page",
      section: "admin",
      description: "Manage user rewards",
    },
  };

  // Define connections between nodes
  const connections: FlowConnection[] = [
    // Main flow connections
    { from: "A", to: "B" },
    { from: "B", to: "C", label: "Not Authenticated" },
    { from: "B", to: "D", label: "Authenticated User" },
    { from: "B", to: "J", label: "Authenticated Admin" },

    // Public pages connections
    { from: "C", to: "C1" },
    { from: "C1", to: "C2" },
    { from: "C1", to: "C3" },
    { from: "C2", to: "B" },
    { from: "C3", to: "B" },

    // User dashboard connections
    { from: "D", to: "D1" },
    { from: "D1", to: "D2" },
    { from: "D1", to: "D3" },
    { from: "D1", to: "D4" },
    { from: "D1", to: "D5" },
    { from: "D1", to: "D6" },
    { from: "D1", to: "D7" },
    { from: "D1", to: "D8" },

    // Admin dashboard connections
    { from: "J", to: "J1" },
    { from: "J", to: "J2" },
    { from: "J", to: "J3" },
    { from: "J", to: "J4" },
    { from: "J", to: "J5" },
    { from: "J", to: "J6" },

    // Cross-system connections
    { from: "D5", to: "J3", label: "Transactions" },
    { from: "D8", to: "J2", label: "Referrals" },
    { from: "J4", to: "D5", label: "Plans" },
    { from: "J5", to: "D8", label: "Commission Rules" },
    { from: "J6", to: "D8", label: "Rewards" },
  ];

  // Filter nodes by section
  const filteredNodes = Object.values(flowNodes).filter(
    (node) =>
      node.section === activeSection ||
      (activeSection === "user" && node.id === "B") ||
      (activeSection === "admin" && node.id === "B"),
  );

  // Filter connections by section
  const filteredConnections = connections.filter((conn) => {
    const fromNode = flowNodes[conn.from];
    const toNode = flowNodes[conn.to];
    return (
      (fromNode?.section === activeSection &&
        toNode?.section === activeSection) ||
      (activeSection === "user" &&
        ((fromNode?.section === "user" && toNode?.section === "admin") ||
          (fromNode?.section === "admin" && toNode?.section === "user") ||
          fromNode?.id === "B" ||
          toNode?.id === "B")) ||
      (activeSection === "admin" &&
        ((fromNode?.section === "admin" && toNode?.section === "user") ||
          (fromNode?.section === "user" && toNode?.section === "admin") ||
          fromNode?.id === "B" ||
          toNode?.id === "B"))
    );
  });

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const getNodeChildren = (nodeId: string) => {
    return connections
      .filter((conn) => conn.from === nodeId)
      .map((conn) => conn.to);
  };

  const renderNode = (node: FlowNode) => {
    const isExpanded = expandedNodes[node.id] || false;
    const children = getNodeChildren(node.id);
    const hasChildren = children.length > 0;

    return (
      <div key={node.id} className="mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${selectedNode === node.id ? "bg-gray-800/80 border border-gray-700" : "bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50"}`}
                onClick={() => setSelectedNode(node.id)}
              >
                <div className="mr-3 p-2 rounded-full bg-gray-800/80">
                  {node.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{node.label}</p>
                      <p className="text-xs text-gray-400">{node.id}</p>
                    </div>
                    {hasChildren && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-0 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNodeExpansion(node.id);
                        }}
                      >
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-gray-800 text-white border-gray-700"
            >
              <p>{node.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isExpanded && hasChildren && (
          <div className="ml-8 mt-2 pl-4 border-l border-gray-700">
            {children.map((childId) => {
              const childNode = flowNodes[childId];
              if (
                childNode &&
                (childNode.section === activeSection ||
                  (activeSection === "user" && childNode.section === "admin") ||
                  (activeSection === "admin" && childNode.section === "user"))
              ) {
                return renderNode(childNode);
              }
              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  const renderNodeDetails = () => {
    if (!selectedNode) return null;

    const node = flowNodes[selectedNode];
    if (!node) return null;

    const incomingConnections = connections.filter(
      (conn) => conn.to === selectedNode,
    );
    const outgoingConnections = connections.filter(
      (conn) => conn.from === selectedNode,
    );

    return (
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-gray-800/80">
              {node.icon}
            </div>
            <div>
              <CardTitle className="text-white">{node.label}</CardTitle>
              <p className="text-sm text-gray-400">ID: {node.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Description
              </h3>
              <p className="text-white">{node.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Type</h3>
              <Badge
                variant="outline"
                className="bg-gray-800/80 text-white border-gray-700"
              >
                {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Section
              </h3>
              <Badge
                variant="outline"
                className={`${
                  node.section === "public"
                    ? "bg-gray-800/80 text-white"
                    : node.section === "user"
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-purple-900/30 text-purple-400"
                } border-gray-700`}
              >
                {node.section.charAt(0).toUpperCase() + node.section.slice(1)}
              </Badge>
            </div>

            {incomingConnections.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Incoming Connections
                </h3>
                <div className="space-y-2">
                  {incomingConnections.map((conn, idx) => (
                    <div
                      key={`in-${idx}`}
                      className="flex items-center p-2 rounded bg-gray-800/50 border border-gray-700"
                    >
                      <div className="mr-2 p-1 rounded-full bg-gray-700/80">
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-sm text-white">
                        From:{" "}
                        <span className="text-blue-400">
                          {flowNodes[conn.from]?.label || conn.from}
                        </span>
                        {conn.label && (
                          <span className="text-gray-400 ml-2">
                            ({conn.label})
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {outgoingConnections.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Outgoing Connections
                </h3>
                <div className="space-y-2">
                  {outgoingConnections.map((conn, idx) => (
                    <div
                      key={`out-${idx}`}
                      className="flex items-center p-2 rounded bg-gray-800/50 border border-gray-700"
                    >
                      <div className="mr-2 p-1 rounded-full bg-gray-700/80">
                        <ArrowRight className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-sm text-white">
                        To:{" "}
                        <span className="text-green-400">
                          {flowNodes[conn.to]?.label || conn.to}
                        </span>
                        {conn.label && (
                          <span className="text-gray-400 ml-2">
                            ({conn.label})
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full h-full bg-gray-950 text-white overflow-hidden">
      <div className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Application Flow Visualizer</h1>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">
              Explore the application structure and navigation flow
            </span>
          </div>
        </div>

        <Tabs
          value={activeSection}
          onValueChange={(value) => setActiveSection(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="public"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Public Pages
            </TabsTrigger>
            <TabsTrigger
              value="user"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              User Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin Dashboard
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            <div className="overflow-y-auto pr-4 border-r border-gray-800">
              <h2 className="text-lg font-medium mb-4">Navigation Nodes</h2>
              {filteredNodes
                .filter(
                  (node) =>
                    !connections.some(
                      (conn) =>
                        conn.to === node.id &&
                        flowNodes[conn.from]?.section === activeSection,
                    ),
                )
                .map((node) => renderNode(node))}
            </div>

            <div className="md:col-span-2 overflow-y-auto">
              {selectedNode ? (
                renderNodeDetails()
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-6 rounded-full bg-gray-800/50 mb-4">
                    {activeSection === "public" ? (
                      <Home className="h-12 w-12 text-gray-400" />
                    ) : activeSection === "user" ? (
                      <User className="h-12 w-12 text-blue-400" />
                    ) : (
                      <Shield className="h-12 w-12 text-purple-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    {activeSection === "public"
                      ? "Public Pages"
                      : activeSection === "user"
                        ? "User Dashboard"
                        : "Admin Dashboard"}
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Select a node from the navigation tree to view its details
                    and connections
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AppFlowVisualizer;
