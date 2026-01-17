import React from "react";
import { ToolType } from "@/lib/types";
import {
  Pointer,
  Square,
  Circle,
  Type,
  Minus,
  FrameIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
}

const TOOLS: {
  id: ToolType;
  label: string;
  icon: React.ReactNode;
  shortcut: string;
}[] = [
  { id: "select", label: "Select", icon: <Pointer className="w-4 h-4" />, shortcut: "V" },
  { id: "rectangle", label: "Rectangle", icon: <Square className="w-4 h-4" />, shortcut: "R" },
  { id: "circle", label: "Circle", icon: <Circle className="w-4 h-4" />, shortcut: "O" },
  { id: "text", label: "Text", icon: <Type className="w-4 h-4" />, shortcut: "T" },
  { id: "line", label: "Line", icon: <Minus className="w-4 h-4" />, shortcut: "L" },
  { id: "frame", label: "Frame", icon: <FrameIcon className="w-4 h-4" />, shortcut: "F" },
];

export function Toolbar({ currentTool, setCurrentTool }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 bg-card/50 border border-border rounded-lg p-1.5">
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setCurrentTool(tool.id)}
          className={cn(
            "p-2 rounded transition-all",
            "hover:bg-secondary",
            currentTool === tool.id && "bg-primary text-primary-foreground",
            currentTool !== tool.id && "text-muted-foreground hover:text-foreground",
          )}
          title={`${tool.label} (${tool.shortcut})`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}
