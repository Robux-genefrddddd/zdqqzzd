import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import {
  ArrowRight,
  Plus,
  Zap,
  BarChart3,
  Clock,
  Grid,
  Layout,
  Palette,
  Blocks,
} from "lucide-react";

export default function Index() {
  const projects = [
    {
      id: 1,
      name: "E-Commerce UI Kit",
      date: "Today",
      updated: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Admin Dashboard",
      date: "Yesterday",
      updated: "12 hours ago",
      status: "active",
    },
    {
      id: 3,
      name: "Landing Page Design",
      date: "This week",
      updated: "2 days ago",
      status: "draft",
    },
    {
      id: 4,
      name: "Mobile App Interface",
      date: "Last week",
      updated: "5 days ago",
      status: "active",
    },
  ];

  const quickActions = [
    {
      icon: Layout,
      label: "New Project",
      href: "/builder",
      color: "from-primary to-primary/70",
    },
    {
      icon: Palette,
      label: "UI Editor",
      href: "/builder",
      color: "from-accent to-accent/70",
    },
    {
      icon: Blocks,
      label: "Blocks Library",
      href: "/blocks",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/40 backdrop-blur-sm px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Welcome back to Creator Studio
              </p>
            </div>
            <Link
              to="/builder"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium text-sm flex items-center gap-2 group"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition" />
              New Project
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
                Quick Start
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Layout,
                    label: "New Project",
                    href: "/builder",
                    primary: true,
                  },
                  { icon: Palette, label: "UI Editor", href: "/builder" },
                  { icon: Grid, label: "Block Library", href: "/blocks" },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={idx}
                      to={action.href}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition border text-sm font-medium ${
                        action.primary
                          ? "bg-primary/15 border-primary/40 hover:border-primary/60 hover:bg-primary/20"
                          : "bg-card/50 border-border hover:border-primary/30 hover:bg-card/80"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${action.primary ? "text-primary" : "text-muted-foreground group-hover:text-primary"} transition`}
                      />
                      <span
                        className={action.primary ? "text-primary" : "text-foreground"}
                      >
                        {action.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition ml-auto" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Stats Row */}
            <div>
              <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
                Statistics
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        Total Projects
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-2">
                        12
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        +2 this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        Active Exports
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-2">
                        5
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Ready to deploy
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        Creation Time
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-2">
                        48hrs
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Recent Projects
                </h2>
                <Link
                  to="/builder"
                  className="text-xs text-primary hover:text-primary/80 font-medium transition"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to="/builder"
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:bg-card/80 transition"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-video bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center border-b border-border group-hover:from-secondary group-hover:to-secondary/40 transition">
                      <div className="text-center">
                        <Palette className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground/60 font-medium">
                          Design Preview
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition line-clamp-1">
                        {project.name}
                      </h3>

                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p className="line-clamp-1">
                          Updated {project.updated}
                        </p>
                        <div className="flex items-center gap-2 pt-1 border-t border-border">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${project.status === "active" ? "bg-green-500/80" : "bg-yellow-500/80"}`}
                          />
                          <span className="capitalize font-medium">
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Templates Section */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                Starter Templates
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "E-Commerce", icon: Layout },
                  { name: "Admin Dashboard", icon: BarChart3 },
                  { name: "Landing Page", icon: Palette },
                ].map((template) => (
                  <button
                    key={template.name}
                    className="group relative bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:bg-card/80 transition text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <template.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition">
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Start from a professional template
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
