import { Block, BlockType, BlockStyle } from "./types";
import { generateId } from "./utils";

export const BLOCK_DEFAULTS: Record<BlockType, Partial<Block>> = {
  section: {
    type: "section",
    label: "Section",
    style: {
      backgroundColor: "#ffffff",
      padding: { top: 40, right: 40, bottom: 40, left: 40 },
      minHeight: 300,
    },
  },
  header: {
    type: "header",
    label: "Header",
    style: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e5e5",
      borderWidth: 1,
      padding: { top: 16, right: 24, bottom: 16, left: 24 },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  footer: {
    type: "footer",
    label: "Footer",
    style: {
      backgroundColor: "#f5f5f5",
      padding: { top: 40, right: 24, bottom: 40, left: 24 },
      borderColor: "#e5e5e5",
      borderWidth: 1,
    },
  },
  card: {
    type: "card",
    label: "Card",
    style: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e5e5",
      borderWidth: 1,
      borderRadius: 10,
      padding: { top: 24, right: 24, bottom: 24, left: 24 },
      width: 300,
      minHeight: 200,
      shadow: {
        x: 0,
        y: 2,
        blur: 8,
        spread: 0,
        color: "#000000",
        opacity: 0.04,
      },
    },
  },
  button: {
    type: "button",
    label: "Button",
    style: {
      backgroundColor: "hsl(260 90% 56%)",
      color: "#ffffff",
      padding: { top: 10, right: 20, bottom: 10, left: 20 },
      borderRadius: 6,
      width: "auto",
      height: "auto",
    },
    props: { text: "Click me" },
  },
  input: {
    type: "input",
    label: "Input",
    style: {
      backgroundColor: "#ffffff",
      borderColor: "#d5d5d5",
      borderWidth: 1,
      borderRadius: 6,
      padding: { top: 10, right: 12, bottom: 10, left: 12 },
      width: "100%",
      height: 40,
    },
    props: { placeholder: "Enter text..." },
  },
  form: {
    type: "form",
    label: "Form",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      width: 400,
    },
  },
  navbar: {
    type: "navbar",
    label: "Navbar",
    style: {
      backgroundColor: "hsl(260 90% 56%)",
      color: "#ffffff",
      padding: { top: 12, right: 24, bottom: 12, left: 24 },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  modal: {
    type: "modal",
    label: "Modal",
    style: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: { top: 32, right: 32, bottom: 32, left: 32 },
      width: 500,
      shadow: {
        x: 0,
        y: 20,
        blur: 40,
        spread: 0,
        color: "#000000",
        opacity: 0.2,
      },
    },
  },
  sidebar: {
    type: "sidebar",
    label: "Sidebar",
    style: {
      backgroundColor: "#f5f5f5",
      borderColor: "#e5e5e5",
      borderWidth: 1,
      padding: { top: 24, right: 16, bottom: 24, left: 16 },
      width: 250,
      minHeight: 600,
    },
  },
  list: {
    type: "list",
    label: "List",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%",
    },
  },
  text: {
    type: "text",
    label: "Text",
    style: {
      color: "#000000",
      fontSize: 16,
    },
    props: { text: "Your text here" },
  },
  image: {
    type: "image",
    label: "Image",
    style: {
      width: 300,
      height: 200,
      borderRadius: 8,
    },
    props: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8e7b9b47?w=500&h=400&fit=crop",
    },
  },
  grid: {
    type: "grid",
    label: "Grid",
    style: {
      display: "grid",
      gap: 16,
      width: "100%",
    },
    props: { columns: 3 },
  },
  "flex-container": {
    type: "flex-container",
    label: "Flex Container",
    style: {
      display: "flex",
      gap: 16,
      width: "100%",
    },
  },
};

export function createBlock(
  type: BlockType,
  overrides?: Partial<Block>,
): Block {
  const defaults = BLOCK_DEFAULTS[type];
  return {
    id: generateId(),
    type,
    label: defaults.label || type,
    style: defaults.style || {},
    children: [],
    props: defaults.props,
    ...overrides,
  };
}

