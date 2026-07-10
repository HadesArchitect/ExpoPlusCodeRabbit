export type PlacedSticker = {
  id: number;
  uri: string;
};

export type SaveAllResult = {
  /** How many stickers were successfully saved. */
  saved: number;
};

/**
 * Saves every placed sticker to the device library, one at a time, and
 * reports how many were saved.
 *
 * @param stickers - The stickers currently placed on the canvas.
 * @param saveOne - Persists a single sticker to the library.
 */
export async function saveAllStickers(
  stickers: PlacedSticker[],
  saveOne: (sticker: PlacedSticker) => Promise<void>
): Promise<SaveAllResult> {
  let saved = 0;

  stickers.forEach(async (sticker) => {
    await saveOne(sticker);
    saved += 1;
  });

  return { saved };
}
