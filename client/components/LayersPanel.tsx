import React, { useState } from "react";
import { useBuilder } from "@/lib/builder-context";
import { Block } from "@/lib/types";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LayersPanel() {
  const {
    canvas,
    selectedElement,
    setSelectedElement,
    toggleBlockLock,
    toggleBlockVisibility,
    updateBlock,
  } = useBuilder();

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");

  const toggleExpanded = (blockId: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(blockId)) {
      newSet.delete(blockId);
    } else {
      newSet.add(blockId);
    }
    setExpandedIds(newSet);
  };

  const startRename = (block: Block) => {
    setRenamingId(block.id);
    setNewLabel(block.label);
  };

  const finishRename = (blockId: string) => {
    if (newLabel.trim()) {
      updateBlock(blockId, { label: newLabel.trim() });
    }
    setRenamingId(null);
  };

  if (!canvas) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading...
      </div>
    );
  }

  const renderLayer = (block: Block, depth = 0): React.ReactNode => {
    const isSelected = selectedElement?.id === block.id;
    const isExpanded = expandedIds.has(block.id);
    const hasChildren = block.children.length > 0;

    return (
      <div key={block.id}>
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1.5 rounded transition hover:bg-secondary/50 group",
            isSelected && "bg-primary/20",
          )}
          style={{ marginLeft: `${depth * 12}px` }}
          onClick={() => setSelectedElement({ id: block.id, type: "block" })}
        >
          {/* Expander */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(block.id);
              }}
              className="p-0.5 hover:bg-secondary rounded flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <div className="w-4 flex-shrink-0" />
          )}

          {/* Label */}
          <div className="flex-1 min-w-0">
            {renamingId === block.id ? (
              <input
                autoFocus
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onBlur={() => finishRename(block.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") finishRename(block.id);
                  if (e.key === "Escape") setRenamingId(null);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-1.5 py-0.5 rounded bg-secondary/50 text-sm border border-border/50 text-foreground"
              />
            ) : (
              <span
                onDoubleClick={() => startRename(block)}
                className="text-xs text-foreground truncate cursor-text hover:text-primary transition"
              >
                {block.label}
              </span>
            )}
          </div>

          {/* Visibility Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockVisibility(block.id);
            }}
            className="p-0.5 hover:bg-secondary rounded opacity-0 group-hover:opacity-100 transition flex-shrink-0"
          >
            {block.hidden ? (
              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>

          {/* Lock Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockLock(block.id);
            }}
            className="p-0.5 hover:bg-secondary rounded opacity-0 group-hover:opacity-100 transition flex-shrink-0"
          >
            {block.locked ? (
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Unlock className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {block.children.map((child) => renderLayer(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">
          Layers
        </h3>
      </div>

      {/* Layers List */}
      <ScrollArea className="flex-1">
        <div className="space-y-0.5 p-2">
          {canvas.blocks.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-xs text-muted-foreground">
              No layers yet
            </div>
          ) : (
            canvas.blocks.map((block) => renderLayer(block))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
