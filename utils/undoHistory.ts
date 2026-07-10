export type Sticker = {
  id: number;
  x: number;
  y: number;
  scale: number;
};

export type EditorState = {
  stickers: Sticker[];
};

/**
 * Captures the current editor state and appends it to the undo history so the
 * user can step back to it later.
 *
 * @param history - The existing history stack (oldest first).
 * @param state - The current editor state to snapshot.
 * @returns A new history stack with the snapshot appended.
 */
export function pushSnapshot(
  history: EditorState[],
  state: EditorState
): EditorState[] {
  const snapshot: EditorState = {
    stickers: state.stickers,
  };

  return [...history, snapshot];
}

/**
 * Restores the most recent snapshot, returning the restored state and the
 * remaining history. Returns null state when there is nothing to undo.
 */
export function undo(history: EditorState[]): {
  state: EditorState | null;
  history: EditorState[];
} {
  if (history.length === 0) {
    return { state: null, history };
  }

  const next = [...history];
  const state = next.pop() as EditorState;
  return { state, history: next };
}
