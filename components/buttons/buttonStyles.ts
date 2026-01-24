// Designet til alle knappene
export function buttonClasses(extra: string = "") {
  return [
    // Layout
    "inline-flex items-center justify-center gap-3",
    "whitespace-nowrap",

    // Size / spacing
    "h-14 px-8",

    // Shape / border
    "rounded-full",
    "outline outline-button-outline",

    // Typography
    "font-mono text-lg tracking-wide",

    // Colors
    "bg-button-bg text-button-text",

    // Interaction states
    "hover:bg-button-hover active:bg-button-hover",

    // Overrides
    extra,
  ].join(" ");
}
