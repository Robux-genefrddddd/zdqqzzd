import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ArrowRight, Plus, Clock, Zap } from "lucide-react";

export default function Index() {
  const projects = [
    { id: 1, name: "E-Commerce Platform", date: "Today", updated: "2 hours ago", status: "active" },
    { id: 2, name: "Admin Dashboard", date: "Yesterday", updated: "12 hours ago", status: "active" },
    { id: 3, name: "Landing Page Redesign", date: "This week", updated: "2 days ago", status: "draft" },
    { id: 4, name: "Mobile App UI", date: "Last week", updated: "5 days ago", status: "active" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back to your creator studio</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Total Projects</p>
                    <p className="text-2xl font-bold text-foreground mt-1">12</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Active Exports</p>
                    <p className="text-2xl font-bold text-foreground mt-1">5</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">This Month</p>
                    <p className="text-2xl font-bold text-foreground mt-1">48hrs</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Recent Projects</h2>
                  <p className="text-sm text-muted-foreground mt-1">Continue working on your designs</p>
                </div>
                <Link
                  to="/builder"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to="/builder"
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-card/80 transition group"
                  >
                    {/* Project Thumbnail */}
                    <div className="w-full aspect-video bg-gradient-to-br from-sidebar-accent to-sidebar-accent/50 rounded-lg mb-4 flex items-center justify-center border border-border group-hover:border-primary/30 transition">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground font-medium">Preview</p>
                      </div>
                    </div>

                    {/* Project Info */}
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition mb-2">
                      {project.name}
                    </h3>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Updated {project.updated}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <span className={`inline-block w-2 h-2 rounded-full ${project.status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
                        <span className="capitalize">{project.status}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Templates Section */}
            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground">Start from Template</h2>
                <p className="text-sm text-muted-foreground mt-1">Get started faster with professional templates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Landing Page", "Admin Dashboard", "E-Commerce Store"].map((template) => (
                  <div
                    key={template}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:bg-card/80 transition cursor-pointer group"
                  >
                    <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center border border-border group-hover:border-primary/30 transition">
                      <span className="text-xs text-muted-foreground font-medium">Template Preview</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition">
                      {template}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
