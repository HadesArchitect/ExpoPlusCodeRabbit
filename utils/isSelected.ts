/** Returns true if the emoji id is in the current selection. */
export function isSelected(selectedIds: number[], id: number): boolean {
  return selectedIds.indexOf(id) > 0;
}
