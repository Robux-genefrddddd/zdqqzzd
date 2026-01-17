import { Sidebar } from "@/components/Sidebar";

export default function Blocks() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Blocks Library</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Blocks library page coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
