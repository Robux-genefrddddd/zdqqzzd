import React, { createContext, useContext, useState, useCallback } from "react";
import { Block, Canvas, SelectedElement, BlockStyle } from "./types";
import { generateId } from "./utils";

interface BuilderContextType {
  canvas: Canvas | null;
  selectedElement: SelectedElement | null;
  setCanvas: (canvas: Canvas) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  addBlock: (block: Block, parentId?: string) => void;
  removeBlock: (blockId: string) => void;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
  updateBlockStyle: (blockId: string, style: Partial<BlockStyle>) => void;
  duplicateBlock: (blockId: string) => void;
  getBlock: (blockId: string) => Block | null;
  getAllBlocks: (blocks?: Block[]) => Block[];
  moveBlock: (blockId: string, direction: "up" | "down") => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [canvas, setCanvas] = useState<Canvas | null>({
    id: generateId(),
    name: "My Project",
    blocks: [],
    designTokens: {
      colors: {
        primary: "hsl(260 90% 56%)",
        secondary: "hsl(0 0% 96%)",
        accent: "hsl(260 90% 56%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(12 8% 8%)",
        muted: "hsl(0 0% 91%)",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        "2xl": 48,
      },
      radius: {
        none: 0,
        sm: 4,
        md: 10,
        lg: 16,
      },
      typography: {
        heading: { size: 32, weight: 700, lineHeight: 1.2 },
        body: { size: 16, weight: 400, lineHeight: 1.5 },
        caption: { size: 12, weight: 500, lineHeight: 1.4 },
      },
    },
    width: 1200,
    height: undefined,
  });

  const [selectedElement, setSelectedElement] =
    useState<SelectedElement | null>(null);

  const getBlock = useCallback(
    (blockId: string): Block | null => {
      if (!canvas) return null;

      const search = (blocks: Block[]): Block | null => {
        for (const block of blocks) {
          if (block.id === blockId) return block;
          const found = search(block.children);
          if (found) return found;
        }
        return null;
      };

      return search(canvas.blocks);
    },
    [canvas],
  );

  const getAllBlocks = useCallback(
    (blocks: Block[] = canvas?.blocks || []): Block[] => {
      const result: Block[] = [];
      const traverse = (items: Block[]) => {
        for (const block of items) {
          result.push(block);
          traverse(block.children);
        }
      };
      traverse(blocks);
      return result;
    },
    [canvas],
  );

  const updateBlock = useCallback(
    (blockId: string, updates: Partial<Block>) => {
      if (!canvas) return;

      const updateInPlace = (blocks: Block[]): boolean => {
        for (const block of blocks) {
          if (block.id === blockId) {
            Object.assign(block, updates);
            return true;
          }
          if (updateInPlace(block.children)) return true;
        }
        return false;
      };

      const newBlocks = [...canvas.blocks];
      updateInPlace(newBlocks);
      setCanvas({ ...canvas, blocks: newBlocks });
    },
    [canvas],
  );

  const updateBlockStyle = useCallback(
    (blockId: string, style: Partial<BlockStyle>) => {
      if (!canvas) return;

      const updateInPlace = (blocks: Block[]): boolean => {
        for (const block of blocks) {
          if (block.id === blockId) {
            block.style = { ...block.style, ...style };
            return true;
          }
          if (updateInPlace(block.children)) return true;
        }
        return false;
      };

      const newBlocks = [...canvas.blocks];
      updateInPlace(newBlocks);
      setCanvas({ ...canvas, blocks: newBlocks });
    },
    [canvas],
  );

  const addBlock = useCallback(
    (block: Block, parentId?: string) => {
      if (!canvas) return;

      const newBlocks = [...canvas.blocks];

      if (!parentId) {
        newBlocks.push(block);
      } else {
        const addToParent = (blocks: Block[]): boolean => {
          for (const b of blocks) {
            if (b.id === parentId) {
              b.children.push(block);
              return true;
            }
            if (addToParent(b.children)) return true;
          }
          return false;
        };
        addToParent(newBlocks);
      }

      setCanvas({ ...canvas, blocks: newBlocks });
    },
    [canvas],
  );

  const removeBlock = useCallback(
    (blockId: string) => {
      if (!canvas) return;

      const removeFromBlocks = (blocks: Block[]): boolean => {
        for (let i = 0; i < blocks.length; i++) {
          if (blocks[i].id === blockId) {
            blocks.splice(i, 1);
            return true;
          }
          if (removeFromBlocks(blocks[i].children)) return true;
        }
        return false;
      };

      const newBlocks = [...canvas.blocks];
      removeFromBlocks(newBlocks);
      setCanvas({ ...canvas, blocks: newBlocks });
    },
    [canvas],
  );

  const duplicateBlock = useCallback(
    (blockId: string) => {
      const block = getBlock(blockId);
      if (!block || !canvas) return;

      const deepClone = (b: Block): Block => ({
        ...b,
        id: generateId(),
        children: b.children.map(deepClone),
      });

      const cloned = deepClone(block);
      addBlock(cloned);
    },
    [canvas, getBlock, addBlock],
  );

  const moveBlock = useCallback(
    (blockId: string, direction: "up" | "down") => {
      if (!canvas) return;

      const moveInArray = (blocks: Block[]): boolean => {
        const index = blocks.findIndex((b) => b.id === blockId);
        if (index === -1) {
          return blocks.some((b) => moveInArray(b.children));
        }

        if (direction === "up" && index > 0) {
          [blocks[index], blocks[index - 1]] = [
            blocks[index - 1],
            blocks[index],
          ];
          return true;
        } else if (direction === "down" && index < blocks.length - 1) {
          [blocks[index], blocks[index + 1]] = [
            blocks[index + 1],
            blocks[index],
          ];
          return true;
        }
        return false;
      };

      const newBlocks = [...canvas.blocks];
      moveInArray(newBlocks);
      setCanvas({ ...canvas, blocks: newBlocks });
    },
    [canvas],
  );

  return (
    <BuilderContext.Provider
      value={{
        canvas,
        selectedElement,
        setCanvas,
        setSelectedElement,
        addBlock,
        removeBlock,
        updateBlock,
        updateBlockStyle,
        duplicateBlock,
        getBlock,
        getAllBlocks,
        moveBlock,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within BuilderProvider");
  }
  return context;
}
