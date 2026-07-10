/** Formats a 0..1 ratio as a whole-number percentage string, e.g. 0.25 -> "25%". */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
