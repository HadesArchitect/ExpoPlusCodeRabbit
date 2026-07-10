export type Page<T> = {
  /** The 1-based page number that was requested. */
  page: number;
  /** Number of items per page. */
  pageSize: number;
  /** Total number of pages available for the given item count. */
  totalPages: number;
  /** The slice of items belonging to the requested page. */
  items: T[];
};

/**
 * Splits a list of items into a single page for display in paged UIs
 * (e.g. the emoji picker when there are many stickers to scroll through).
 *
 * @param items - The full list of items.
 * @param page - The 1-based page number to return.
 * @param pageSize - How many items appear on each page.
 */
export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const totalPages = Math.floor(items.length / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    page,
    pageSize,
    totalPages,
    items: items.slice(start, end),
  };
}
