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
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", divider: false },
  { id: "editor", label: "UI Editor", icon: Palette, href: "/builder", divider: false },
  { id: "blocks", label: "Blocks", icon: Blocks, href: "/blocks", divider: false },
  { id: "components", label: "Components", icon: ComponentIcon, href: "/components", divider: false },
  { id: "templates", label: "Templates", icon: Grid3x3, href: "/templates", divider: false },
  { id: "assets", label: "Assets", icon: Image, href: "/assets", divider: true },
  { id: "export", label: "Export", icon: FileJson, href: "/export", divider: false },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings", divider: true },
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
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
            <img
              src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
              alt="Roblox"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">BuildUI</h1>
            <p className="text-xs text-sidebar-accent-foreground">Creator Studio</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <div key={item.id}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-200",
                  "text-sm font-medium gap-3 group",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-accent-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
              </Link>
              {item.divider && <div className="my-2 border-t border-sidebar-border" />}
            </div>
          );
        })}
      </nav>

      {/* Account Section */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {ACCOUNT_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200",
                "text-sm font-medium text-sidebar-accent-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                "text-left"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* User Info */}
        <div className="mt-4 pt-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-foreground">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">user@example.com</p>
              <p className="text-xs text-sidebar-accent-foreground">Creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
