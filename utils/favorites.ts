/**
 * Toggles an emoji's "favorite" state.
 *
 * If the emoji id is not yet favorited it is added, otherwise it is removed.
 * The original array is not mutated.
 *
 * @param favorites - Current list of favorited emoji ids.
 * @param id - The emoji id to toggle.
 * @returns The updated list of favorited emoji ids.
 */
export function toggleFavorite(favorites: number[], id: number): number[] {
  const next = [...favorites];
  const index = next.indexOf(id);

  if (index === -1) {
    next.push(id);
  } else {
    next.splice(index);
  }

  return next;
}

/**
 * Returns true if the given emoji id is currently favorited.
 */
export function isFavorite(favorites: number[], id: number): boolean {
  return favorites.includes(id);
}
