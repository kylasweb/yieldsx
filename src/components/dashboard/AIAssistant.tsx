import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Bot,
  Lightbulb,
  TrendingUp,
  DollarSign,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIAssistantProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

const AIAssistant = ({
  messages = [
    {
      id: "1",
      content:
        "Hello! I'm your AI Trading Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      content: "I'd like some recommendations for crypto investments.",
      sender: "user",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      content:
        "Based on current market trends, I recommend considering ETH, SOL, and BNB. Would you like more specific analysis on any of these?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  onSendMessage = () => {},
  isLoading = false,
}: AIAssistantProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderSuggestions = () => {
    const suggestions = [
      { icon: <TrendingUp size={16} />, text: "Market trends" },
      { icon: <Lightbulb size={16} />, text: "Investment ideas" },
      { icon: <DollarSign size={16} />, text: "ROI calculator" },
      { icon: <RefreshCw size={16} />, text: "Portfolio rebalance" },
    ];

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            onClick={() =>
              setInputValue(`Help me with ${suggestion.text.toLowerCase()}`)
            }
          >
            {suggestion.icon}
            {suggestion.text}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full h-full flex flex-col bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage src="/ai-assistant-avatar.png" alt="AI Assistant" />
            <AvatarFallback className="bg-primary/10 text-primary">
              <Bot size={16} />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">AI Trading Assistant</CardTitle>
            <CardDescription className="text-xs">
              Powered by advanced market analytics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about market trends, investment advice..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
          {renderSuggestions()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
