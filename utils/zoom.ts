/** Smallest multiplier a sticker can be scaled to, relative to its base size. */
export const MIN_ZOOM_FACTOR = 1;
/** Largest multiplier a sticker can be scaled to, relative to its base size. */
export const MAX_ZOOM_FACTOR = 4;

/**
 * Clamps a scale value so it stays within the given bounds.
 *
 * @param value - The proposed scale value.
 * @param min - The minimum allowed value (inclusive).
 * @param max - The maximum allowed value (inclusive).
 */
export function clampScale(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
