import { Link } from "react-router-dom";
import { ArrowRight, Zap, BarChart3, Code2, Palette, Layers, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white">
              ◇
            </div>
            <span>BuildUI</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Demo</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Pricing</a>
          </div>
          <Link 
            to="/builder"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition inline-flex items-center gap-2"
          >
            Start Creating <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Design professional interfaces
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">in minutes, not hours</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            The visual UI builder designed for everyone. From beginners to professionals, create stunning interfaces with our intuitive drag-and-drop system. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/builder"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition inline-flex items-center justify-center gap-2"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-3 rounded-lg border border-border bg-card hover:bg-secondary transition font-medium">
              Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative rounded-xl border border-border/50 bg-gradient-to-b from-secondary/40 to-background p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            <div className="relative space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary"><Layers className="w-4 h-4" /></div>
                <div className="h-8 w-32 rounded-lg bg-primary/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded-full bg-primary/15" />
                <div className="h-3 w-40 rounded-full bg-primary/10" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="h-20 rounded-lg bg-primary/10" />
                <div className="h-20 rounded-lg bg-primary/5" />
                <div className="h-20 rounded-lg bg-primary/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Powerful features, zero complexity</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to create professional interfaces in minutes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Drag & Drop Builder",
                description: "Intuitive interface for creating layouts without touching code"
              },
              {
                icon: Palette,
                title: "Visual Editor",
                description: "Customize colors, spacing, shadows and more with live preview"
              },
              {
                icon: Layers,
                title: "Component System",
                description: "Build reusable components and design tokens once, use everywhere"
              },
              {
                icon: Code2,
                title: "Clean Code Export",
                description: "Export your designs as HTML, CSS, Tailwind, or React components"
              },
              {
                icon: BarChart3,
                title: "Design System",
                description: "Manage colors, typography, spacing and create unified themes"
              },
              {
                icon: Sparkles,
                title: "Pre-built Blocks",
                description: "Modern components ready to use - headers, cards, forms and more"
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:bg-card/80 transition group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Everything built for speed
              </h2>
              <ul className="space-y-4">
                {[
                  "Responsive designs that work on all devices",
                  "Real-time collaboration and previews",
                  "Version history and undo/redo",
                  "Professional-grade export options",
                  "Works for both designers and developers"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border/50 bg-gradient-to-b from-secondary/30 to-background p-8">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-2 w-20 rounded-full bg-primary/15 mb-1" />
                    <div className="h-2 w-28 rounded-full bg-primary/10" />
                  </div>
                </div>
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-lg bg-primary/10" />
                  <div className="h-16 rounded-lg bg-primary/5" />
                </div>
                <div className="h-10 rounded-lg bg-primary/15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-primary/2 to-primary/5 border-t border-border/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to create amazing interfaces?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join designers and developers who are building faster than ever
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
          >
            Start Building Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 BuildUI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
