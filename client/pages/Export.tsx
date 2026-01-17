import { Sidebar } from "@/components/Sidebar";

export default function Export() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Export</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Export page coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
