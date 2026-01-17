import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Palette,
  Blocks,
  ComponentIcon,
  Grid3x3,
  Image,
  FileJson,
  Settings,
  LogOut,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    divider: false,
  },
  {
    id: "editor",
    label: "UI Editor",
    icon: Palette,
    href: "/builder",
    divider: false,
  },
  {
    id: "blocks",
    label: "Blocks",
    icon: Blocks,
    href: "/blocks",
    divider: false,
  },
  {
    id: "components",
    label: "Components",
    icon: ComponentIcon,
    href: "/components",
    divider: false,
  },
  {
    id: "templates",
    label: "Templates",
    icon: Grid3x3,
    href: "/templates",
    divider: false,
  },
  {
    id: "assets",
    label: "Assets",
    icon: Image,
    href: "/assets",
    divider: true,
  },
  {
    id: "export",
    label: "Export",
    icon: FileJson,
    href: "/export",
    divider: false,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    divider: true,
  },
];

const ACCOUNT_ITEMS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "logout", label: "Sign Out", icon: LogOut },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="px-4 py-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Roblox_Logo.svg/2048px-Roblox_Logo.svg.png"
            alt="Roblox"
            className="w-8 h-8 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-bold text-sidebar-foreground truncate tracking-tight">
              Creator Studio
            </h1>
            <p className="text-xs text-sidebar-accent-foreground leading-tight">
              BuildUI Pro
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <div key={item.id}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md transition-all duration-150 relative group",
                  "text-xs font-medium gap-2.5",
                  active
                    ? "bg-sidebar-accent/90 text-sidebar-primary shadow-lg shadow-primary/20"
                    : "text-sidebar-accent-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition",
                    active
                      ? "text-sidebar-primary"
                      : "text-sidebar-accent-foreground group-hover:text-sidebar-foreground",
                  )}
                />
                <span className="truncate">{item.label}</span>
                {active && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-l-full shadow-lg shadow-primary/40" />
                )}
              </Link>
              {item.divider && (
                <div className="my-1.5 border-t border-sidebar-border/30" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Account Section */}
      <div className="p-3 border-t border-sidebar-border/50 space-y-0.5">
        {ACCOUNT_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md transition-all duration-150 group",
                "text-xs font-medium text-sidebar-accent-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                "text-left",
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0 group-hover:text-sidebar-foreground transition" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* User Info */}
        <div className="mt-3 pt-3 border-t border-sidebar-border/30">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-7 h-7 rounded-md bg-sidebar-accent/60 flex items-center justify-center text-xs font-bold text-sidebar-primary flex-shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">
                user@example.com
              </p>
              <p className="text-xs text-sidebar-accent-foreground leading-tight">
                Creator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roblox Branding at Bottom */}
      <div className="px-4 py-4 border-t border-sidebar-border/50 flex justify-center">
        <img
          src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
          alt="Powered by Roblox"
          className="h-3.5 opacity-40 hover:opacity-60 transition"
          title="Powered by Roblox"
        />
      </div>
    </div>
  );
}
