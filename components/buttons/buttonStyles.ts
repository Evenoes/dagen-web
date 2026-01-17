// Designet til alle knappene

export function buttonClasses(extra: string = "") {
  return [
    "inline-flex items-center justify-center gap-3",
    "font-mono tracking-wide whitespace-nowrap",
    "outline-[1px] outline-offset-[-0.53px] outline-black rounded-[53.41px]",
    "h-14 px-8 text-lg",
    "bg-(--primary) text-black",
    extra,
  ].join(" ");
}
