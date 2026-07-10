/**
 * Returns a new array with the elements shuffled into a random order using
 * the Fisher-Yates algorithm. The input array is not mutated.
 *
 * @param items - The items to shuffle.
 */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Picks a single random item from the list, or undefined if the list is empty.
 */
export function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
