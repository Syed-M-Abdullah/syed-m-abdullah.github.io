export function WorkflowDiagram({
  nodes,
  compact = false,
}: {
  nodes: string[];
  compact?: boolean;
}) {
  return (
    <div className="flex w-full flex-wrap items-center gap-1.5">
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`relative rounded-md border border-blue/30 bg-gradient-to-b from-blue/15 to-blue/5 font-mono font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
              compact ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-[11px]"
            }`}
          >
            <span className="mr-1.5 text-blue">▸</span>
            {n}
          </div>
          {i < nodes.length - 1 && (
            <svg
              width={compact ? 16 : 20}
              height="8"
              viewBox="0 0 20 8"
              className="text-blue/70"
              aria-hidden
            >
              <path
                d="M0 4 H15 M12 1 L15 4 L12 7"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
