/**
 * Pagination Constants & Utilities
 */

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

/**
 * Calculate pagination metadata
 */
export function getPaginationMeta(total: number, page: number, pageSize: number) {
  const totalPages = Math.ceil(total / pageSize);
  return {
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    startItem: total === 0 ? 0 : (page - 1) * pageSize + 1,
    endItem: Math.min(page * pageSize, total),
  };
}

/**
 * Calculate skip value for Prisma pagination
 */
export function getSkip(page: number, pageSize: number): number {
  return (page - 1) * pageSize;
}
