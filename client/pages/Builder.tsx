import { useBuilder, BuilderProvider } from "@/lib/builder-context";
import { Sidebar } from "@/components/Sidebar";
import { BlocksPalette } from "@/components/BlocksPalette";
import { Canvas } from "@/components/Canvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Download, Save, Eye, ZoomIn, ZoomOut, Grid3x3, Maximize2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { canvasToDemoHTML } from "@/lib/utils-builder";

function BuilderContent() {
  const { canvas } = useBuilder();
  const [zoom, setZoom] = useState(100);

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
          <h1 className="text-sm font-semibold text-foreground">{canvas?.name || "Untitled Project"}</h1>
          <div className="text-xs text-muted-foreground">UI Editor</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-1.5 hover:bg-secondary transition rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="text-xs text-muted-foreground min-w-12 text-center">{zoom}%</div>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-1.5 hover:bg-secondary transition rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <button
              onClick={() => setZoom(100)}
              className="p-1.5 hover:bg-secondary transition rounded text-xs text-muted-foreground hover:text-foreground font-medium"
              title="Reset zoom"
            >
              100%
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-secondary transition rounded-lg text-muted-foreground hover:text-foreground"
              title="Toggle grid"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-secondary transition rounded-lg text-muted-foreground hover:text-foreground"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreview}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleExportHTML}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary hover:bg-primary/90 transition text-primary-foreground flex items-center gap-1.5">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Blocks Palette */}
        <div className="hidden md:flex md:w-72 md:flex-col border-r border-border">
          <BlocksPalette />
        </div>

        {/* Center Canvas - Main */}
        <div className="flex-1 flex overflow-hidden">
          <Canvas zoom={zoom} />
        </div>

        {/* Right Panel - Properties */}
        <div className="hidden xl:flex xl:w-80 xl:flex-col border-l border-border">
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
