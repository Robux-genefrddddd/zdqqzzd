import { BLOCK_DEFAULTS } from "@/lib/utils-builder";
import { BlockType } from "@/lib/types";
import { useBuilder } from "@/lib/builder-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Layout,
  Square,
  CreditCard,
  Type,
  Input,
  FileText,
  Menu,
  AlertSquare,
  Images,
  Grid3x3,
  Columns,
  Settings,
  FileJson,
  Zap,
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
  card: <CreditCard className="w-4 h-4" />,
  button: <Zap className="w-4 h-4" />,
  input: <Input className="w-4 h-4" />,
  form: <FileText className="w-4 h-4" />,
  navbar: <Menu className="w-4 h-4" />,
  modal: <AlertSquare className="w-4 h-4" />,
  sidebar: <Columns className="w-4 h-4" />,
  list: <FileJson className="w-4 h-4" />,
  text: <Type className="w-4 h-4" />,
  image: <Images className="w-4 h-4" />,
  grid: <Grid3x3 className="w-4 h-4" />,
  "flex-container": <Columns className="w-4 h-4" />,
};

export function BlockLibrary() {
  const { addBlock } = useBuilder();

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
    <div className="h-full flex flex-col border-r border-border bg-sidebar">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground">
          Blocks Library
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          {BLOCK_CATEGORIES.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-sidebar-primary">{category.icon}</div>
                <h3 className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-2">
                {category.blocks.map((blockType) => (
                  <div
                    key={blockType}
                    draggable
                    onDragStart={(e) => handleDragStart(e, blockType)}
                    onClick={() => handleAddBlock(blockType)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-lg cursor-move transition",
                      "bg-sidebar-accent hover:bg-sidebar-accent/80 hover:text-sidebar-primary",
                      "text-sidebar-foreground text-sm font-medium",
                      "border border-transparent hover:border-sidebar-ring/20",
                    )}
                  >
                    {BLOCK_ICONS[blockType]}
                    <span className="capitalize">
                      {blockType.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
