import { useBuilder } from "@/lib/builder-context";
import { Block } from "@/lib/types";
import { BLOCK_DEFAULTS, createBlock } from "@/lib/utils-builder";
import { BlockType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X, Copy, ChevronDown } from "lucide-react";

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: (blockId: string) => void;
  onRemove: (blockId: string) => void;
  onDuplicate: (blockId: string) => void;
}

function BlockRenderer({
  block,
  isSelected,
  onSelect,
  onRemove,
  onDuplicate,
}: BlockRendererProps) {
  const styleString = Object.entries(block.style)
    .filter(([key]) => !["backgroundColor", "borderRadius", "padding", "margin", "width", "height", "shadow", "color", "fontSize", "fontWeight", "textAlign", "lineHeight", "display", "flexDirection", "justifyContent", "alignItems", "gap", "opacity", "borderColor", "borderWidth", "minHeight"].includes(key))
    .reduce((acc, [key, value]) => {
      if (value === undefined || value === null) return acc;
      return acc + `${key}: ${value}; `;
    }, "");

  const style: React.CSSProperties = {
    backgroundColor: block.style.backgroundColor,
    borderRadius: block.style.borderRadius ? `${block.style.borderRadius}px` : undefined,
    padding: block.style.padding
      ? `${block.style.padding.top}px ${block.style.padding.right}px ${block.style.padding.bottom}px ${block.style.padding.left}px`
      : undefined,
    margin: block.style.margin
      ? `${block.style.margin.top}px ${block.style.margin.right}px ${block.style.margin.bottom}px ${block.style.margin.left}px`
      : undefined,
    width: block.style.width ? (typeof block.style.width === "number" ? `${block.style.width}px` : block.style.width) : undefined,
    height: block.style.height ? (typeof block.style.height === "number" ? `${block.style.height}px` : block.style.height) : undefined,
    minHeight: block.style.minHeight ? `${block.style.minHeight}px` : undefined,
    boxShadow: block.style.shadow
      ? `${block.style.shadow.x}px ${block.style.shadow.y}px ${block.style.shadow.blur}px ${block.style.shadow.spread}px rgba(0, 0, 0, ${block.style.shadow.opacity})`
      : undefined,
    color: block.style.color,
    fontSize: block.style.fontSize ? `${block.style.fontSize}px` : undefined,
    fontWeight: block.style.fontWeight ? { normal: 400, medium: 500, semibold: 600, bold: 700 }[block.style.fontWeight] : undefined,
    textAlign: block.style.textAlign as any,
    lineHeight: block.style.lineHeight,
    display: block.style.display as any,
    flexDirection: block.style.flexDirection as any,
    justifyContent: block.style.justifyContent as any,
    alignItems: block.style.alignItems as any,
    gap: block.style.gap ? `${block.style.gap}px` : undefined,
    opacity: block.style.opacity,
    border: block.style.borderColor && block.style.borderWidth
      ? `${block.style.borderWidth}px solid ${block.style.borderColor}`
      : undefined,
  };

  const renderContent = () => {
    switch (block.type) {
      case "button":
        return <button style={style}>{block.props?.text || "Button"}</button>;
      case "input":
        return <input type="text" placeholder={block.props?.placeholder || ""} style={style} />;
      case "text":
        return <p style={style}>{block.props?.text || "Text content"}</p>;
      case "image":
        return (
          <img
            src={block.props?.src || "https://images.unsplash.com/photo-1618005182384-a83a8e7b9b47?w=500&h=400&fit=crop"}
            alt="Block content"
            style={style}
          />
        );
      case "header":
      case "footer":
      case "section":
      case "card":
      case "form":
      case "navbar":
      case "modal":
      case "sidebar":
      case "list":
      case "grid":
      case "flex-container":
      default:
        const tag = block.type === "section" ? "section" : block.type === "flex-container" ? "div" : block.type;
        return (
          <>
            {/* @ts-ignore */}
            {block.type === "button" ? (
              <button style={style}>{block.props?.text || "Button"}</button>
            ) : React.createElement(
              tag as any,
              { style },
              block.children.length > 0 ? (
                block.children.map((child) => (
                  <BlockRenderer
                    key={child.id}
                    block={child}
                    isSelected={isSelected}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    onDuplicate={onDuplicate}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Drag blocks here or click to add
                </div>
              )
            )}
          </>
        );
    }
  };

  return (
    <div
      key={block.id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(block.id);
      }}
      className={cn(
        "relative group outline-none",
        isSelected && "outline outline-2 outline-primary"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDrop={(e) => {
        e.preventDefault();
        const blockType = e.dataTransfer.getData("blockType") as BlockType;
        if (blockType && BLOCK_DEFAULTS[blockType]) {
          // This would require addBlock to support parentId
        }
      }}
    >
      {renderContent()}

      {isSelected && (
        <div className="absolute top-0 right-0 -translate-y-full flex gap-1 mb-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(block.id);
            }}
            className="p-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
            title="Duplicate block"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(block.id);
            }}
            className="p-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition"
            title="Remove block"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function Canvas() {
  const { canvas, selectedElement, setSelectedElement, removeBlock, duplicateBlock } = useBuilder();

  if (!canvas) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">Loading...</div>;
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData("blockType") as BlockType;
    if (blockType && BLOCK_DEFAULTS[blockType]) {
      const newBlock = createBlock(blockType);
      // addBlock(newBlock);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-secondary/20 p-8">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="max-w-6xl mx-auto"
      >
        {canvas.blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 rounded-xl border-2 border-dashed border-border bg-card/50">
            <div className="text-center">
              <ChevronDown className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Start by dragging blocks from the library</p>
              <p className="text-sm text-muted-foreground/70 mt-1">or click blocks to add them to your design</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {canvas.blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                isSelected={selectedElement?.id === block.id}
                onSelect={(id) => setSelectedElement({ id, type: "block" })}
                onRemove={removeBlock}
                onDuplicate={duplicateBlock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
