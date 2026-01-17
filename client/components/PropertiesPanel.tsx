import React from "react";
import { useBuilder } from "@/lib/builder-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function PropertySection({ title, children, defaultOpen = true }: PropertySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary/50 transition"
      >
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition",
            !isOpen && "-rotate-90",
          )}
        />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
          {title}
        </span>
      </button>
      {isOpen && <div className="px-3 py-2 space-y-2">{children}</div>}
    </div>
  );
}

interface InputProps {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  type?: "number" | "text" | "color";
  min?: number;
  max?: number;
  step?: number;
}

function PropertyInput({
  label,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          const val = type === "number" ? parseFloat(e.target.value) : e.target.value;
          onChange(isNaN(val as number) ? 0 : val);
        }}
        min={min}
        max={max}
        step={step}
        className="w-full px-2 py-1.5 rounded text-xs bg-secondary/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
      />
    </div>
  );
}

export function PropertiesPanel() {
  const { selectedElement, getBlock, updateBlockStyle } = useBuilder();

  if (!selectedElement) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-border/50">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">
            Properties
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
          Select an element
        </div>
      </div>
    );
  }

  const block = getBlock(selectedElement.id);
  if (!block) return null;

  const handleStyleChange = (style: any) => {
    updateBlockStyle(selectedElement.id, style);
  };

  const style = block.style;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">
          Properties
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{block.label}</p>
      </div>

      {/* Properties */}
      <ScrollArea className="flex-1">
        <div>
          {/* Position & Size */}
          <PropertySection title="Position & Size">
            <div className="grid grid-cols-2 gap-2">
              <PropertyInput
                label="X"
                value={style.x || 0}
                onChange={(val) => handleStyleChange({ x: val as number })}
                step={1}
              />
              <PropertyInput
                label="Y"
                value={style.y || 0}
                onChange={(val) => handleStyleChange({ y: val as number })}
                step={1}
              />
              <PropertyInput
                label="W"
                value={style.width || 100}
                onChange={(val) => handleStyleChange({ width: val as number })}
                min={10}
                step={1}
              />
              <PropertyInput
                label="H"
                value={style.height || 100}
                onChange={(val) => handleStyleChange({ height: val as number })}
                min={10}
                step={1}
              />
            </div>
          </PropertySection>

          {/* Rotation */}
          <PropertySection title="Rotation" defaultOpen={false}>
            <PropertyInput
              label="Angle"
              value={style.rotation || 0}
              onChange={(val) => handleStyleChange({ rotation: val as number })}
              min={0}
              max={360}
              step={1}
            />
          </PropertySection>

          {/* Fill */}
          <PropertySection title="Fill">
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={style.backgroundColor || "#6366f1"}
                    onChange={(e) =>
                      handleStyleChange({ backgroundColor: e.target.value })
                    }
                    className="w-8 h-8 rounded border border-border/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={style.backgroundColor || "#6366f1"}
                    onChange={(e) =>
                      handleStyleChange({ backgroundColor: e.target.value })
                    }
                    className="flex-1 px-2 py-1 rounded text-xs bg-secondary/50 border border-border/50 text-foreground"
                  />
                </div>
              </div>

              <PropertyInput
                label="Opacity"
                value={(style.opacity || 1) * 100}
                onChange={(val) =>
                  handleStyleChange({ opacity: (val as number) / 100 })
                }
                min={0}
                max={100}
                step={5}
              />
            </div>
          </PropertySection>

          {/* Stroke */}
          <PropertySection title="Stroke" defaultOpen={false}>
            <div className="space-y-2">
              <PropertyInput
                label="Width"
                value={style.stroke?.width || 0}
                onChange={(val) =>
                  handleStyleChange({
                    stroke: { ...style.stroke, width: val as number },
                  })
                }
                min={0}
                max={20}
                step={1}
              />

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={style.stroke?.color || "#000000"}
                    onChange={(e) =>
                      handleStyleChange({
                        stroke: { ...style.stroke, color: e.target.value },
                      })
                    }
                    className="w-8 h-8 rounded border border-border/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={style.stroke?.color || "#000000"}
                    onChange={(e) =>
                      handleStyleChange({
                        stroke: { ...style.stroke, color: e.target.value },
                      })
                    }
                    className="flex-1 px-2 py-1 rounded text-xs bg-secondary/50 border border-border/50 text-foreground"
                  />
                </div>
              </div>

              <PropertyInput
                label="Opacity"
                value={(style.stroke?.opacity || 1) * 100}
                onChange={(val) =>
                  handleStyleChange({
                    stroke: {
                      ...style.stroke,
                      opacity: (val as number) / 100,
                    },
                  })
                }
                min={0}
                max={100}
                step={5}
              />

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">
                  Position
                </label>
                <select
                  value={style.stroke?.position || "center"}
                  onChange={(e) =>
                    handleStyleChange({
                      stroke: {
                        ...style.stroke,
                        position: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-2 py-1 rounded text-xs bg-secondary/50 border border-border/50 text-foreground"
                >
                  <option value="inside">Inside</option>
                  <option value="center">Center</option>
                  <option value="outside">Outside</option>
                </select>
              </div>
            </div>
          </PropertySection>

          {/* Radius */}
          <PropertySection title="Radius" defaultOpen={false}>
            <PropertyInput
              label="Border Radius"
              value={style.borderRadius || 0}
              onChange={(val) =>
                handleStyleChange({ borderRadius: val as number })
              }
              min={0}
              step={1}
            />
          </PropertySection>

          {/* Shadow */}
          <PropertySection title="Shadow" defaultOpen={false}>
            {style.shadow ? (
              <div className="space-y-2">
                <PropertyInput
                  label="X"
                  value={style.shadow.x}
                  onChange={(val) =>
                    handleStyleChange({
                      shadow: { ...style.shadow, x: val as number },
                    })
                  }
                  step={1}
                />
                <PropertyInput
                  label="Y"
                  value={style.shadow.y}
                  onChange={(val) =>
                    handleStyleChange({
                      shadow: { ...style.shadow, y: val as number },
                    })
                  }
                  step={1}
                />
                <PropertyInput
                  label="Blur"
                  value={style.shadow.blur}
                  onChange={(val) =>
                    handleStyleChange({
                      shadow: { ...style.shadow, blur: val as number },
                    })
                  }
                  min={0}
                  step={1}
                />
                <PropertyInput
                  label="Spread"
                  value={style.shadow.spread}
                  onChange={(val) =>
                    handleStyleChange({
                      shadow: { ...style.shadow, spread: val as number },
                    })
                  }
                  step={1}
                />
              </div>
            ) : (
              <button
                onClick={() =>
                  handleStyleChange({
                    shadow: {
                      x: 0,
                      y: 4,
                      blur: 12,
                      spread: 0,
                      color: "#000000",
                      opacity: 0.1,
                    },
                  })
                }
                className="w-full px-2 py-1.5 rounded text-xs bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition font-medium"
              >
                Add Shadow
              </button>
            )}
          </PropertySection>
        </div>
      </ScrollArea>
    </div>
  );
}
