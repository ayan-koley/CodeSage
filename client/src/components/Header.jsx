import { Sparkles, Github } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-panel/80 backdrop-blur supports-[backdrop-filter]:bg-panel/60">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary glow-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="font-mono text-base font-semibold tracking-tight">
              <span className="text-foreground">Code</span>
              <span className="text-primary">Sage</span>
            </h1>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · AI code reviewer
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hidden items-center gap-2 md:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>gemini-3-flash-preview</span>
          </span>
          <a
            href="https://github.com/ayan-koley"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
