import React, { useEffect, useState } from "react";
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
import { getComponents, Component } from "@/lib/components";
import { FileCode, Search, Filter } from "lucide-react";

const ComponentsManager = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    const fetchComponents = async () => {
      setIsLoading(true);
      const data = await getComponents();
      setComponents(data);
      setFilteredComponents(data);
      setIsLoading(false);
    };

    fetchComponents();
  }, []);

  useEffect(() => {
    // Filter components based on search query and type filter
    let filtered = components;

    if (searchQuery) {
      filtered = filtered.filter(
        (component) =>
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter((component) => component.type === typeFilter);
    }

    setFilteredComponents(filtered);
  }, [searchQuery, typeFilter, components]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "dashboard":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "auth":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "wallet":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "referral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "landing":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "main":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const uniqueTypes = [
    "all",
    ...Array.from(new Set(components.map((component) => component.type))),
  ];

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Components Manager</CardTitle>
          <CardDescription className="text-gray-400">
            Manage and view all components in the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="w-full md:w-64 flex items-center space-x-2">
              <Filter className="text-gray-400 h-4 w-4" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 rounded-full border-4 border-t-blue-600 border-gray-700 animate-spin"></div>
            </div>
          ) : (
            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800/80 border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-gray-300 hidden lg:table-cell">
                      File Path
                    </TableHead>
                    <TableHead className="text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComponents.length > 0 ? (
                    filteredComponents.map((component) => (
                      <TableRow
                        key={component.id}
                        className="hover:bg-gray-800/50 border-gray-700"
                      >
                        <TableCell className="font-medium text-white">
                          {component.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTypeColor(component.type)}
                          >
                            {component.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-300">
                          {component.description}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-400 font-mono text-xs">
                          {component.file_path}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            <FileCode className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-gray-400"
                      >
                        No components found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredComponents.length} of {components.length}{" "}
            components
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentsManager;