export function styleObjectToCSS(style: BlockStyle): string {
  let css = "";

  if (style.backgroundColor) {
    css += `background-color: ${style.backgroundColor}; `;
  }

  if (style.borderRadius) {
    css += `border-radius: ${style.borderRadius}px; `;
  }

  if (style.color) {
    css += `color: ${style.color}; `;
  }

  if (style.padding) {
    css += `padding: ${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px; `;
  }

  if (style.margin) {
    css += `margin: ${style.margin.top}px ${style.margin.right}px ${style.margin.bottom}px ${style.margin.left}px; `;
  }

  if (style.width !== undefined) {
    if (typeof style.width === "number") {
      css += `width: ${style.width}px; `;
    } else {
      css += `width: ${style.width}; `;
    }
  }

  if (style.height !== undefined) {
    if (typeof style.height === "number") {
      css += `height: ${style.height}px; `;
    } else {
      css += `height: ${style.height}; `;
    }
  }

  if (style.minHeight) {
    css += `min-height: ${style.minHeight}px; `;
  }

  if (style.shadow) {
    const s = style.shadow;
    css += `box-shadow: ${s.x}px ${s.y}px ${s.blur}px ${s.spread}px rgba(0, 0, 0, ${s.opacity}); `;
  }

  if (style.opacity !== undefined) {
    css += `opacity: ${style.opacity}; `;
  }

  if (style.borderColor && style.borderWidth) {
    css += `border: ${style.borderWidth}px solid ${style.borderColor}; `;
  }

  if (style.fontSize) {
    css += `font-size: ${style.fontSize}px; `;
  }

  if (style.fontWeight) {
    const weights: Record<string, number> = {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    };
    css += `font-weight: ${weights[style.fontWeight] || style.fontWeight}; `;
  }

  if (style.textAlign) {
    css += `text-align: ${style.textAlign}; `;
  }

  if (style.lineHeight) {
    css += `line-height: ${style.lineHeight}; `;
  }

  if (style.display) {
    css += `display: ${style.display}; `;
  }

  if (style.flexDirection) {
    css += `flex-direction: ${style.flexDirection}; `;
  }

  if (style.justifyContent) {
    css += `justify-content: ${style.justifyContent}; `;
  }

  if (style.alignItems) {
    css += `align-items: ${style.alignItems}; `;
  }

  if (style.gap) {
    css += `gap: ${style.gap}px; `;
  }

  return css;
}

export function blockToHTML(block: Block, indent = 0): string {
  const padding = "  ".repeat(indent);
  const style = styleObjectToCSS(block.style);
  const styleAttr = style ? ` style="${style}"` : "";

  let html = "";

  switch (block.type) {
    case "button":
      html = `${padding}<button${styleAttr}>${block.props?.text || "Button"}</button>`;
      break;
    case "input":
      html = `${padding}<input${styleAttr} type="text" placeholder="${block.props?.placeholder || ""}" />`;
      break;
    case "text":
      html = `${padding}<p${styleAttr}>${block.props?.text || "Text content"}</p>`;
      break;
    case "image":
      html = `${padding}<img${styleAttr} src="${block.props?.src || ""}" alt="Image" />`;
      break;
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
      const tag =
        block.type === "section"
          ? "section"
          : block.type === "flex-container"
            ? "div"
            : block.type;
      html = `${padding}<${tag}${styleAttr}>
${block.children.map((child) => blockToHTML(child, indent + 1)).join("\n")}
${padding}</${tag}>`;
  }

  return html;
}

export function canvasToDemoHTML(blocks: Block[], title = "My Design"): string {
  const bodyContent = blocks.map((block) => blockToHTML(block, 1)).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: #ffffff;
      color: #1a1a1a;
    }
  </style>
</head>
<body>
${bodyContent}
</body>
</html>`;
}
