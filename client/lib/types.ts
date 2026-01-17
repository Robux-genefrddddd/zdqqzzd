export type BlockType =
  | "section"
  | "header"
  | "footer"
  | "card"
  | "button"
  | "input"
  | "form"
  | "navbar"
  | "modal"
  | "sidebar"
  | "list"
  | "text"
  | "image"
  | "grid"
  | "flex-container"
  | "frame"
  | "rectangle"
  | "circle"
  | "shape-text";

export type ToolType =
  | "select"
  | "rectangle"
  | "circle"
  | "text"
  | "line"
  | "frame";

export interface ColorStop {
  color: string;
  position: number;
}

export interface Stroke {
  width?: number;
  color?: string;
  opacity?: number;
  position?: "inside" | "center" | "outside";
  dashArray?: number[];
}

export interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  enabled?: boolean;
}

export interface BlockStyle {
  // Layout Positioning (Figma-style absolute positioning)
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;

  // Fill & Background
  backgroundColor?: string;
  backgroundGradient?: {
    type: "linear" | "radial";
    angle?: number;
    colors: ColorStop[];
  };
  backgroundImage?: string;

  // Stroke / Border
  stroke?: Stroke;
  borderRadius?: number;
  borderRadiusPerCorner?: {
    topLeft?: number;
    topRight?: number;
    bottomRight?: number;
    bottomLeft?: number;
  };

  // Shadow & Effects
  shadow?: Shadow;
  shadows?: Shadow[];

  // Text Properties
  color?: string;
  fontSize?: number;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;

  // Flex & Auto-layout
  display?: "flex" | "grid" | "block";
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };

  // Legacy (compatibility)
  minHeight?: number;
}

export interface Block {
  id: string;
  type: BlockType;
  label: string;
  style: BlockStyle;
  children: Block[];
  props?: Record<string, any>;
}

export interface Canvas {
  id: string;
  name: string;
  blocks: Block[];
  designTokens: {
    colors: Record<string, string>;
    spacing: Record<string, number>;
    radius: Record<string, number>;
    typography: Record<string, any>;
  };
  width?: number;
  height?: number;
}

export interface SelectedElement {
  id: string;
  type: "block";
}
