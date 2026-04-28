import { useMemo } from "react";
import { motion } from "framer-motion";
import { buildDiff } from "@/lib/diff";

export function DiffViewer({ code, fixes, issues, hoveredIssueId, onHoverIssue, showOriginal }) {
  const rows = useMemo(() => {
    if (showOriginal) {
      return code
        .replace(/\n$/, "")
        .split("\n")
        .map((text, i) => ({
          kind: "context",
          oldLine: i + 1,
          newLine: i + 1,
          text,
          issueIds: issues.filter((is) => is.line === i + 1).map((is) => is.id),
        }));
    }
    return buildDiff(code, fixes, issues);
  }, [code, fixes, issues, showOriginal]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-code-bg shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-border bg-panel/80 px-4 py-2.5">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono font-semibold text-foreground">
            {showOriginal ? "Original" : "Proposed Diff"}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-sm bg-diff-add-border" />
            additions
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-sm bg-diff-del-border" />
            deletions
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          +{rows.filter((r) => r.kind === "add").length} −
          {rows.filter((r) => r.kind === "del").length}
        </span>
      </div>

      <div className="max-h-[60vh] overflow-auto scrollbar-thin">
        <table className="w-full border-collapse font-mono text-[13px] leading-6">
          <tbody>
            {rows.map((row, idx) => {
              const isHovered =
                hoveredIssueId && row.issueIds && row.issueIds.includes(hoveredIssueId);
              const bg =
                row.kind === "add"
                  ? "bg-diff-add-bg"
                  : row.kind === "del"
                    ? "bg-diff-del-bg"
                    : "";
              const sign = row.kind === "add" ? "+" : row.kind === "del" ? "−" : " ";
              const signColor =
                row.kind === "add"
                  ? "text-diff-add-border"
                  : row.kind === "del"
                    ? "text-diff-del-border"
                    : "text-diff-gutter";
              return (
                <motion.tr
                  key={idx}
                  initial={row.kind !== "context" ? { opacity: 0, x: -4 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.005 }}
                  onMouseEnter={() =>
                    row.issueIds?.length && onHoverIssue?.(row.issueIds[0])
                  }
                  onMouseLeave={() => onHoverIssue?.(null)}
                  className={`${bg} ${
                    isHovered ? "outline outline-1 outline-primary/60" : ""
                  } transition-colors`}
                >
                  <td className="w-10 select-none border-r border-border/40 px-2 text-right text-diff-gutter">
                    {row.oldLine ?? ""}
                  </td>
                  <td className="w-10 select-none border-r border-border/40 px-2 text-right text-diff-gutter">
                    {row.newLine ?? ""}
                  </td>
                  <td className={`w-6 select-none px-1 text-center ${signColor}`}>{sign}</td>
                  <td className="whitespace-pre px-3 text-foreground">
                    {row.text || " "}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
