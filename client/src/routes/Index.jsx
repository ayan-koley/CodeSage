import { createFileRoute } from "@tanstack/react-router";
import { useState, Fragment } from "react";

import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { DiffViewer } from "@/components/DiffViewer";
import { SummaryPanel } from "@/components/SummaryPanel";
import { IssuesList } from "@/components/IssuesList";
import { Controls } from "@/components/Controls";

import { SAMPLE_REVIEW } from "@/lib/sampleData.js";
import { applyFixes } from "@/lib/diff";
import { analysisCode, healthcheck } from "@/lib/api.js";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [hoveredIssueId, setHoveredIssueId] = useState(null);

  const handleAnalyze = async() => {
    setAnalyzing(true);
    setApplied(false);
    setReview(null);

    // setTimeout(() => {
    //   setReview(SAMPLE_REVIEW);
    //   setAnalyzing(false);
    // }, 900)
    const response = await analysisCode(code);
    console.log('response ', response);
    setReview(response);
    setAnalyzing(false);
  };

  const handleApply = () => {
    if (!review) return;

    setCode(applyFixes(code, review.fixes));
    setApplied(true);
    setReview(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-mono text-xl font-semibold tracking-tight">
              Paste code on the left, run AI review on the right. <span/>
              <span className="text-muted-foreground">
                — Hover an issue to highlight its line.
              </span>
            </h2>
          </div>

          <Controls
            onAnalyze={handleAnalyze}
            onApply={handleApply}
            analyzing={analyzing}
            hasReview={!!review}
            applied={applied}
            showOriginal={showOriginal}
            onToggleOriginal={setShowOriginal}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex min-h-[60vh] flex-col">
            {review ? (
              <DiffViewer
                code={code}
                fixes={review.fixes}
                issues={review.issues}
                hoveredIssueId={hoveredIssueId}
                onHoverIssue={setHoveredIssueId}
                showOriginal={showOriginal}
              />
            ) : (
              <CodeEditor code={code} onChange={setCode} />
            )}
          </div>

          <div className="flex flex-col gap-4">
            {review ? (
              <Fragment>
                <SummaryPanel summary={review.summary} />
                <IssuesList
                  issues={review.issues}
                  hoveredIssueId={hoveredIssueId}
                  onHoverIssue={setHoveredIssueId}
                />
              </Fragment>
            ) : (
              <EmptyReview analyzing={analyzing} applied={applied} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyReview({ analyzing, applied }) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-panel/40 p-10 text-center">
      <div className="mb-4 h-12 w-12 rounded-xl bg-primary/10 p-3 text-primary glow-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      <h3 className="font-mono text-base font-semibold text-foreground">
        {applied
          ? "Fixes applied ✓"
          : analyzing
          ? "Sage is reading your code…"
          : "Awaiting review"}
      </h3>

      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        {applied
          ? "Run analysis again to find further improvements."
          : analyzing
          ? "Linting, scanning patterns, and generating fixes."
          : "Click Analyze Code to get an AI-generated diff, severity-ranked issues, and suggested fixes."}
      </p>
    </div>
  );
}