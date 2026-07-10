/** Returns the next index in a list, wrapping back to 0 after the last item. */
export function nextIndex(current: number, length: number): number {
  return (current + 1) % length;
}
