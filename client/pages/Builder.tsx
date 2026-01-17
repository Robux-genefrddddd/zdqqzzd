import { useBuilder, BuilderProvider } from "@/lib/builder-context";
import { BlockLibrary } from "@/components/BlockLibrary";
import { Canvas } from "@/components/Canvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Link } from "react-router-dom";
import { Download, Save, Eye, Menu } from "lucide-react";
import { useState } from "react";
import { canvasToDemoHTML } from "@/lib/utils-builder";
import { Button } from "@/components/ui/button";

function BuilderContent() {
  const { canvas } = useBuilder();
  const [showMenu, setShowMenu] = useState(false);

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
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs">
              ◇
            </div>
            <span className="hidden sm:inline">BuildUI</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-lg">
            <span className="text-sm font-medium text-foreground">{canvas?.name || "Untitled"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handlePreview}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button
            onClick={handleExportHTML}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="default" size="sm" className="hidden sm:inline-flex gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="sm:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <div className="hidden md:flex md:w-64 border-r border-border flex-col">
          <BlockLibrary />
        </div>

        {/* Center Canvas */}
        <Canvas />

        {/* Right Panel - Properties */}
        <div className="hidden lg:flex lg:flex-col">
          <PropertiesPanel />
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="sm:hidden absolute top-14 right-4 z-50 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-48">
          <button
            onClick={handlePreview}
            className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleExportHTML}
            className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition flex items-center gap-2 border-t border-border"
          >
            <Download className="w-4 h-4" />
            Export HTML
          </button>
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition flex items-center gap-2 border-t border-border">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default function Builder() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}
