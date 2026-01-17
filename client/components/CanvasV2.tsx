import React, { useRef, useEffect, useState, useCallback } from "react";
import { useBuilder } from "@/lib/builder-context";
import { Block, BlockStyle, ToolType } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { X } from "lucide-react";

interface CanvasV2Props {
  currentTool: ToolType;
  zoom: number;
  setZoom: (zoom: number) => void;
}

interface ResizeHandle {
  position: "tl" | "tr" | "br" | "bl" | "t" | "r" | "b" | "l";
  cursor: string;
}

const RESIZE_HANDLES: ResizeHandle[] = [
  { position: "tl", cursor: "nwse-resize" },
  { position: "tr", cursor: "nesw-resize" },
  { position: "br", cursor: "nwse-resize" },
  { position: "bl", cursor: "nesw-resize" },
  { position: "t", cursor: "ns-resize" },
  { position: "r", cursor: "ew-resize" },
  { position: "b", cursor: "ns-resize" },
  { position: "l", cursor: "ew-resize" },
];

const HANDLE_SIZE = 8;
const SNAP_THRESHOLD = 10;

export function CanvasV2({ currentTool, zoom, setZoom }: CanvasV2Props) {
  const {
    canvas,
    selectedElement,
    setSelectedElement,
    updateBlockStyle,
    updateBlocksStyle,
    addBlock,
    removeBlock,
    getBlock,
  } = useBuilder();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStartX, setPanStartX] = useState(0);
  const [panStartY, setPanStartY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);

  const [isCreating, setIsCreating] = useState(false);
  const [createStartX, setCreateStartX] = useState(0);
  const [createStartY, setCreateStartY] = useState(0);

  if (!canvas) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  // Helper: Convert mouse coordinates to canvas coordinates
  const mouseToCanvasCoords = (
    mouseX: number,
    mouseY: number,
  ): [number, number] => {
    if (!canvasRef.current) return [0, 0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (mouseX - rect.left - panX) / (zoom / 100);
    const y = (mouseY - rect.top - panY) / (zoom / 100);
    return [x, y];
  };

  // Zoom with mouse wheel (zoom towards cursor)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const delta = e.deltaY > 0 ? -10 : 10;
      const newZoom = Math.max(10, Math.min(400, zoom + delta));
      const zoomFactor = newZoom / zoom;

      // Zoom towards cursor
      const [canvasX, canvasY] = mouseToCanvasCoords(
        e.clientX,
        e.clientY,
      );

      setPanX(panX - canvasX * (zoomFactor - 1));
      setPanY(panY - canvasY * (zoomFactor - 1));

      setZoom(newZoom);
    },
    [zoom, panX, panY, setZoom],
  );

  // Pan with Space + drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Check if clicking on a resize handle
      if (selectedElement) {
        const block = getBlock(selectedElement.id);
        if (block) {
          const handle = getResizeHandleAtPos(e.clientX, e.clientY, block);
          if (handle) {
            setIsResizing(true);
            setResizeHandle(handle);
            setResizeStartX(e.clientX);
            setResizeStartY(e.clientY);
            setResizeStartWidth(block.style.width || 0);
            setResizeStartHeight(block.style.height || 0);
            return;
          }
        }
      }

      // Check if clicking on an existing element
      const [canvasX, canvasY] = mouseToCanvasCoords(
        e.clientX,
        e.clientY,
      );
      const clickedBlock = findBlockAtPosition(canvas.blocks, canvasX, canvasY);

      if (clickedBlock) {
        setSelectedElement({ id: clickedBlock.id, type: "block" });
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
      } else if (currentTool === "select") {
        setSelectedElement(null);
      } else if (
        currentTool === "rectangle" ||
        currentTool === "circle" ||
        currentTool === "text"
      ) {
        setIsCreating(true);
        setCreateStartX(canvasX);
        setCreateStartY(canvasY);
      }
    },
    [selectedElement, currentTool, getBlock, canvas.blocks],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStartX;
        const dy = e.clientY - panStartY;
        setPanX(panX + dx);
        setPanY(panY + dy);
        setPanStartX(e.clientX);
        setPanStartY(e.clientY);
        return;
      }

      if (isResizing && selectedElement && resizeHandle) {
        const block = getBlock(selectedElement.id);
        if (!block) return;

        const deltaX = e.clientX - resizeStartX;
        const deltaY = e.clientY - resizeStartY;
        const scaledDeltaX = (deltaX / zoom) * 100;
        const scaledDeltaY = (deltaY / zoom) * 100;

        let newWidth = resizeStartWidth;
        let newHeight = resizeStartHeight;
        let newX = block.style.x || 0;
        let newY = block.style.y || 0;

        const handlePos = resizeHandle.position;
        if (handlePos === "br") {
          newWidth = Math.max(40, resizeStartWidth + scaledDeltaX);
          newHeight = Math.max(40, resizeStartHeight + scaledDeltaY);
        } else if (handlePos === "tr") {
          newY += scaledDeltaY;
          newHeight = Math.max(40, resizeStartHeight - scaledDeltaY);
          newWidth = Math.max(40, resizeStartWidth + scaledDeltaX);
        } else if (handlePos === "bl") {
          newX += scaledDeltaX;
          newWidth = Math.max(40, resizeStartWidth - scaledDeltaX);
          newHeight = Math.max(40, resizeStartHeight + scaledDeltaY);
        } else if (handlePos === "tl") {
          newX += scaledDeltaX;
          newY += scaledDeltaY;
          newWidth = Math.max(40, resizeStartWidth - scaledDeltaX);
          newHeight = Math.max(40, resizeStartHeight - scaledDeltaY);
        } else if (handlePos === "r") {
          newWidth = Math.max(40, resizeStartWidth + scaledDeltaX);
        } else if (handlePos === "b") {
          newHeight = Math.max(40, resizeStartHeight + scaledDeltaY);
        } else if (handlePos === "l") {
          newX += scaledDeltaX;
          newWidth = Math.max(40, resizeStartWidth - scaledDeltaX);
        } else if (handlePos === "t") {
          newY += scaledDeltaY;
          newHeight = Math.max(40, resizeStartHeight - scaledDeltaY);
        }

        updateBlockStyle(selectedElement.id, {
          width: newWidth,
          height: newHeight,
          x: newX,
          y: newY,
        });
        return;
      }

      if (isDragging && selectedElement) {
        const block = getBlock(selectedElement.id);
        if (!block) return;

        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        const scaledDeltaX = (deltaX / zoom) * 100;
        const scaledDeltaY = (deltaY / zoom) * 100;

        updateBlockStyle(selectedElement.id, {
          x: (block.style.x || 0) + scaledDeltaX,
          y: (block.style.y || 0) + scaledDeltaY,
        });

        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        return;
      }

      if (isCreating) {
        // Cursor feedback for drawing
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "crosshair";
        }
      }
    },
    [
      isPanning,
      isResizing,
      isDragging,
      isCreating,
      selectedElement,
      panX,
      panY,
      resizeHandle,
      getBlock,
      updateBlockStyle,
      zoom,
    ],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setIsPanning(false);
        return;
      }

      if (isResizing) {
        setIsResizing(false);
        setResizeHandle(null);
        return;
      }

      if (isDragging) {
        setIsDragging(false);
        return;
      }

      if (isCreating) {
        const [canvasX, canvasY] = mouseToCanvasCoords(
          e.clientX,
          e.clientY,
        );
        const width = Math.abs(canvasX - createStartX);
        const height = Math.abs(canvasY - createStartY);

        if (width > 20 && height > 20) {
          const blockType =
            currentTool === "circle" ? "circle" : "rectangle";
          const newBlock: Block = {
            id: generateId(),
            type: blockType as any,
            label: blockType.charAt(0).toUpperCase() + blockType.slice(1),
            style: {
              x: Math.min(createStartX, canvasX),
              y: Math.min(createStartY, canvasY),
              width,
              height,
              backgroundColor:
                currentTool === "circle"
                  ? "hsl(262 85% 65%)"
                  : "hsl(262 85% 65%)",
              borderRadius:
                currentTool === "circle" ? Math.min(width, height) / 2 : 4,
            },
            children: [],
          };
          addBlock(newBlock);
        }

        setIsCreating(false);
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "default";
        }
      }
    },
    [
      isPanning,
      isResizing,
      isDragging,
      isCreating,
      currentTool,
      createStartX,
      createStartY,
      addBlock,
    ],
  );

  // Helper: Find block at position
  const findBlockAtPosition = (
    blocks: Block[],
    x: number,
    y: number,
  ): Block | null => {
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      const bx = block.style.x || 0;
      const by = block.style.y || 0;
      const bw = block.style.width || 100;
      const bh = block.style.height || 100;

      if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
        if (block.children.length > 0) {
          const childResult = findBlockAtPosition(block.children, x, y);
          if (childResult) return childResult;
        }
        return block;
      }
    }
    return null;
  };

  // Helper: Get resize handle at position
  const getResizeHandleAtPos = (
    mouseX: number,
    mouseY: number,
    block: Block,
  ): ResizeHandle | null => {
    if (!canvasRef.current) return null;

    const bx = block.style.x || 0;
    const by = block.style.y || 0;
    const bw = block.style.width || 100;
    const bh = block.style.height || 100;

    const rect = canvasRef.current.getBoundingClientRect();
    const screenBx = rect.left + panX + (bx * zoom) / 100;
    const screenBy = rect.top + panY + (by * zoom) / 100;
    const screenBw = (bw * zoom) / 100;
    const screenBh = (bh * zoom) / 100;

    for (const handle of RESIZE_HANDLES) {
      let handleX: number, handleY: number;

      if (handle.position === "tl") {
        handleX = screenBx;
        handleY = screenBy;
      } else if (handle.position === "tr") {
        handleX = screenBx + screenBw;
        handleY = screenBy;
      } else if (handle.position === "br") {
        handleX = screenBx + screenBw;
        handleY = screenBy + screenBh;
      } else if (handle.position === "bl") {
        handleX = screenBx;
        handleY = screenBy + screenBh;
      } else if (handle.position === "t") {
        handleX = screenBx + screenBw / 2;
        handleY = screenBy;
      } else if (handle.position === "r") {
        handleX = screenBx + screenBw;
        handleY = screenBy + screenBh / 2;
      } else if (handle.position === "b") {
        handleX = screenBx + screenBw / 2;
        handleY = screenBy + screenBh;
      } else {
        handleX = screenBx;
        handleY = screenBy + screenBh / 2;
      }

      const dist = Math.sqrt(
        (mouseX - handleX) ** 2 + (mouseY - handleY) ** 2,
      );
      if (dist < HANDLE_SIZE + 4) {
        return handle;
      }
    }

    return null;
  };

  // Render a single block
  const renderBlock = (block: Block): React.ReactNode => {
    if (block.hidden) return null;

    const x = block.style.x || 0;
    const y = block.style.y || 0;
    const width = block.style.width || 100;
    const height = block.style.height || 100;
    const isSelected = selectedElement?.id === block.id;

    const style: React.CSSProperties = {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor:
        block.style.backgroundColor || "hsl(262 85% 65%)",
      borderRadius: block.style.borderRadius || 0,
      cursor: "move",
      opacity: block.style.opacity || 1,
      border: isSelected
        ? "2px solid hsl(262 85% 65%)"
        : "1px solid hsl(262 85% 65%)",
      boxShadow: block.style.shadow
        ? `${block.style.shadow.x}px ${block.style.shadow.y}px ${block.style.shadow.blur}px ${block.style.shadow.spread}px rgba(0, 0, 0, ${block.style.shadow.opacity})`
        : "none",
      transform: block.style.rotation
        ? `rotate(${block.style.rotation}deg)`
        : "none",
    };

    return (
      <div key={block.id} style={style} onClick={(e) => e.stopPropagation()}>
        {block.type === "rectangle" || block.type === "circle" ? (
          <div style={{ width: "100%", height: "100%" }} />
        ) : block.type === "shape-text" ? (
          <p style={{ padding: "8px", fontSize: "14px", color: "white" }}>
            {block.props?.text || "Text"}
          </p>
        ) : null}

        {block.children.map((child) => renderBlock(child))}

        {isSelected && (
          <>
            {RESIZE_HANDLES.map((handle) => (
              <div
                key={handle.position}
                style={{
                  position: "absolute",
                  width: `${HANDLE_SIZE}px`,
                  height: `${HANDLE_SIZE}px`,
                  backgroundColor: "hsl(262 85% 65%)",
                  border: "1px solid white",
                  cursor: handle.cursor,
                  ...getHandlePosition(handle, width, height),
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setIsResizing(true);
                  setResizeHandle(handle);
                  setResizeStartX(e.clientX);
                  setResizeStartY(e.clientY);
                  setResizeStartWidth(width);
                  setResizeStartHeight(height);
                }}
              />
            ))}
          </>
        )}
      </div>
    );
  };

  const getHandlePosition = (
    handle: ResizeHandle,
    width: number,
    height: number,
  ): React.CSSProperties => {
    const offset = -HANDLE_SIZE / 2;
    const positions: Record<string, React.CSSProperties> = {
      tl: { left: offset, top: offset },
      tr: { right: offset, top: offset },
      br: { right: offset, bottom: offset },
      bl: { left: offset, bottom: offset },
      t: { left: "50%", top: offset, transform: "translateX(-50%)" },
      r: { right: offset, top: "50%", transform: "translateY(-50%)" },
      b: { left: "50%", bottom: offset, transform: "translateX(-50%)" },
      l: { left: offset, top: "50%", transform: "translateY(-50%)" },
    };
    return positions[handle.position] || {};
  };

  return (
    <div
      ref={canvasRef}
      className="flex-1 overflow-hidden bg-gradient-to-br from-background via-background to-sidebar-accent/20 cursor-default"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsPanning(false);
        setIsResizing(false);
        setIsDragging(false);
      }}
      style={{ position: "relative", userSelect: "none" }}
    >
      <div
        style={{
          position: "absolute",
          left: `${panX}px`,
          top: `${panY}px`,
          width: "100%",
          height: "100%",
          transform: `scale(${zoom / 100})`,
          transformOrigin: "0 0",
          transition: isResizing || isDragging ? "none" : "transform 0.2s",
        }}
      >
        {/* Canvas background grid */}
        <div
          style={{
            position: "absolute",
            width: "10000px",
            height: "10000px",
            backgroundImage:
              "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.3,
          }}
        />

        {/* Render all blocks */}
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {canvas.blocks.map((block) => renderBlock(block))}
        </div>
      </div>

      {/* Zoom info */}
      <div className="absolute bottom-4 right-4 bg-card/80 border border-border rounded px-3 py-1.5 text-xs text-muted-foreground">
        {zoom.toFixed(0)}%
      </div>
    </div>
  );
}
