/** Maximum number of recently used stickers to remember. */
export const MAX_RECENTS = 5;

/**
 * Records that a sticker was just used, returning an updated "recently used"
 * list. The most recent sticker is first, duplicates are moved to the front
 * rather than repeated, and the list is capped at {@link MAX_RECENTS}.
 *
 * The input array is not mutated.
 *
 * @param recents - The current recently-used sticker ids.
 * @param id - The sticker id that was just used.
 * @param max - Maximum number of entries to keep.
 */
export function addRecent(
  recents: number[],
  id: number,
  max: number = MAX_RECENTS
): number[] {
  const withoutDuplicate = recents.filter((existing) => existing !== id);
  const next = [id, ...withoutDuplicate];
  return next.slice(0, max);
}
