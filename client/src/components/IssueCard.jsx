import { useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEVERITY = {
  high: { label: "High", color: "var(--severity-high)" },
  medium: { label: "Medium", color: "var(--severity-med)" },
  low: { label: "Low", color: "var(--severity-low)" },
};

export function IssueCard({ issue, isHovered, onHover }) {
  const [open, setOpen] = useState(false);
  const sev = SEVERITY[issue.severity] || SEVERITY.low;

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover?.(issue.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group rounded-lg border bg-card/60 transition-all ${
        isHovered
          ? "border-primary/60 shadow-lg shadow-primary/10"
          : "border-border hover:border-border/80"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
          style={{
            background: `color-mix(in oklab, ${sev.color} 18%, transparent)`,
            color: sev.color,
          }}
        >
          <AlertCircle className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-medium text-foreground">{issue.rule}</span>
            <span
              className="rounded-full px-1.5 py-0.5 font-mono text-[10px] uppercase"
              style={{
                background: `color-mix(in oklab, ${sev.color} 15%, transparent)`,
                color: sev.color,
              }}
            >
              {sev.label}
            </span>
          </div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{issue.suggestion}</div>
        </div>
        <span className="shrink-0 rounded-md border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          L{issue.line}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 border-t border-border px-3 py-3 text-xs">
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  Suggestion
                </div>
                <p className="text-foreground/90">{issue.suggestion}</p>
              </div>
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  Fix
                </div>
                <p className="rounded-md border border-border bg-code-bg/60 p-2 font-mono text-foreground/90">
                  {issue.fix}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
