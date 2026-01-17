import { useState } from "react";
import { BLOCK_DEFAULTS } from "@/lib/utils-builder";
import { BlockType } from "@/lib/types";
import { useBuilder } from "@/lib/builder-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Grid3x3,
  Layout,
  Menu,
  Square,
  Type,
  Keyboard,
  FileText,
  DialogSquare,
  Images,
  Columns,
  Settings,
} from "lucide-react";

const BLOCK_CATEGORIES: {
  name: string;
  icon: React.ReactNode;
  blocks: BlockType[];
}[] = [
  {
    name: "Layout",
    icon: <Layout className="w-4 h-4" />,
    blocks: ["section", "flex-container", "grid"],
  },
  {
    name: "Navigation",
    icon: <Menu className="w-4 h-4" />,
    blocks: ["header", "navbar", "footer", "sidebar"],
  },
  {
    name: "Components",
    icon: <Square className="w-4 h-4" />,
    blocks: ["card", "modal"],
  },
  {
    name: "Form",
    icon: <FileText className="w-4 h-4" />,
    blocks: ["form", "input", "button"],
  },
  {
    name: "Content",
    icon: <Type className="w-4 h-4" />,
    blocks: ["text", "image", "list"],
  },
];

const BLOCK_ICONS: Record<BlockType, React.ReactNode> = {
  section: <Layout className="w-4 h-4" />,
  header: <Menu className="w-4 h-4" />,
  footer: <Menu className="w-4 h-4" />,
  card: <Square className="w-4 h-4" />,
  button: <Input className="w-4 h-4" />,
  input: <Input className="w-4 h-4" />,
  form: <FileText className="w-4 h-4" />,
  navbar: <Menu className="w-4 h-4" />,
  modal: <AlertSquare className="w-4 h-4" />,
  sidebar: <Columns className="w-4 h-4" />,
  list: <FileText className="w-4 h-4" />,
  text: <Type className="w-4 h-4" />,
  image: <Images className="w-4 h-4" />,
  grid: <Grid3x3 className="w-4 h-4" />,
  "flex-container": <Columns className="w-4 h-4" />,
};

export function BlocksPalette() {
  const { addBlock } = useBuilder();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "Layout",
  );

  const handleDragStart = (e: React.DragEvent, blockType: BlockType) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("blockType", blockType);
  };

  const handleAddBlock = (blockType: BlockType) => {
    const defaults = BLOCK_DEFAULTS[blockType];
    addBlock({
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      label: defaults.label || blockType,
      style: defaults.style || {},
      children: [],
      props: defaults.props,
    });
  };

  return (
    <div className="w-72 border-r border-border bg-card/50 flex flex-col">
      <div className="px-4 py-3.5 border-b border-border/60">
        <h2 className="text-sm font-semibold text-foreground">Blocks</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag to canvas or click to add
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-3 p-4">
          {BLOCK_CATEGORIES.map((category) => (
            <div key={category.name}>
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name,
                  )
                }
                className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-secondary transition group"
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition",
                    expandedCategory === category.name
                      ? "rotate-0"
                      : "-rotate-90",
                  )}
                />
                <div className="text-muted-foreground group-hover:text-foreground transition">
                  {category.icon}
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition">
                  {category.name}
                </span>
              </button>

              {expandedCategory === category.name && (
                <div className="space-y-2 mt-2">
                  {category.blocks.map((blockType) => (
                    <div
                      key={blockType}
                      draggable
                      onDragStart={(e) => handleDragStart(e, blockType)}
                      onClick={() => handleAddBlock(blockType)}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-lg cursor-move transition mx-1",
                        "bg-secondary/40 hover:bg-secondary hover:border-primary/30",
                        "text-muted-foreground hover:text-foreground text-sm font-medium",
                        "border border-transparent hover:border-primary/30 group",
                      )}
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition">
                        {BLOCK_ICONS[blockType]}
                      </div>
                      <span className="capitalize">
                        {blockType.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
