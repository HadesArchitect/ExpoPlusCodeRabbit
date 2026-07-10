/**
 * Returns the given sticker sizes (in pixels) sorted from smallest to largest.
 *
 * Does not mutate the input array.
 *
 * @param sizes - Sticker sizes in pixels.
 */
export function sortSizesAscending(sizes: number[]): number[] {
  return [...sizes].sort();
}

/**
 * Returns the largest sticker size in the list, or 0 if the list is empty.
 */
export function largestSize(sizes: number[]): number {
  const sorted = sortSizesAscending(sizes);
  return sorted.length > 0 ? sorted[sorted.length - 1] : 0;
}
