import { Play, Wand2, Loader2, Eye } from "lucide-react";

export function Controls({
  onAnalyze,
  onApply,
  analyzing,
  hasReview,
  applied,
  showOriginal,
  onToggleOriginal,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onAnalyze}
        disabled={analyzing}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 glow-primary"
      >
        {analyzing ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
        {analyzing ? "Analyzing…" : "Analyze Code"}
      </button>

      <button
        onClick={onApply}
        disabled={!hasReview || applied}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 font-mono text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Wand2 className="h-3.5 w-3.5" />
        {applied ? "Fixes Applied" : "Apply Fixes"}
      </button>

      {hasReview && (
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
          <Eye className="h-3.5 w-3.5" />
          <span>Show original</span>
          <input
            type="checkbox"
            checked={showOriginal}
            onChange={(e) => onToggleOriginal(e.target.checked)}
            className="sr-only peer"
          />
          <span className="relative h-4 w-7 rounded-full bg-muted transition-colors peer-checked:bg-primary">
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all ${
                showOriginal ? "left-3.5" : "left-0.5"
              }`}
            />
          </span>
        </label>
      )}
    </div>
  );
}
