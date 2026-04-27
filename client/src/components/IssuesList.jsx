import { useState } from "react";
import { IssueCard } from "./IssueCard";

const FILTERS = ["all", "high", "medium", "low"];

export function IssuesList({ issues, hoveredIssueId, onHoverIssue }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? issues : issues.filter((i) => i.severity === filter);

  return (
    <div className="rounded-xl border border-border bg-panel p-4 shadow-lg shadow-black/20">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-sm font-semibold text-foreground">
          Issues <span className="text-muted-foreground">({issues.length})</span>
        </h2>
        <div className="flex gap-1 rounded-md border border-border bg-muted/30 p-0.5 text-[11px]">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-2 py-0.5 font-mono capitalize transition-colors ${
                filter === f
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
            No issues for this filter.
          </div>
        ) : (
          filtered.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              isHovered={hoveredIssueId === issue.id}
              onHover={onHoverIssue}
            />
          ))
        )}
      </div>
    </div>
  );
}
