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
  | "flex-container";

export interface ColorStop {
  color: string;
  position: number;
}

export interface BlockStyle {
  backgroundColor?: string;
  backgroundGradient?: {
    type: "linear" | "radial";
    angle?: number;
    colors: ColorStop[];
  };
  backgroundImage?: string;
  borderRadius?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  width?: number | "auto" | "100%";
  height?: number | "auto";
  minHeight?: number;
  shadow?: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
  };
  opacity?: number;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  display?: "flex" | "grid" | "block";
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
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
