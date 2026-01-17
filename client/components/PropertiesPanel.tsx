import { useBuilder } from "@/lib/builder-context";
import { Block, BlockStyle } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Palette, BoxSelect, Type } from "lucide-react";

export function PropertiesPanel() {
  const { selectedElement, getBlock, updateBlockStyle, updateBlock } = useBuilder();

  const block = selectedElement ? getBlock(selectedElement.id) : null;

  if (!block) {
    return (
      <div className="w-80 border-l border-border bg-sidebar p-4 flex items-center justify-center text-sm text-muted-foreground">
        Select a block to edit properties
      </div>
    );
  }

  const handleStyleChange = (key: keyof BlockStyle, value: any) => {
    updateBlockStyle(selectedElement!.id, { [key]: value });
  };

  const handlePropChange = (key: string, value: any) => {
    updateBlock(selectedElement!.id, { props: { ...block.props, [key]: value } });
  };

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">
          {block.label}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{block.type}</p>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="design" className="w-full h-full">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0 justify-start">
            <TabsTrigger value="design" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs">
              <Palette className="w-4 h-4 mr-1.5" />
              Design
            </TabsTrigger>
            <TabsTrigger value="layout" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs">
              <BoxSelect className="w-4 h-4 mr-1.5" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary text-xs">
              <Type className="w-4 h-4 mr-1.5" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="p-4 space-y-4">
            {/* Background Color */}
            <div>
              <Label className="text-xs font-semibold text-sidebar-foreground">Background Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={block.style.backgroundColor || "#ffffff"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <Input
                  value={block.style.backgroundColor || "#ffffff"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="flex-1 text-xs"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Text Color */}
            {(["text", "button"].includes(block.type) || block.style.color) && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Text Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={block.style.color || "#000000"}
                    onChange={(e) => handleStyleChange("color", e.target.value)}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={block.style.color || "#000000"}
                    onChange={(e) => handleStyleChange("color", e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Border Radius */}
            <div>
              <Label className="text-xs font-semibold text-sidebar-foreground flex justify-between">
                Border Radius
                <span className="text-muted-foreground">{block.style.borderRadius || 0}px</span>
              </Label>
              <Slider
                value={[block.style.borderRadius || 0]}
                onValueChange={(v) => handleStyleChange("borderRadius", v[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            {/* Shadow */}
            {block.style.shadow && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-sidebar-foreground">Shadow</Label>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">X</Label>
                      <Input
                        type="number"
                        value={block.style.shadow.x}
                        onChange={(e) =>
                          handleStyleChange("shadow", {
                            ...block.style.shadow,
                            x: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Y</Label>
                      <Input
                        type="number"
                        value={block.style.shadow.y}
                        onChange={(e) =>
                          handleStyleChange("shadow", {
                            ...block.style.shadow,
                            y: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">Blur</Label>
                      <Input
                        type="number"
                        value={block.style.shadow.blur}
                        onChange={(e) =>
                          handleStyleChange("shadow", {
                            ...block.style.shadow,
                            blur: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Opacity</Label>
                      <Slider
                        value={[block.style.shadow.opacity]}
                        onValueChange={(v) =>
                          handleStyleChange("shadow", {
                            ...block.style.shadow,
                            opacity: v[0],
                          })
                        }
                        max={1}
                        step={0.1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Opacity */}
            <div>
              <Label className="text-xs font-semibold text-sidebar-foreground flex justify-between">
                Opacity
                <span className="text-muted-foreground">{Math.round((block.style.opacity || 1) * 100)}%</span>
              </Label>
              <Slider
                value={[(block.style.opacity || 1) * 100]}
                onValueChange={(v) => handleStyleChange("opacity", v[0] / 100)}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="layout" className="p-4 space-y-4">
            {/* Padding */}
            <div>
              <Label className="text-xs font-semibold text-sidebar-foreground">Padding</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Top</Label>
                  <Input
                    type="number"
                    value={block.style.padding?.top || 0}
                    onChange={(e) =>
                      handleStyleChange("padding", {
                        ...block.style.padding,
                        top: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Right</Label>
                  <Input
                    type="number"
                    value={block.style.padding?.right || 0}
                    onChange={(e) =>
                      handleStyleChange("padding", {
                        ...block.style.padding,
                        right: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bottom</Label>
                  <Input
                    type="number"
                    value={block.style.padding?.bottom || 0}
                    onChange={(e) =>
                      handleStyleChange("padding", {
                        ...block.style.padding,
                        bottom: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Left</Label>
                  <Input
                    type="number"
                    value={block.style.padding?.left || 0}
                    onChange={(e) =>
                      handleStyleChange("padding", {
                        ...block.style.padding,
                        left: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Width & Height */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Width</Label>
                <Input
                  type="text"
                  value={typeof block.style.width === "number" ? `${block.style.width}px` : block.style.width || "auto"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.endsWith("px")) {
                      handleStyleChange("width", parseInt(val));
                    } else {
                      handleStyleChange("width", val as any);
                    }
                  }}
                  className="text-xs"
                  placeholder="auto"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Height</Label>
                <Input
                  type="text"
                  value={typeof block.style.height === "number" ? `${block.style.height}px` : block.style.height || "auto"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.endsWith("px")) {
                      handleStyleChange("height", parseInt(val));
                    } else {
                      handleStyleChange("height", val as any);
                    }
                  }}
                  className="text-xs"
                  placeholder="auto"
                />
              </div>
            </div>

            {/* Gap (for flex/grid) */}
            {["flex-container", "grid", "form", "list"].includes(block.type) && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground flex justify-between">
                  Gap
                  <span className="text-muted-foreground">{block.style.gap || 0}px</span>
                </Label>
                <Slider
                  value={[block.style.gap || 0]}
                  onValueChange={(v) => handleStyleChange("gap", v[0])}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="content" className="p-4 space-y-4">
            {/* Text Content */}
            {["text", "button"].includes(block.type) && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Text</Label>
                <Input
                  value={block.props?.text || ""}
                  onChange={(e) => handlePropChange("text", e.target.value)}
                  className="mt-2"
                  placeholder="Enter text"
                />
              </div>
            )}

            {/* Placeholder */}
            {block.type === "input" && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Placeholder</Label>
                <Input
                  value={block.props?.placeholder || ""}
                  onChange={(e) => handlePropChange("placeholder", e.target.value)}
                  className="mt-2"
                  placeholder="Enter placeholder text"
                />
              </div>
            )}

            {/* Image Source */}
            {block.type === "image" && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground">Image URL</Label>
                <Input
                  value={block.props?.src || ""}
                  onChange={(e) => handlePropChange("src", e.target.value)}
                  className="mt-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}

            {/* Font Size */}
            {["text", "button"].includes(block.type) && (
              <div>
                <Label className="text-xs font-semibold text-sidebar-foreground flex justify-between">
                  Font Size
                  <span className="text-muted-foreground">{block.style.fontSize || 16}px</span>
                </Label>
                <Slider
                  value={[block.style.fontSize || 16]}
                  onValueChange={(v) => handleStyleChange("fontSize", v[0])}
                  min={8}
                  max={72}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
