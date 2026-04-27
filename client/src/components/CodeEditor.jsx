import { useMemo, useState } from "react";
import { Copy, Check, FileCode2 } from "lucide-react";

export function CodeEditor({ code, onChange, language = "javascript" }) {
  const [copied, setCopied] = useState(false);
  const lineCount = useMemo(() => code.split("\n").length, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-panel shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-border bg-panel/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          </div>
          <div className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileCode2 className="h-3.5 w-3.5" />
            <span className="font-mono">snippet.{language === "javascript" ? "js" : "ts"}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="relative flex-1 overflow-auto scrollbar-thin">
        <div className="flex min-h-full">
          <div
            aria-hidden
            className="select-none border-r border-border bg-code-bg/60 px-3 py-3 text-right font-mono text-xs leading-6 text-diff-gutter"
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            spellCheck={false}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 resize-none bg-code-bg px-3 py-3 font-mono text-[13px] leading-6 text-foreground outline-none"
            style={{ minHeight: "100%" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-panel/60 px-4 py-1.5 text-[11px] text-muted-foreground">
        <span>{lineCount} lines</span>
        <span className="font-mono">UTF-8 · LF · {language}</span>
      </div>
    </div>
  );
}
