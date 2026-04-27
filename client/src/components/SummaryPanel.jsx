import { AlertTriangle, Wrench, Gauge } from "lucide-react";
import { motion } from "framer-motion";

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-md"
        style={{ background: `color-mix(in oklab, ${accent} 15%, transparent)`, color: accent }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-mono text-lg font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}

export function SummaryPanel({ summary }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-4 shadow-lg shadow-black/20">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-sm font-semibold text-foreground">Review Summary</h2>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
          AI · sage-1.5
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat
          icon={AlertTriangle}
          label="Issues"
          value={summary.totalIssues}
          accent="var(--severity-high)"
        />
        <Stat
          icon={Wrench}
          label="Fixes"
          value={summary.totalFixes}
          accent="var(--success)"
        />
        <Stat
          icon={Gauge}
          label="Confidence"
          value={`${summary.confidence}%`}
          accent="var(--accent)"
        />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Confidence</span>
          <span className="font-mono">{summary.confidence}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${summary.confidence}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
          />
        </div>
      </div>

      <p className="mt-4 rounded-md border border-border bg-code-bg/60 p-3 font-mono text-xs leading-relaxed text-muted-foreground">
        <span className="text-primary">{">"}</span> {summary.notes}
      </p>
    </div>
  );
}
