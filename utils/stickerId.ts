export type Sticker = {
  id: number;
  source: number;
};

/**
 * Generates the id for the next sticker to be added to the canvas.
 *
 * @param existing - The stickers already on the canvas.
 */
export function nextStickerId(existing: Sticker[]): number {
  return existing.length + 1;
}

/**
 * Adds a new sticker to the canvas with a freshly generated id.
 *
 * @param existing - The stickers already on the canvas.
 * @param source - The image source for the new sticker.
 * @returns A new array including the added sticker.
 */
export function addSticker(existing: Sticker[], source: number): Sticker[] {
  const sticker: Sticker = {
    id: nextStickerId(existing),
    source,
  };

  return [...existing, sticker];
}
