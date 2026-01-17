import { useBuilder, BuilderProvider } from "@/lib/builder-context";
import { Sidebar } from "@/components/Sidebar";
import { CanvasV2 } from "@/components/CanvasV2";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Toolbar } from "@/components/Toolbar";
import { LayersPanel } from "@/components/LayersPanel";
import {
  Download,
  Save,
  Eye,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Maximize2,
} from "lucide-react";
import { useState } from "react";
import { canvasToDemoHTML } from "@/lib/utils-builder";
import { ToolType } from "@/lib/types";

function BuilderContent() {
  const { canvas } = useBuilder();
  const [zoom, setZoom] = useState(100);
  const [currentTool, setCurrentTool] = useState<ToolType>("select");

  const handleExportHTML = () => {
    if (!canvas) return;
    const html = canvasToDemoHTML(canvas.blocks, canvas.name);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${canvas.name.toLowerCase().replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    if (!canvas) return;
    const html = canvasToDemoHTML(canvas.blocks, canvas.name);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <div className="border-b border-border bg-card/20 backdrop-blur-sm px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">
            {canvas?.name || "Untitled Project"}
          </h1>
          <div className="text-xs text-muted-foreground">UI Editor</div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tool Bar */}
          <Toolbar currentTool={currentTool} setCurrentTool={setCurrentTool} />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 bg-secondary/30 border border-border rounded-md p-1.5">
            <button
              onClick={() => setZoom(Math.max(10, zoom - 10))}
              className="p-1 hover:bg-secondary transition rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="text-xs text-muted-foreground min-w-12 text-center font-medium">
              {zoom.toFixed(0)}%
            </div>
            <button
              onClick={() => setZoom(Math.min(400, zoom + 10))}
              className="p-1 hover:bg-secondary transition rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="w-px h-3 bg-border/50 mx-1" />
            <button
              onClick={() => setZoom(100)}
              className="p-1 hover:bg-secondary transition rounded text-xs text-muted-foreground hover:text-foreground font-medium"
              title="Reset zoom (100%)"
            >
              ↺
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePreview}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:border-primary/50 hover:bg-secondary/50 transition text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={handleExportHTML}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:border-primary/50 hover:bg-secondary/50 transition text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary hover:bg-primary/90 transition text-primary-foreground flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Layers */}
        <div className="hidden md:flex md:w-64 md:flex-col border-r border-border bg-card/30">
          <LayersPanel />
        </div>

        {/* Center Canvas - Main */}
        <div className="flex-1 flex overflow-hidden">
          <CanvasV2 currentTool={currentTool} zoom={zoom} setZoom={setZoom} />
        </div>

        {/* Right Panel - Properties */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col border-l border-border bg-card/30">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
}

export default function Builder() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <BuilderProvider>
          <BuilderContent />
        </BuilderProvider>
      </div>
    </div>
  );
}
