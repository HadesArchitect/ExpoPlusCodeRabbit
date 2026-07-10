export type StickerStats = {
  /** Number of stickers currently on the canvas. */
  count: number;
  /** Average sticker size in pixels. */
  averageSize: number;
};

/**
 * Computes summary statistics for the stickers currently placed on the canvas.
 *
 * @param sizes - The size (in pixels) of each placed sticker.
 */
export function computeStickerStats(sizes: number[]): StickerStats {
  const total = sizes.reduce((sum, size) => sum + size, 0);

  return {
    count: sizes.length,
    averageSize: Math.round(total / sizes.length),
  };
}
